import React, { useState } from 'react';
import { 
  Sparkles, 
  Send
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

export const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [classMode, setClassMode] = useState(true);
  const [poll, setPoll] = useState(MockDatabase.getLivePoll());
  const [questionsQueue, setQuestionsQueue] = useState(MockDatabase.getQuestionQueue());
  const [activeQuestion, setActiveQuestion] = useState<{ id: string; student: string; question: string; time: string } | null>(null);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [broadcastDone, setBroadcastDone] = useState(false);

  const stats = [
    { title: 'Class Mode', value: classMode ? 'Active LIVE' : 'Standby', sub: 'CS-302 Lecture Hall 4B', color: 'text-teal-400 bg-teal-500/10 border-teal-500/30' },
    { title: 'Average Engagement', value: '84%', sub: '+6% from last quiz', color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30' },
    { title: 'Questions in Queue', value: `${questionsQueue.length} Active`, sub: 'Raised hands ✋', color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { title: 'AI Questions in Bank', value: '186', sub: 'Bloom-mapped', color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
  ];

  const handleVote = (optId: string) => {
    MockDatabase.votePoll(optId);
    setPoll(MockDatabase.getLivePoll());
  };

  const handleDismissQuestion = (id: string) => {
    MockDatabase.dismissQuestion(id);
    setQuestionsQueue(MockDatabase.getQuestionQueue());
    setActiveQuestion(null);
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['10 am', '1 pm', '4 pm', '6 pm'];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Live Lecture & Course Command Hub"
        description="Monitor real-time student engagement, launch instant live polls, and manage Bloom-mapped learning outcomes."
        actions={
          <div className="flex items-center gap-2.5">
            {/* Live Class Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/[0.04] px-3.5 py-1.5 rounded-xl border border-white/10">
              <span className="text-xs font-bold text-slate-300">Class Mode:</span>
              <button
                onClick={() => setClassMode(!classMode)}
                className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${classMode ? 'bg-teal-400 shadow-glow-teal' : 'bg-slate-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-slate-950 transition-transform ${classMode ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              leftIcon={<Send className="w-3.5 h-3.5 text-teal-400" />}
              onClick={() => setIsBroadcastOpen(true)}
            >
              Fast Broadcast
            </Button>

            <Button 
              variant="teal" 
              size="sm"
              leftIcon={<Sparkles className="w-4 h-4 text-slate-950" />}
              onClick={() => navigate('/faculty/questions')}
            >
              Generate AI Questions
            </Button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <Card key={idx} className="border border-white/10 hover:border-teal-500/40 transition-all">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.title}</p>
                <h3 className="text-xl font-extrabold text-white mt-1">{s.value}</h3>
                <span className="text-[10px] text-slate-400 mt-0.5 block">{s.sub}</span>
              </div>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-lg border ${s.color}`}>
                {idx === 0 ? '📡' : idx === 1 ? '📈' : idx === 2 ? '✋' : '🧠'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Live Lecture Hub + Instant Poll + Questions Queue */}
        <div className="lg:col-span-2 space-y-5">
          {/* Live Lecture Hub Card */}
          <Card className="border border-teal-500/30 bg-gradient-to-r from-teal-950/20 via-[#0D1526] to-[#0D1526]">
            <CardHeader className="pb-3 flex flex-row items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                  <CardTitle>Live Lecture Hub: CS-302</CardTitle>
                </div>
                <CardDescription>Real-time instant poll launcher and live interaction</CardDescription>
              </div>
              <span className="text-xs font-bold text-teal-300 px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/40">
                {poll.totalVotes} Active Votes
              </span>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-300">Active Poll: Ask CS302</span>
                  <span className="text-[11px] text-slate-400">Click any option to test voting</span>
                </div>
                <h4 className="text-sm font-bold text-white">{poll.question}</h4>

                <div className="space-y-2">
                  {poll.options.map(opt => {
                    const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleVote(opt.id)}
                        className="p-3 rounded-xl bg-white/[0.04] border border-white/10 hover:border-teal-400/50 cursor-pointer transition-all space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-200">{opt.text}</span>
                          <span className="font-bold text-teal-300">{opt.votes} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-teal-400 to-cyan-400 h-full rounded-full transition-all duration-300" 
                            style={{ width: `${pct}%` }} 
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Questions Queue with Raised Hands */}
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Questions Queue</span>
                    <Badge variant="teal" size="sm">{questionsQueue.length}</Badge>
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Students with hand raised in lecture</p>
                </div>
                <div className="flex items-center gap-2 overflow-x-auto">
                  {questionsQueue.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveQuestion(item)}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.06] border border-white/10 hover:border-teal-400 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all active:scale-95"
                    >
                      <span>{idx % 2 === 0 ? '✋' : '🙋‍♂️'}</span>
                      <span>{item.student.split(' ')[0]}</span>
                    </button>
                  ))}
                  {questionsQueue.length === 0 && (
                    <span className="text-xs text-slate-500">No pending questions!</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Rapid Grading & Assessment */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Rapid Grading & Assessment</CardTitle>
                <CardDescription>Swipe gestures and quick rubric evaluation</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/faculty/assessments')}
              >
                Open Full Gradebook
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-gradient-to-r from-rose-950/30 to-purple-950/30 border border-rose-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center text-lg">
                    📝
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white">Assignment 3: Red-Black vs AVL Rotations</h5>
                    <p className="text-[11px] text-slate-400">18 of 20 Students Submitted • 3 need AI gap feedback</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="coral"
                  onClick={() => navigate('/faculty/assessments')}
                >
                  Quick Grade
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Bloom's Coverage & Smart Scheduler */}
        <div className="space-y-5">
          {/* Bloom's Taxonomy Cognitive Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Bloom's Taxonomy Coverage</CardTitle>
              <CardDescription>Cognitive mastery across active curriculum</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {ORDERED_BLOOM_LEVELS.map((level) => {
                const meta = BLOOM_LEVELS[level];
                const sampleValues: Record<string, number> = {
                  remember: 88,
                  understand: 82,
                  apply: 74,
                  analyze: 58,
                  evaluate: 52,
                  create: 45,
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
                      <span className="text-teal-300 font-bold">{sampleValues[level]}% Mastery</span>
                    </div>
                    <ProgressBar
                      value={sampleValues[level]}
                      variant={level}
                      size="sm"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Smart Scheduler & Office Hours Grid */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Office Hours & Availability</CardTitle>
              <CardDescription>Tap slots to toggle open advising availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-7 gap-1 text-[10px] font-bold text-slate-400 text-center">
                <span />
                {days.map(d => (
                  <span key={d}>{d}</span>
                ))}
              </div>

              {times.map((t, rowIdx) => (
                <div key={t} className="grid grid-cols-7 gap-1 items-center text-center">
                  <span className="text-[9px] text-slate-500 font-medium text-left">{t}</span>
                  {days.map((d, colIdx) => {
                    const isAvailable = (rowIdx + colIdx) % 3 === 0;
                    return (
                      <button
                        key={`${t}_${d}`}
                        className={`h-5 rounded-md transition-all flex items-center justify-center ${isAvailable ? 'bg-teal-400 shadow-glow-teal' : 'bg-white/[0.04] hover:bg-white/10'}`}
                        title={`${d} at ${t}: ${isAvailable ? 'Open Slot' : 'Unavailable'}`}
                      />
                    );
                  })}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Raised Hand Question Modal */}
      <Modal
        isOpen={!!activeQuestion}
        onClose={() => setActiveQuestion(null)}
        title="Student Question from Queue"
        description={`Raised by ${activeQuestion?.student} • ${activeQuestion?.time}`}
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-black/40 border border-white/10">
            <span className="text-teal-300 font-bold block mb-1">Question:</span>
            <p className="text-slate-100 text-sm leading-relaxed">{activeQuestion?.question}</p>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setActiveQuestion(null)}>
              Keep in Queue
            </Button>
            <Button 
              variant="teal" 
              onClick={() => activeQuestion && handleDismissQuestion(activeQuestion.id)}
            >
              Answered Live & Dismiss
            </Button>
          </div>
        </div>
      </Modal>

      {/* Fast Broadcast Modal */}
      <Modal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        title="Fast Broadcast • Immediate Class Alert"
        description="Instantly send push notification and banner to enrolled classes."
      >
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Class</label>
            <select className="w-full rounded-xl bg-[#070B14] border border-white/10 p-2.5 text-slate-100">
              <option>CS-301: Advanced Algorithms</option>
              <option>CS-302: Database Systems</option>
              <option>All Enrolled Students</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Broadcast Announcement</label>
            <textarea
              className="w-full rounded-xl bg-[#070B14] border border-white/10 p-3 text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
              rows={3}
              placeholder="e.g. Please bring your laptops for the interactive CS201 lab this morning."
              value={broadcastMsg}
              onChange={(e) => setBroadcastMsg(e.target.value)}
            />
          </div>

          {broadcastDone && (
            <div className="p-3 bg-teal-950/60 border border-teal-500 rounded-xl text-teal-300 text-xs font-semibold">
              Broadcast dispatched to all student devices successfully!
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsBroadcastOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="teal" 
              onClick={() => {
                setBroadcastDone(true);
                setTimeout(() => {
                  setBroadcastDone(false);
                  setIsBroadcastOpen(false);
                }, 1000);
              }}
            >
              Dispatch Broadcast
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
