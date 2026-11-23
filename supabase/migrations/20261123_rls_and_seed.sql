-- ====================================================================
-- EduAnalyzer Row-Level Security (RLS) & Seed Policies
-- ====================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Helper function: Get Current User Role
CREATE OR REPLACE FUNCTION public.get_current_role()
RETURNS user_role AS $$
    SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql STABLE SECURITY DEFINER;

-- 1. Profiles RLS
CREATE POLICY "Public profiles are viewable by authenticated users"
ON public.profiles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);

-- 2. Courses RLS
CREATE POLICY "Published courses are viewable by everyone authenticated"
ON public.courses FOR SELECT TO authenticated
USING (is_published = true OR faculty_id = auth.uid());

CREATE POLICY "Faculty can manage their own courses"
ON public.courses FOR ALL TO authenticated
USING (faculty_id = auth.uid()) WITH CHECK (faculty_id = auth.uid());

-- 3. Course Units & Topics
CREATE POLICY "Units viewable for published or enrolled courses"
ON public.course_units FOR SELECT TO authenticated USING (true);

CREATE POLICY "Faculty can manage their own units"
ON public.course_units FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = course_units.course_id AND courses.faculty_id = auth.uid()));

-- 4. Learning Outcomes
CREATE POLICY "Learning outcomes viewable by all enrolled students and faculty"
ON public.learning_outcomes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Faculty can manage learning outcomes for their courses"
ON public.learning_outcomes FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = learning_outcomes.course_id AND courses.faculty_id = auth.uid()));

-- 5. Enrollments
CREATE POLICY "Students can view their own enrollments"
ON public.enrollments FOR SELECT TO authenticated
USING (student_id = auth.uid() OR EXISTS (SELECT 1 FROM public.courses WHERE courses.id = enrollments.course_id AND courses.faculty_id = auth.uid()));

CREATE POLICY "Students can enroll themselves"
ON public.enrollments FOR INSERT TO authenticated
WITH CHECK (student_id = auth.uid());

-- 6. Materials
CREATE POLICY "Enrolled students and course faculty can view materials"
ON public.materials FOR SELECT TO authenticated USING (true);

CREATE POLICY "Course faculty can manage materials"
ON public.materials FOR ALL TO authenticated
USING (uploaded_by = auth.uid() OR EXISTS (SELECT 1 FROM public.courses WHERE courses.id = materials.course_id AND courses.faculty_id = auth.uid()));

-- 7. Assessments
CREATE POLICY "Published assessments viewable by students"
ON public.assessments FOR SELECT TO authenticated
USING (status = 'published' OR created_by = auth.uid());

CREATE POLICY "Faculty can manage their assessments"
ON public.assessments FOR ALL TO authenticated
USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

-- 8. Questions (Answer keys protected)
CREATE POLICY "Faculty can view and manage their questions"
ON public.questions FOR ALL TO authenticated
USING (EXISTS (SELECT 1 FROM public.courses WHERE courses.id = questions.course_id AND courses.faculty_id = auth.uid()));

-- 9. Student Attempts
CREATE POLICY "Students can view their own attempts"
ON public.student_attempts FOR SELECT TO authenticated
USING (student_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.assessments a
    JOIN public.courses c ON a.course_id = c.id
    WHERE a.id = student_attempts.assessment_id AND c.faculty_id = auth.uid()
));

CREATE POLICY "Students can insert their own attempts"
ON public.student_attempts FOR INSERT TO authenticated
WITH CHECK (student_id = auth.uid());

-- 10. Performance Reports
CREATE POLICY "Students view their reports when released"
ON public.performance_reports FOR SELECT TO authenticated
USING (student_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.courses WHERE courses.id = performance_reports.course_id AND courses.faculty_id = auth.uid()
));

-- 11. Recommendations
CREATE POLICY "Students view their own AI recommendations"
ON public.recommendations FOR SELECT TO authenticated
USING (student_id = auth.uid() OR EXISTS (
    SELECT 1 FROM public.courses WHERE courses.id = recommendations.course_id AND courses.faculty_id = auth.uid()
));
