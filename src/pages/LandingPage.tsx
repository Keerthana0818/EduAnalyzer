import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Sparkles, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  BookOpen,
  Smartphone
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
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between">
      {/* Top Banner */}
      <header className="px-6 lg:px-12 py-5 border-b border-white/[0.08] bg-[#070B14]/80 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-glow-teal">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-white tracking-tight text-xl">EduAnalyzer</span>
            <span className="ml-2 text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Bloom's Taxonomy + Gemini AI
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="teal" 
            size="sm" 
            leftIcon={<Smartphone className="w-4 h-4 text-slate-950" />}
            onClick={() => navigate('/fluid')}
          >
            Launch Dual Flow View
          </Button>
          <Button variant="outline" size="sm" onClick={handleEnterStudent}>
            Alex (Student)
          </Button>
          <Button size="sm" onClick={handleEnterFaculty}>
            Dr. Elena (Faculty)
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 lg:px-12 py-12 lg:py-20 max-w-6xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-bold shadow-glow-teal">
          <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          Dynamic Flow & Fluid Spaces • Cognitive Ability Analysis
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          Evaluate Student Ability Beyond Grades with{' '}
          <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Bloom's Taxonomy & AI
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
          EduAnalyzer connects faculty and students through automated cognitive analytics. Every question and learning outcome is mapped to the 6 levels of Bloom's Taxonomy, generating actionable growth recommendations without compromising deterministic grading.
        </p>

        {/* Dual Entrance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto pt-6 text-left">
          {/* Faculty Portal Entry */}
          <Card className="hover:border-teal-400 hover:shadow-glow-teal transition-all cursor-pointer group" onClick={handleEnterFaculty}>
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6 text-teal-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  Faculty Workspace • Dr. Elena
                  <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Class mode launcher, instant polls, question queues, Bloom outcome mapping, AI question synthesis, and smart office hours scheduling.
                </p>
              </div>
              <Button size="sm" variant="teal" className="w-full">
                Enter Faculty Command Center
              </Button>
            </CardContent>
          </Card>

          {/* Student Portal Entry */}
          <Card className="hover:border-cyan-400 hover:shadow-glow-cyan transition-all cursor-pointer group" onClick={handleEnterStudent}>
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white flex items-center justify-between">
                  Student Learning Portal • Alex
                  <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  "Your Day" fluid schedule, NFC attendance check-in, timed Bloom quiz engine, cognitive radar profiles, and AI study tutor.
                </p>
              </div>
              <Button size="sm" variant="outline" className="w-full border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10">
                Enter Student Space
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Bloom's 6 Cognitive Domains Visual Ribbon */}
        <div className="pt-10">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
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
      <section className="bg-white/[0.02] border-t border-white/[0.08] py-12 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Cognitive Mapping</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every question and outcome is categorized into Remember, Understand, Apply, Analyze, Evaluate, or Create.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Deterministic Grading</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Transparent, mathematical scoring on the server ensures zero hallucination and strict test integrity.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Google Gemini AI Engine</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Generates rigorous assessment questions from uploaded course materials and produces personalized study roadmaps.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-white/[0.08] text-center text-xs text-slate-500">
        © 2026 EduAnalyzer Platform • Dynamic Flow & Fluid Spaces • Designed for Faculty & Students
      </footer>
    </div>
  );
};
