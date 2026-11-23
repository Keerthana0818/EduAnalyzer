import React, { useState } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Bell, 
  Home, 
  Calendar, 
  MapPin, 
  CreditCard,
  ChevronRight,
  Sparkles,
  Send,
  CheckCircle2
} from 'lucide-react';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { MockDatabase } from '../../services/mockDatabase';

export const FacultyPhoneView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'schedule' | 'courses' | 'id' | 'notifications'>('schedule');
  const [classMode, setClassMode] = useState(true);
  const [poll, setPoll] = useState(MockDatabase.getLivePoll());
  const [questionsQueue, setQuestionsQueue] = useState(MockDatabase.getQuestionQueue());
  const [activeQuestion, setActiveQuestion] = useState<{ id: string; student: string; question: string; time: string } | null>(null);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Office hours slot matrix state (glowing teal dots):
  const [slots, setSlots] = useState<Record<string, boolean>>({
    '1am_Tue': true,
    '6am_Tue': true,
    '6am_Thu': true,
    '6am_Fri': true,
    '7am_Wed': true,
    '8am_Mon': true,
  });

  const toggleSlot = (key: string) => {
    setSlots(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleVote = (optId: string) => {
    MockDatabase.votePoll(optId);
    setPoll(MockDatabase.getLivePoll());
  };

  const handleDismissQuestion = (id: string) => {
    MockDatabase.dismissQuestion(id);
    setQuestionsQueue(MockDatabase.getQuestionQueue());
    setActiveQuestion(null);
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastText.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastText('');
      setIsBroadcastModalOpen(false);
    }, 1200);
  };

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const times = ['1 am', '6 am', '7 pm', '8 pm'];

  return (
    <div className="w-[380px] h-[812px] bg-[#070B14] rounded-[48px] p-3 border-[6px] border-[#1E293B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.15)] flex flex-col relative overflow-hidden select-none font-sans">
      {/* Dynamic Island Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-40 flex items-center justify-center">
        <div className="w-20 h-3.5 bg-[#0F172A] rounded-full flex items-center justify-between px-2">
          <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
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

      {/* Screen Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-20 pt-2 space-y-4 text-slate-100">
        {/* Header Profile + Class Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* 3D Professor Avatar */}
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-400 via-teal-500 to-indigo-600 p-0.5 shadow-[0_0_15px_rgba(0,229,190,0.4)]">
                <div className="w-full h-full bg-[#0F172A] rounded-2xl flex items-center justify-center text-xl">
                  👩‍🏫
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070B14]" />
            </div>
            <div>
              <span className="text-[11px] text-slate-400 font-medium block">Welcome back,</span>
              <h2 className="text-base font-bold text-white tracking-tight leading-none">Dr. Elena</h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-xl bg-white/[0.04] text-slate-300 border border-white/10 hover:text-white">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#070B14]" />
            </button>
          </div>
        </div>

        {/* Class Mode Switch */}
        <div className="flex items-center justify-end gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Class Mode: On/Off</span>
          <button 
            onClick={() => setClassMode(!classMode)}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${classMode ? 'bg-teal-500 shadow-glow-teal' : 'bg-slate-700'}`}
          >
            <div 
              className={`w-5 h-5 rounded-full bg-white transition-transform ${classMode ? 'translate-x-5' : 'translate-x-0'}`} 
            />
          </button>
        </div>

        {/* Section: Live Lecture Hub */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white">Live Lecture Hub</h3>
              <p className="text-[10px] text-slate-400">Real-time "Instant Poll" launcher</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Instant Poll Card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-950/60 to-cyan-950/60 border border-teal-500/30 shadow-[0_0_20px_rgba(0,229,190,0.15)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-wider text-teal-300 px-2 py-0.5 rounded bg-teal-500/20 border border-teal-500/40">
                Instant Poll
              </span>
              <span className="text-[10px] text-teal-400 font-bold">{poll.totalVotes} Votes In</span>
            </div>

            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Ask CS302</h4>
              <ChevronRight className="w-4 h-4 text-teal-400" />
            </div>

            <p className="text-[11px] text-slate-200">{poll.question}</p>

            <div className="space-y-1.5 pt-1">
              {poll.options.map((opt) => (
                <div
                  key={opt.id}
                  onClick={() => handleVote(opt.id)}
                  className="p-2 rounded-xl bg-black/30 border border-white/10 hover:border-teal-400/50 cursor-pointer flex items-center justify-between text-[11px] transition-colors"
                >
                  <span className="font-semibold text-slate-200">{opt.text}</span>
                  <span className="font-bold text-teal-300">{opt.votes}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Questions Queue with raised hand emojis ✋ */}
          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-300">Questions Queue</span>
              <span className="text-teal-400 font-bold">{questionsQueue.length} Active</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto py-1">
              {questionsQueue.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setActiveQuestion(item)}
                  className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 hover:border-teal-400/50 flex items-center justify-center text-sm transition-transform active:scale-90"
                  title={`${item.student}: ${item.question}`}
                >
                  {idx % 2 === 0 ? '✋' : '🙋‍♂️'}
                </button>
              ))}
              {questionsQueue.length === 0 && (
                <span className="text-[10px] text-slate-500">Queue is clear!</span>
              )}
            </div>
          </div>
        </div>

        {/* Section: Rapid Grading & Assessment */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white">Rapid Grading & Assessment</h3>
              <p className="text-[10px] text-slate-400">Swipe gesture cards and post criteria</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Swipe gesture card */}
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-coral-500/80 to-rose-600 rounded-2xl p-3 text-white flex flex-col justify-between shadow-[0_0_20px_rgba(255,100,124,0.3)]">
              <div className="flex items-center justify-between text-[10px] font-bold opacity-80">
                <span>←</span>
                <span>Swipe</span>
                <span>→</span>
              </div>
              <div className="py-2 text-center">
                <span className="text-lg">👆</span>
                <h5 className="text-xs font-bold mt-1">Assignment 3</h5>
                <span className="text-[9px] opacity-80">Quick Evaluation</span>
              </div>
              <div className="text-[9px] text-center font-medium opacity-90">
                Grade: 18 / 20 Submitted
              </div>
            </div>

            {/* Average Class Engagement Gauge */}
            <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex flex-col items-center justify-center text-center">
              {/* Semi-circular gauge SVG */}
              <div className="relative w-20 h-11 overflow-hidden">
                <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800"
                    strokeWidth="3.8"
                    strokeDasharray="50, 100"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-teal-400 drop-shadow-[0_0_8px_rgba(0,229,190,0.8)]"
                    strokeWidth="3.8"
                    strokeDasharray="42, 100"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-x-0 bottom-0 text-center font-extrabold text-xs text-white">
                  84%
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-300 mt-1">
                Average Class Engagement
              </span>
              <div className="flex items-center justify-between w-full text-[8px] text-slate-500 mt-0.5">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>

          {/* AI Feedback Notification Pill */}
          <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between hover:border-teal-400/40 cursor-pointer transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-[9px] flex items-center justify-center">
                AI
              </span>
              <span className="text-[10px] font-semibold text-slate-200">
                3 students need feedback on Assignment 2
              </span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Section: Smart Scheduler & Office Hours Heatmap Matrix */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-white">Smart Scheduler & Office Hours</h3>
              <p className="text-[10px] text-slate-400">Students can book vacant slots with a single tap</p>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2">
            {/* Days row */}
            <div className="grid grid-cols-7 gap-1 text-[9px] font-bold text-slate-400 text-center">
              <span />
              {days.map(d => (
                <span key={d}>{d}</span>
              ))}
            </div>

            {/* Hours matrix */}
            {times.map(t => (
              <div key={t} className="grid grid-cols-7 gap-1 items-center text-center">
                <span className="text-[8px] text-slate-500 font-medium text-left">{t}</span>
                {days.map(d => {
                  const key = `${t.replace(/\s+/g, '')}_${d}`;
                  const isAvailable = slots[key];
                  return (
                    <button
                      key={key}
                      onClick={() => toggleSlot(key)}
                      className={`h-4 rounded-md transition-all flex items-center justify-center ${isAvailable ? 'bg-teal-400 shadow-[0_0_10px_rgba(0,229,190,0.8)]' : 'bg-white/[0.04] hover:bg-white/10'}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Section: Fast Broadcast */}
        <div 
          onClick={() => setIsBroadcastModalOpen(true)}
          className="p-3 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-white/10 hover:border-teal-400/40 cursor-pointer transition-colors space-y-1"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-white">Fast Broadcast</h4>
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Instantly send voice, text, or push alerts to specific classes
          </p>
        </div>
      </div>

      {/* Floating Bottom Thumb-Friendly Dock Bar */}
      <div className="absolute bottom-4 left-4 right-4 h-14 bg-[#0D1527]/90 backdrop-blur-2xl rounded-3xl border border-white/[0.12] shadow-[0_10px_30px_rgba(0,0,0,0.7)] px-4 flex items-center justify-between z-30">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'home' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[9px] font-bold">Home</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'schedule' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-bold">Smart Sched</span>
          {activeTab === 'schedule' && <div className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_6px_#00E5BE]" />}
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'courses' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <MapPin className="w-4 h-4" />
          <span className="text-[9px] font-bold">Campus Maps</span>
        </button>

        <button
          onClick={() => setActiveTab('id')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'id' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <CreditCard className="w-4 h-4" />
          <span className="text-[9px] font-bold">Faculty ID</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex flex-col items-center gap-0.5 transition-all ${activeTab === 'notifications' ? 'text-teal-400 scale-105' : 'text-slate-400 hover:text-slate-200'}`}
        >
          <Bell className="w-4 h-4" />
          <span className="text-[9px] font-bold">Alerts</span>
        </button>
      </div>

      {/* Answer Question Queue Modal */}
      <Modal
        isOpen={!!activeQuestion}
        onClose={() => setActiveQuestion(null)}
        title="Student Question in Queue"
        description={`Raised by ${activeQuestion?.student} • ${activeQuestion?.time}`}
      >
        <div className="space-y-4 text-xs text-slate-100">
          <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-teal-300 font-bold block mb-1">Question:</span>
            <p className="text-slate-200 text-sm leading-relaxed">{activeQuestion?.question}</p>
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
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        title="Fast Broadcast • Immediate Alert"
        description="Broadcast push notification and banner to CS-301 or CS-302 students."
      >
        <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1">Target Class</label>
            <select className="w-full rounded-xl bg-black/40 border border-white/10 p-2.5 text-slate-100">
              <option>CS-301: Advanced Algorithms</option>
              <option>CS-302: Database Systems</option>
              <option>All Enrolled Classes</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Broadcast Message</label>
            <textarea
              className="w-full rounded-xl bg-black/40 border border-white/10 p-3 text-slate-100 placeholder:text-slate-500 focus:border-teal-400 focus:outline-none"
              rows={3}
              placeholder="e.g. Lab 3 deadline extended by 2 hours. Review AVL invariant slides before quiz."
              value={broadcastText}
              onChange={(e) => setBroadcastText(e.target.value)}
              required
            />
          </div>

          {broadcastSent && (
            <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500 text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Broadcast dispatched instantly to all devices!</span>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setIsBroadcastModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="teal" leftIcon={<Send className="w-3.5 h-3.5" />}>
              Send Instant Push
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
