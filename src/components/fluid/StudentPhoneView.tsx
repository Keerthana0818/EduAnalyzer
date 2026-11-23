import React, { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Radio, 
  Bell,
  Home, 
  Calendar, 
  MapPin, 
  CreditCard,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { MockDatabase } from '../../services/mockDatabase';
import type { StudentQuizAttempt } from '../../services/mockDatabase';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';

export const StudentPhoneView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'courses' | 'id' | 'notifications'>('home');
  const [nfcCheckedIn, setNfcCheckedIn] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [lastAttempt, setLastAttempt] = useState<StudentQuizAttempt | null>(null);
  const [isNfcModalOpen, setIsNfcModalOpen] = useState(false);
  const [isHelpdeskOpen, setIsHelpdeskOpen] = useState(false);

  const questions = MockDatabase.getQuestions().slice(0, 4);

  const handleStartQuiz = () => {
    setIsQuizModalOpen(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const handleSelectOption = (qId: string, optId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleSubmitQuiz = () => {
    // Deterministic evaluation:
    let totalScore = 0;
    let maxScore = 0;
    const bloomsBreakdown: Record<BloomLevel, { score: number; max: number; percentage: number }> = {
      remember: { score: 0, max: 0, percentage: 0 },
      understand: { score: 0, max: 0, percentage: 0 },
      apply: { score: 0, max: 0, percentage: 0 },
      analyze: { score: 0, max: 0, percentage: 0 },
      evaluate: { score: 0, max: 0, percentage: 0 },
      create: { score: 0, max: 0, percentage: 0 },
    };

    questions.forEach(q => {
      maxScore += q.marks;
      bloomsBreakdown[q.bloomLevel].max += q.marks;
      if (selectedAnswers[q.id] === q.correctAnswer) {
        totalScore += q.marks;
        bloomsBreakdown[q.bloomLevel].score += q.marks;
      }
    });

    Object.keys(bloomsBreakdown).forEach(k => {
      const lvl = k as BloomLevel;
      if (bloomsBreakdown[lvl].max > 0) {
        bloomsBreakdown[lvl].percentage = Math.round(
          (bloomsBreakdown[lvl].score / bloomsBreakdown[lvl].max) * 100
        );
      }
    });

    const percentage = Math.round((totalScore / maxScore) * 100);

    const attempt: StudentQuizAttempt = {
      id: 'att_' + Date.now(),
      quizId: 'quiz_avl_balance',
      quizTitle: 'AVL Trees & Balance Conditions',
      courseCode: 'CS-301',
      date: 'Just now',
      score: totalScore,
      maxScore,
      percentage,
      bloomsBreakdown,
      weakBloom: 'analyze',
      strongBloom: percentage >= 75 ? 'apply' : 'remember',
    };

    MockDatabase.saveAttempt(attempt);
    setLastAttempt(attempt);
    setQuizSubmitted(true);
  };

  return (
    <div className="w-[380px] h-[812px] bg-[#070B14] rounded-[48px] p-3 border-[6px] border-[#1E293B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,229,190,0.15)] flex flex-col relative overflow-hidden select-none font-sans">
      {/* Phone Frame Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-40 flex items-center justify-center">
        {/* Dynamic Island Pill */}
        <div className="w-20 h-3.5 bg-[#0F172A] rounded-full flex items-center justify-between px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 animate-pulse" />
          <div className="w-2 h-2 rounded-full bg-black border border-white/20" />
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-9 px-6 pt-1 flex items-center justify-between text-[11px] font-semibold text-slate-300 z-30">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Scrollable Screen Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 pt-2 space-y-4 text-slate-100">
        {/* Header Profile + NFC Tap */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 3D Avatar */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 p-0.5 shadow-[0_0_15px_rgba(251,146,60,0.4)]">
                <div className="w-full h-full bg-[#0F172A] rounded-2xl flex items-center justify-center text-xl">
                  🧑‍💻
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070B14]" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Hey,</span>
              <h2 className="text-base font-bold text-white tracking-tight leading-none">Alex!</h2>
            </div>
          </div>

          {/* NFC Tap Card with radiating waves */}
          <button 
            onClick={() => setIsNfcModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/[0.04] border border-cyan-500/30 hover:border-cyan-400/60 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all group active:scale-95"
          >
            <div className="text-right">
              <span className="text-[10px] font-bold text-white block leading-tight">
                {nfcCheckedIn ? 'Checked In' : 'NFC Tap'}
              </span>
              <span className="text-[9px] text-cyan-300/80 block leading-tight">
                {nfcCheckedIn ? 'CS201 Lab' : 'to Check-in'}
              </span>
            </div>
            <div className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center relative group-hover:scale-110 transition-transform">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            </div>
          </button>
        </div>

        {/* Section: "Your Day" Fluid Connected Timeline */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Your Day</h3>
            <span className="text-[10px] text-teal-400 font-semibold cursor-pointer hover:underline">
              Today • Nov 23
            </span>
          </div>

          <div className="relative pl-6 space-y-3.5 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-teal-400 before:via-cyan-400 before:to-rose-500">
            {/* Timeline item 1 */}
            <div className="relative">
              <div className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#070B14] border-2 border-teal-400 flex items-center justify-center shadow-[0_0_10px_rgba(0,229,190,0.6)]">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-md hover:border-teal-400/40 transition-colors">
                <span className="text-[10px] font-bold text-teal-400 block mb-0.5">10:00 AM</span>
                <h4 className="text-xs font-bold text-white">Interactive CS201 Lab</h4>
                <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                  <span>🚌 Campus Shuttle departs in 5 mins</span>
                  <span className="text-rose-400 font-bold">• -8 min</span>
                </p>
              </div>
            </div>

            {/* Timeline item 2 */}
            <div className="relative">
              <div className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#070B14] border-2 border-slate-500 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.07] backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">1:30 PM</span>
                  <h4 className="text-xs font-bold text-white">Study Group with Team Beta</h4>
                </div>
                {/* Team Avatars */}
                <div className="flex -space-x-1.5 overflow-hidden">
                  <div className="w-5 h-5 rounded-full bg-purple-500 border border-[#070B14] text-[9px] flex items-center justify-center font-bold">M</div>
                  <div className="w-5 h-5 rounded-full bg-cyan-500 border border-[#070B14] text-[9px] flex items-center justify-center font-bold">P</div>
                  <div className="w-5 h-5 rounded-full bg-amber-500 border border-[#070B14] text-[9px] flex items-center justify-center font-bold">J</div>
                </div>
              </div>
            </div>

            {/* Timeline item 3 (Glowing Coral Quiz Deadline!) */}
            <div className="relative">
              <div className="absolute -left-6 top-3 w-4 h-4 rounded-full bg-[#070B14] border-2 border-rose-500 flex items-center justify-center shadow-[0_0_12px_rgba(244,63,94,0.7)] animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              </div>
              <div 
                onClick={handleStartQuiz}
                className="p-3 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900/60 border border-rose-500/60 shadow-[0_0_20px_rgba(244,63,94,0.25)] backdrop-blur-md cursor-pointer hover:border-rose-400 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-rose-400 block">4:00 PM</span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-300 px-1.5 py-0.5 rounded bg-rose-500/20 border border-rose-500/40">
                    Bloom's Eval
                  </span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <h4 className="text-xs font-bold text-white group-hover:text-rose-200 transition-colors">
                    Quiz Deadline: AVL Trees & Balance
                  </h4>
                  <ChevronRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
                </div>
                <p className="text-[10px] text-slate-300 mt-1">
                  CS-301 • 4 Questions • Deterministic Evaluation
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section: "Campus Mood & Activity" Glass Cards */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Campus Mood & Activity</h3>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Peer Helpdesk */}
            <div 
              onClick={() => setIsHelpdeskOpen(true)}
              className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-400/40 cursor-pointer transition-all flex flex-col justify-between"
            >
              <div>
                <h4 className="text-[11px] font-bold text-white leading-tight">Peer Helpdesk</h4>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Q&A community space</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base">🙋‍♂️</span>
                <span className="text-xs">💬</span>
              </div>
            </div>

            {/* Quest */}
            <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-teal-400/40 cursor-pointer transition-all flex flex-col justify-between">
              <div>
                <h4 className="text-[11px] font-bold text-white leading-tight">Quest</h4>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">A gamified motivation</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base">🏆</span>
                <span className="text-[10px] font-bold text-amber-400">+120 XP</span>
              </div>
            </div>

            {/* Quest Hub */}
            <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-400/40 cursor-pointer transition-all flex flex-col justify-between">
              <div>
                <h4 className="text-[11px] font-bold text-white leading-tight">Quest Hub</h4>
                <p className="text-[9px] text-slate-400 mt-0.5 leading-tight">Gamified campus events</p>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base">🎉</span>
                <span className="text-xs">✨</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Vibe Checker Pill Preview */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-teal-950/30 to-purple-950/30 border border-teal-500/20 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold text-teal-300">Campus Vibe Checker</span>
            <p className="text-[9px] text-slate-400">Library 4th floor quiet study: 35% capacity</p>
          </div>
          <div className="flex items-center -space-x-2">
            <div className="w-5 h-5 rounded-full bg-rose-500/60 blur-[1px]" />
            <div className="w-6 h-6 rounded-full bg-teal-400/70 blur-[1px]" />
            <div className="w-7 h-7 rounded-full bg-purple-500/60 blur-[1px]" />
          </div>
        </div>
      </div>

      {/* Floating Bottom Thumb-Friendly Dock Bar (Exact match to Mockup!) */}
      <div className="absolute bottom-4 left-4 right-4 h-14 bg-[#0D1527]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.7)] px-4 flex items-center justify-between z-30">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'home' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-bold">Home</span>
          {activeTab === 'home' && <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_#00E5BE]" />}
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'schedule' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">Smart Sched</span>
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'courses' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[9px] font-bold">Campus Maps</span>
        </button>

        <button
          onClick={() => setIsNfcModalOpen(true)}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'id' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span className="text-[9px] font-bold">Digital ID</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'notifications' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Bell className="w-4 h-4" />
          <span className="text-[9px] font-bold">Alerts</span>
        </button>
      </div>

      {/* Interactive Quiz Runner Modal */}
      <Modal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title={quizSubmitted ? "Quiz Completed • Deterministic Report" : "Active Quiz: AVL Trees & Balance Conditions"}
        description={quizSubmitted ? "Scored deterministically on server. AI is prohibited from altering marks." : "Time remaining: 10:00 • 4 Bloom-Mapped Questions"}
        size="lg"
      >
        {!quizSubmitted ? (
          <div className="space-y-5 text-slate-100">
            {/* Questions list */}
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-400">Q{idx + 1}.</span>
                    <Badge variant={q.bloomLevel} size="sm">
                      {BLOOM_LEVELS[q.bloomLevel].label}
                    </Badge>
                  </div>
                  <span className="text-slate-400 font-semibold">{q.marks} Marks</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">{q.text}</p>

                <div className="space-y-1.5 pt-1">
                  {q.options.map(opt => {
                    const isSelected = selectedAnswers[q.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition-all ${isSelected ? 'bg-teal-950/60 border-teal-400 font-bold text-teal-200 shadow-[0_0_10px_rgba(0,229,190,0.2)]' : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.06]'}`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${isSelected ? 'bg-teal-400 text-slate-950' : 'bg-white/10 text-slate-300'}`}>
                          {opt.id}
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsQuizModalOpen(false)}>
                Save for Later
              </Button>
              <Button 
                variant="teal" 
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length === 0}
              >
                Submit Answers for Grading
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-slate-100">
            {/* Score Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/70 to-emerald-950/70 border border-teal-500/40 text-center space-y-1">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Overall Score</span>
              <h2 className="text-3xl font-extrabold text-white">
                {lastAttempt?.score} / {lastAttempt?.maxScore}{' '}
                <span className="text-teal-400 text-xl font-bold">({lastAttempt?.percentage}%)</span>
              </h2>
              <p className="text-xs text-slate-300">
                Evaluation calculated deterministically according to Bloom's Revised Taxonomy.
              </p>
            </div>

            {/* Cognitive Breakdown */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Cognitive Mastery by Bloom's Level
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(lastAttempt?.bloomsBreakdown || {}).map(([lvl, data]) => {
                  if (data.max === 0) return null;
                  const bloomLvl = lvl as BloomLevel;
                  return (
                    <div key={lvl} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Badge variant={bloomLvl} size="sm">
                          {BLOOM_LEVELS[bloomLvl].label}
                        </Badge>
                      </div>
                      <span className="font-bold text-teal-300">{data.score} / {data.max} ({data.percentage}%)</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Recommendation Trigger */}
            <div className="p-3.5 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Gemini Remediation Roadmap Available</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Your highest cognitive mastery is in <strong>Apply</strong>, but you dropped marks on <strong>Analyze</strong> (AVL deletion invariants). A tailored study plan has been generated.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="teal" onClick={() => setIsQuizModalOpen(false)}>
                Done & Return to Dashboard
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* NFC Digital ID Modal */}
      <Modal
        isOpen={isNfcModalOpen}
        onClose={() => setIsNfcModalOpen(false)}
        title="Digital Campus ID & NFC Keycard"
        description="Near Field Communication for attendance check-ins, lab access, and transit."
      >
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-cyan-950/80 via-slate-900 to-teal-950/80 border border-cyan-400/40 shadow-glow-cyan text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-400/20 text-cyan-300 mx-auto flex items-center justify-center animate-pulse">
            <Radio className="w-8 h-8 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Alex Johnson</h3>
            <p className="text-xs text-cyan-300">ID: STU-2026-8849 • Computer Science</p>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center justify-around">
            <div>
              <span className="block text-[10px] text-slate-500 uppercase">Status</span>
              <span className="font-bold text-emerald-400">Enrolled Active</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 uppercase">Lab Access</span>
              <span className="font-bold text-teal-300">CS201 & AI-Lab</span>
            </div>
          </div>
          <Button 
            variant="teal" 
            className="w-full"
            onClick={() => {
              setNfcCheckedIn(true);
              setIsNfcModalOpen(false);
            }}
          >
            {nfcCheckedIn ? 'Already Checked In to CS201 Lab' : 'Simulate NFC Tap at CS201 Door'}
          </Button>
        </div>
      </Modal>

      {/* Peer Helpdesk Modal */}
      <Modal
        isOpen={isHelpdeskOpen}
        onClose={() => setIsHelpdeskOpen(false)}
        title="Peer Helpdesk • Community Q&A"
        description="Collaborate with peers in CS-201, CS-301, and AI-501."
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <span className="font-bold text-teal-300">Priya Sharma asked in CS-301:</span>
            <p className="text-slate-300">"Can someone clarify why an RL rotation needs two steps instead of just one left rotation?"</p>
            <div className="text-[10px] text-slate-400 flex items-center gap-2 pt-1">
              <span>3 replies</span> • <span className="text-emerald-400 font-semibold">Answered by TA</span>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs" onClick={() => setIsHelpdeskOpen(false)}>
            Close Community Space
          </Button>
        </div>
      </Modal>
    </div>
  );
};
