import React, { useState } from 'react';
import { StudentPhoneView } from '../components/fluid/StudentPhoneView';
import { FacultyPhoneView } from '../components/fluid/FacultyPhoneView';
import { 
  Sparkles, 
  Monitor
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useRolePreview } from '../context/RolePreviewContext';

export const FluidShowcasePage: React.FC = () => {
  const navigate = useNavigate();
  const { setRole } = useRolePreview();
  const [activeDeviceView, setActiveDeviceView] = useState<'both' | 'student' | 'faculty'>('both');

  const handleLaunchFullFaculty = () => {
    setRole('faculty');
    navigate('/faculty/dashboard');
  };

  const handleLaunchFullStudent = () => {
    setRole('student');
    navigate('/student/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col justify-between py-6 px-4 sm:px-8">
      {/* Top Header Controls */}
      <header className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-xs font-bold shadow-glow-teal mb-2">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            Dynamic Flow & Fluid Spaces
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            EduAnalyzer • AI & Bloom's Taxonomy Platform
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time interactive mobile & desktop ecosystem connecting faculty and students.
          </p>
        </div>

        {/* View Switchers & Navigation */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Device selector */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveDeviceView('both')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeDeviceView === 'both' ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'text-slate-400 hover:text-white'}`}
            >
              Dual Flow
            </button>
            <button
              onClick={() => setActiveDeviceView('student')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeDeviceView === 'student' ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'text-slate-400 hover:text-white'}`}
            >
              Alex (Student)
            </button>
            <button
              onClick={() => setActiveDeviceView('faculty')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeDeviceView === 'faculty' ? 'bg-teal-500 text-slate-950 shadow-glow-teal' : 'text-slate-400 hover:text-white'}`}
            >
              Dr. Elena (Faculty)
            </button>
          </div>

          <Button 
            variant="outline" 
            size="sm"
            leftIcon={<Monitor className="w-4 h-4 text-cyan-400" />}
            onClick={handleLaunchFullStudent}
          >
            Student Canvas
          </Button>

          <Button 
            variant="teal" 
            size="sm"
            leftIcon={<Monitor className="w-4 h-4 text-slate-950" />}
            onClick={handleLaunchFullFaculty}
          >
            Faculty Canvas
          </Button>
        </div>
      </header>

      {/* Center Hero Showcasing the Two Phone Devices Matching the Graphic! */}
      <main className="max-w-7xl mx-auto w-full py-8 flex flex-col items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-14 w-full">
          {/* Left Device: Student View */}
          {(activeDeviceView === 'both' || activeDeviceView === 'student') && (
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-teal-300">
                <span>Student Perspective: Alex</span>
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
              </div>
              <StudentPhoneView />
              <p className="text-[11px] text-slate-500 max-w-xs text-center">
                Interactive: Click "NFC Tap" to check-in, click "Quiz Deadline" to attempt live Bloom-mapped quiz.
              </p>
            </div>
          )}

          {/* Right Device: Faculty View */}
          {(activeDeviceView === 'both' || activeDeviceView === 'faculty') && (
            <div className="flex flex-col items-center space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                <span>Faculty Perspective: Dr. Elena</span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <FacultyPhoneView />
              <p className="text-[11px] text-slate-500 max-w-xs text-center">
                Interactive: Toggle Class Mode, vote on Instant Poll, answer raised hands ✋, tap office hours matrix.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Footer Callout */}
      <footer className="max-w-7xl mx-auto w-full pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Real-time deterministic grading & Bloom's Taxonomy cognitive engine active</span>
        </div>
        <div>
          EduAnalyzer Platform • Powered by React, Tailwind CSS, Supabase & Gemini AI
        </div>
      </footer>
    </div>
  );
};
