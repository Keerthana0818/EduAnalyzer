import React, { useState } from 'react';
import { 
  GraduationCap, 
  FileCheck2, 
  Activity, 
  Sparkles, 
  Bot,
  Radio,
  Play
} from 'lucide-react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Modal } from '../../components/common/Modal';
import { ORDERED_BLOOM_LEVELS, BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import { useNavigate } from 'react-router-dom';
import { MockDatabase } from '../../services/mockDatabase';
import type { StudentQuizAttempt } from '../../services/mockDatabase';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

export const StudentDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isNfcModalOpen, setIsNfcModalOpen] = useState(false);
  const [nfcDone, setNfcDone] = useState(false);
  const [isQuizRunnerOpen, setIsQuizRunnerOpen] = useState(false);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [lastAttempt, setLastAttempt] = useState<StudentQuizAttempt | null>(null);

  const questions = MockDatabase.getQuestions().slice(0, 4);

  const stats = [
    { title: 'Enrolled Courses', value: '3 Active', sub: 'CS201, CS301, AI501', icon: GraduationCap, color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
    { title: 'Quizzes Completed', value: '8 Submissions', sub: 'Avg 84.5% score', icon: FileCheck2, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { title: 'Top Bloom Domain', value: 'Apply Tier', sub: '88% accuracy', icon: Activity, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' },
    { title: 'Growth Focus Area', value: 'Analyze Tier', sub: 'AVL Invariants', icon: Sparkles, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
  ];

  const handleStartQuiz = () => {
    setIsQuizRunnerOpen(true);
    setQuizSubmitted(false);
    setSelectedAnswers({});
  };

  const handleSelectOption = (qId: string, optId: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const handleSubmitQuiz = () => {
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
    <div className="space-y-6">
      <PageHeader
        title="Student Learning Space • Alex Johnson"
        description="Track your cognitive development across Bloom's Taxonomy, complete quizzes, and follow your AI improvement roadmap."
        actions={
          <div className="flex items-center gap-2.5">
            <Button 
              variant="outline" 
              leftIcon={<Radio className="w-4 h-4 text-cyan-400" />}
              onClick={() => setIsNfcModalOpen(true)}
            >
              {nfcDone ? 'NFC Checked In' : 'NFC Tap Check-in'}
            </Button>
            <Button 
              variant="teal" 
              leftIcon={<Bot className="w-4 h-4 text-slate-950" />}
              onClick={() => navigate('/student/assistant')}
            >
              Ask AI Study Tutor
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Card key={idx} className="border border-white/10 hover:border-cyan-500/40 transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.title}</p>
                <h3 className="text-xl font-extrabold text-white mt-1">{s.value}</h3>
                <span className="text-[10px] text-slate-400 mt-0.5 block">{s.sub}</span>
              </div>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg border ${s.color}`}>
                {idx === 0 ? '🎓' : idx === 1 ? '📊' : idx === 2 ? '⚡' : '✨'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: "Your Day" fluid timeline & Active Quizzes */}
        <div className="lg:col-span-2 space-y-5">
          {/* Your Day Fluid Connected Timeline Card */}
          <Card className="border border-teal-500/30 bg-gradient-to-r from-teal-950/20 via-[#0D1526] to-[#0D1526]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Day • Fluid Schedule</CardTitle>
                <CardDescription>Real-time campus timeline and pending evaluation checkpoints</CardDescription>
              </div>
              <span className="text-xs font-bold text-teal-300 px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/40">
                Today • Live
              </span>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="relative pl-7 space-y-4 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-teal-400 before:via-cyan-400 before:to-rose-500">
                {/* 10:00 AM Lab */}
                <div className="relative">
                  <div className="absolute -left-7 top-3 w-4 h-4 rounded-full bg-[#070B14] border-2 border-teal-400 flex items-center justify-center shadow-glow-teal">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-teal-400 block">10:00 AM</span>
                      <h4 className="text-sm font-bold text-white">Interactive CS201 Lab</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Campus Shuttle departs in 5 mins • Room 204A</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => setIsNfcModalOpen(true)}>
                      Tap to Enter
                    </Button>
                  </div>
                </div>

                {/* 1:30 PM Study Group */}
                <div className="relative">
                  <div className="absolute -left-7 top-3 w-4 h-4 rounded-full bg-[#070B14] border-2 border-slate-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-slate-400 block">1:30 PM</span>
                      <h4 className="text-sm font-bold text-white">Study Group with Team Beta</h4>
                      <p className="text-xs text-slate-400 mt-0.5">Algorithms & Dynamic Programming Review</p>
                    </div>
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-purple-500 border-2 border-[#070B14] flex items-center justify-center text-xs font-bold">M</div>
                      <div className="w-7 h-7 rounded-full bg-cyan-500 border-2 border-[#070B14] flex items-center justify-center text-xs font-bold">P</div>
                      <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-[#070B14] flex items-center justify-center text-xs font-bold">J</div>
                    </div>
                  </div>
                </div>

                {/* 4:00 PM Quiz Deadline with glowing coral border */}
                <div className="relative">
                  <div className="absolute -left-7 top-3 w-4 h-4 rounded-full bg-[#070B14] border-2 border-rose-500 flex items-center justify-center shadow-glow-coral animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/40 to-slate-900/60 border border-rose-500/60 shadow-glow-coral flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold text-rose-400">4:00 PM DEADLINE</span>
                        <Badge variant="coral" size="sm">Bloom Evaluation</Badge>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-0.5">
                        Quiz Deadline: AVL Trees & Balance Conditions
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        CS-301 • 4 Questions • Deterministic Evaluation
                      </p>
                    </div>
                    <Button 
                      variant="coral" 
                      size="sm" 
                      leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}
                      onClick={handleStartQuiz}
                    >
                      Attempt Quiz
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Personalized Remediation Card */}
          <Card className="border border-indigo-500/30 bg-gradient-to-r from-indigo-950/20 via-[#0D1526] to-[#0D1526]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-300 font-bold">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <CardTitle>AI Personalized Improvement Plan</CardTitle>
              </div>
              <Badge variant="analyze" size="sm">Analyze Tier</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 space-y-2">
                <h5 className="text-xs font-bold text-white">Target Concept: AVL Rotation Invariants & Subtree Heights</h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your assessment revealed strong recall of AVL definitions (Remember), but you missed points tracing parent balance factor updates in Double Left-Right rotations (Analyze).
                </p>
                <div className="flex gap-2.5 pt-1">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/student/recommendations')}
                  >
                    View Slides & Action Steps
                  </Button>
                  <Button 
                    size="sm" 
                    variant="teal"
                    onClick={() => navigate('/student/recommendations')}
                  >
                    Take Adaptive Practice Problem
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Bloom's Cognitive Radar Breakdown & Campus Mood */}
        <div className="space-y-5">
          {/* Bloom's Cognitive Mastery */}
          <Card>
            <CardHeader>
              <CardTitle>My Bloom's Cognitive Profile</CardTitle>
              <CardDescription>Demonstrated ability from deterministic quiz evaluations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {ORDERED_BLOOM_LEVELS.map((level) => {
                const meta = BLOOM_LEVELS[level];
                const studentMastery: Record<string, number> = {
                  remember: 92,
                  understand: 84,
                  apply: 88,
                  analyze: 58,
                  evaluate: 64,
                  create: 50,
                };
                return (
                  <div key={level} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span 
                          className="w-2.5 h-2.5 rounded-full" 
                          style={{ backgroundColor: meta.color.hex, boxShadow: `0 0 8px ${meta.color.hex}` }} 
                        />
                        <span className="font-semibold text-slate-200">{meta.label}</span>
                      </div>
                      <span className="font-bold text-teal-300">{studentMastery[level]}%</span>
                    </div>
                    <ProgressBar
                      value={studentMastery[level]}
                      variant={level}
                      size="sm"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Campus Mood & Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Campus Mood & Activity</CardTitle>
              <CardDescription>Student collaboration and live vibe checker</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Peer Helpdesk</h5>
                  <p className="text-[10px] text-slate-400">12 students active in CS301</p>
                </div>
                <Button size="sm" variant="ghost" onClick={() => navigate('/student/assistant')}>
                  Join Q&A
                </Button>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-white">Campus Vibe Checker</h5>
                  <p className="text-[10px] text-teal-300">Quiet study spots available in West Wing</p>
                </div>
                <div className="flex -space-x-1.5">
                  <div className="w-5 h-5 rounded-full bg-rose-500/70" />
                  <div className="w-5 h-5 rounded-full bg-teal-400/80" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quiz Runner Modal */}
      <Modal
        isOpen={isQuizRunnerOpen}
        onClose={() => setIsQuizRunnerOpen(false)}
        title={quizSubmitted ? "Quiz Completed • Deterministic Evaluation" : "Active Quiz: AVL Trees & Balance Conditions"}
        description={quizSubmitted ? "Evaluation completed. Marks are strictly deterministic." : "Time remaining: 10:00 • 4 Questions"}
        size="lg"
      >
        {!quizSubmitted ? (
          <div className="space-y-4 text-slate-100">
            {questions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal-400">Question {idx + 1}</span>
                    <Badge variant={q.bloomLevel} size="sm">
                      {BLOOM_LEVELS[q.bloomLevel].label}
                    </Badge>
                  </div>
                  <span className="text-slate-400 font-semibold">{q.marks} Marks</span>
                </div>
                <p className="text-sm font-bold text-white">{q.text}</p>

                <div className="space-y-1.5 pt-1">
                  {q.options.map(opt => {
                    const isSelected = selectedAnswers[q.id] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 cursor-pointer transition-all ${isSelected ? 'bg-teal-950/60 border-teal-400 font-bold text-teal-200 shadow-glow-teal' : 'bg-white/[0.02] border-white/10 text-slate-300 hover:bg-white/[0.06]'}`}
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
              <Button variant="outline" onClick={() => setIsQuizRunnerOpen(false)}>
                Cancel
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
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border border-teal-500/40 text-center space-y-1">
              <span className="text-xs font-bold text-teal-300 uppercase tracking-wider">Evaluation Completed</span>
              <h2 className="text-3xl font-extrabold text-white">
                {lastAttempt?.score} / {lastAttempt?.maxScore}{' '}
                <span className="text-teal-400 text-xl font-bold">({lastAttempt?.percentage}%)</span>
              </h2>
            </div>
            <div className="flex justify-end pt-2">
              <Button variant="teal" onClick={() => setIsQuizRunnerOpen(false)}>
                Done & Return
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* NFC Modal */}
      <Modal
        isOpen={isNfcModalOpen}
        onClose={() => setIsNfcModalOpen(false)}
        title="NFC Digital ID Keycard"
        description="Student Attendance & Lab Door Access"
      >
        <div className="p-6 rounded-2xl bg-gradient-to-tr from-cyan-950/80 via-slate-900 to-teal-950/80 border border-cyan-400/40 shadow-glow-cyan text-center space-y-3">
          <div className="w-14 h-14 rounded-full bg-cyan-400/20 text-cyan-300 mx-auto flex items-center justify-center animate-pulse">
            <Radio className="w-7 h-7 text-cyan-400" />
          </div>
          <h3 className="text-sm font-bold text-white">Alex Johnson</h3>
          <p className="text-xs text-cyan-300">STU-2026-8849</p>
          <Button 
            variant="teal" 
            className="w-full mt-2"
            onClick={() => {
              setNfcDone(true);
              setIsNfcModalOpen(false);
            }}
          >
            {nfcDone ? 'CS201 Lab Check-in Complete' : 'Simulate NFC Tap to Check-in'}
          </Button>
        </div>
      </Modal>
    </div>
  );
};
