-- ====================================================================
-- EduAnalyzer Master PostgreSQL Schema
-- AI-Powered Student Learning and Ability Analysis Platform
-- Compatible with Supabase Free Tier
-- ====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
CREATE TYPE user_role AS ENUM ('faculty', 'student', 'admin');
CREATE TYPE bloom_level AS ENUM ('remember', 'understand', 'apply', 'analyze', 'evaluate', 'create');
CREATE TYPE question_difficulty AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE question_type AS ENUM ('mcq', 'multiple_choice', 'true_false', 'short_answer');
CREATE TYPE assessment_status AS ENUM ('draft', 'published', 'closed');
CREATE TYPE attempt_status AS ENUM ('in_progress', 'submitted', 'evaluated', 'abandoned');

-- 1. Profiles Table (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    department TEXT,
    student_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Courses Table
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT,
    faculty_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_published BOOLEAN NOT NULL DEFAULT false,
    semester TEXT DEFAULT 'Fall 2026',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Course Units
CREATE TABLE IF NOT EXISTS public.course_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(course_id, unit_number)
);

-- 4. Course Topics
CREATE TABLE IF NOT EXISTS public.course_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    unit_id UUID NOT NULL REFERENCES public.course_units(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. Course Learning Outcomes (Mapped to Bloom's Taxonomy)
CREATE TABLE IF NOT EXISTS public.learning_outcomes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    code TEXT NOT NULL, -- e.g. "CLO-1"
    description TEXT NOT NULL,
    bloom_level bloom_level NOT NULL,
    target_score_percentage NUMERIC NOT NULL DEFAULT 70.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(course_id, code)
);

-- 6. Course Enrollments
CREATE TABLE IF NOT EXISTS public.enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(course_id, student_id)
);

-- 7. Course Materials (Stored in Supabase Storage 'course-materials')
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES public.course_units(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.course_topics(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    file_path TEXT NOT NULL,
    file_type TEXT NOT NULL, -- 'pdf', 'docx', 'pptx', 'txt'
    file_size BIGINT NOT NULL,
    extracted_text_snippet TEXT,
    uploaded_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. Assessments Table
CREATE TABLE IF NOT EXISTS public.assessments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    instructions TEXT,
    total_marks NUMERIC NOT NULL DEFAULT 100.0,
    passing_marks NUMERIC NOT NULL DEFAULT 60.0,
    duration_minutes INT NOT NULL DEFAULT 30,
    start_time TIMESTAMPTZ,
    end_time TIMESTAMPTZ,
    status assessment_status NOT NULL DEFAULT 'draft',
    is_results_released BOOLEAN NOT NULL DEFAULT false,
    created_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. Questions Table (Answer keys protected from active quiz queries)
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID REFERENCES public.assessments(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES public.course_units(id) ON DELETE SET NULL,
    topic_id UUID REFERENCES public.course_topics(id) ON DELETE SET NULL,
    learning_outcome_id UUID REFERENCES public.learning_outcomes(id) ON DELETE SET NULL,
    bloom_level bloom_level NOT NULL,
    difficulty question_difficulty NOT NULL DEFAULT 'medium',
    question_type question_type NOT NULL DEFAULT 'mcq',
    question_text TEXT NOT NULL,
    options JSONB NOT NULL DEFAULT '[]'::jsonb, -- array of {id: string, text: string}
    correct_answer JSONB NOT NULL, -- hidden from students until released
    explanation TEXT, -- hidden from students until released
    marks NUMERIC NOT NULL DEFAULT 5.0,
    is_ai_generated BOOLEAN NOT NULL DEFAULT false,
    is_approved BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Student Attempts
CREATE TABLE IF NOT EXISTS public.student_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assessment_id UUID NOT NULL REFERENCES public.assessments(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    attempt_number INT NOT NULL DEFAULT 1,
    start_time TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    submit_time TIMESTAMPTZ,
    total_score_obtained NUMERIC NOT NULL DEFAULT 0.0,
    total_max_marks NUMERIC NOT NULL DEFAULT 0.0,
    percentage NUMERIC NOT NULL DEFAULT 0.0,
    status attempt_status NOT NULL DEFAULT 'in_progress',
    UNIQUE(assessment_id, student_id, attempt_number)
);

-- 11. Student Answers
CREATE TABLE IF NOT EXISTS public.student_answers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.student_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    selected_option JSONB,
    is_correct BOOLEAN,
    marks_awarded NUMERIC NOT NULL DEFAULT 0.0,
    evaluation_notes TEXT,
    answered_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(attempt_id, question_id)
);

-- 12. Performance Reports
CREATE TABLE IF NOT EXISTS public.performance_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL UNIQUE REFERENCES public.student_attempts(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    overall_score NUMERIC NOT NULL,
    overall_percentage NUMERIC NOT NULL,
    topic_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb,
    blooms_breakdown JSONB NOT NULL DEFAULT '{}'::jsonb, -- 6 cognitive levels breakdown
    strengths JSONB NOT NULL DEFAULT '[]'::jsonb,
    weak_areas JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. Personalized AI Recommendations
CREATE TABLE IF NOT EXISTS public.recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_id UUID REFERENCES public.performance_reports(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    gap_summary TEXT NOT NULL,
    action_plan JSONB NOT NULL DEFAULT '[]'::jsonb,
    recommended_material_ids UUID[] DEFAULT ARRAY[]::UUID[],
    practice_questions JSONB NOT NULL DEFAULT '[]'::jsonb,
    ai_explanation TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. Notifications
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    link TEXT,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexes for lightning fast queries
CREATE INDEX IF NOT EXISTS idx_courses_faculty ON public.courses(faculty_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_student ON public.enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_questions_assessment ON public.questions(assessment_id);
CREATE INDEX IF NOT EXISTS idx_questions_bloom ON public.questions(bloom_level);
CREATE INDEX IF NOT EXISTS idx_attempts_student ON public.student_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_reports_student ON public.performance_reports(student_id);

-- Secure Student Active Questions View (Omits correct_answer and explanation to prevent answer leakage)
CREATE OR REPLACE VIEW public.student_quiz_view AS
SELECT 
    q.id,
    q.assessment_id,
    q.course_id,
    q.bloom_level,
    q.difficulty,
    q.question_type,
    q.question_text,
    q.options,
    q.marks
FROM public.questions q
JOIN public.assessments a ON q.assessment_id = a.id
WHERE a.status = 'published';
