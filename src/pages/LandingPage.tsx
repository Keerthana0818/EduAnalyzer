import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card, CardContent } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { useRolePreview } from '../context/RolePreviewContext';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../lib/bloomsTaxonomy';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useRolePreview();

  const handleEnterFaculty = () => {
    setRole('faculty');
    navigate('/faculty/dashboard');
  };

  const handleEnterStudent = () => {
    setRole('student');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Top Banner */}
      <header className="px-6 lg:px-12 py-5 border-b border-slate-200/80 bg-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-bold text-slate-900 tracking-tight text-xl">EduAnalyzer</span>
            <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
              Bloom's Taxonomy + Gemini AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={handleEnterStudent}>
            Student Demo
          </Button>
          <Button size="sm" onClick={handleEnterFaculty}>
            Faculty Demo
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-12 lg:py-20 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
          Next-Gen Cognitive Learning & Ability Analysis
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Evaluate Student Ability Beyond Grades with{' '}
          <span className="bg-gradient-to-r from-brand-600 to-indigo-600 bg-clip-text text-transparent">
            Bloom's Taxonomy & AI
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          EduAnalyzer connects faculty and students through automated cognitive analytics. Every question and learning outcome is mapped to the 6 levels of Bloom's Taxonomy, generating actionable growth recommendations without compromising deterministic grading.
        </p>

        {/* Dual Entrance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-6 text-left">
          {/* Faculty Portal Entry */}
          <Card className="hover:border-brand-500 hover:shadow-md transition-all cursor-pointer group" onClick={handleEnterFaculty}>
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                  Faculty Workspace
                  <ArrowRight className="w-4 h-4 text-brand-600 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Create courses, define Bloom-mapped learning outcomes, generate AI questions from uploaded materials, and inspect class cognitive heatmaps.
                </p>
              </div>
              <Button size="sm" className="w-full">
                Enter as Faculty
              </Button>
            </CardContent>
          </Card>

          {/* Student Portal Entry */}
          <Card className="hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group" onClick={handleEnterStudent}>
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center justify-between">
                  Student Learning Portal
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Access course lecture notes, take timed quizzes, view cognitive radar profiles, and receive personalized AI remediation roadmaps.
                </p>
              </div>
              <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                Enter as Student
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bloom's 6 Cognitive Domains Visual Ribbon */}
        <div className="pt-10">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Built on Bloom's Revised Cognitive Taxonomy
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
            {ORDERED_BLOOM_LEVELS.map((lvl) => (
              <Badge key={lvl} variant={lvl} size="md" className="py-1 px-3 text-xs font-semibold">
                {BLOOM_LEVELS[lvl].order}. {BLOOM_LEVELS[lvl].label}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Key Pillar Feature Highlights */}
      <section className="bg-white border-t border-slate-200/80 py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Cognitive Mapping</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Every question and outcome is categorized into Remember, Understand, Apply, Analyze, Evaluate, or Create.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Deterministic Grading</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Transparent, mathematical scoring on the server ensures zero hallucination and strict test integrity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">Google Gemini AI Engine</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Generates rigorous assessment questions from uploaded course materials and produces personalized study roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-400">
        © 2026 EduAnalyzer Platform • Designed for Faculty & Students
      </footer>
    </div>
  );
};
