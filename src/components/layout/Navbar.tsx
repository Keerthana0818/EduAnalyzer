import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  Bell, 
  ArrowLeftRight,
  Smartphone
} from 'lucide-react';
import { useRolePreview } from '../../context/RolePreviewContext';
import { Badge } from '../common/Badge';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { currentRole, toggleRole } = useRolePreview();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-[#070B14]/90 backdrop-blur-xl border-b border-white/[0.08]">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-cyan-500 flex items-center justify-center text-slate-950 font-bold shadow-glow-teal group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-white tracking-tight text-lg flex items-center gap-1.5">
                EduAnalyzer
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  AI + Bloom
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Dual Phone View button */}
          <button
            onClick={() => navigate('/fluid')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white/[0.05] border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,240,255,0.15)] transition-all"
            title="View exact Dual Device mockup shown in graphic"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dual Flow View</span>
          </button>

          {/* Dev/Preview Role Switcher */}
          <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <span className="text-xs text-slate-400 font-medium px-2 hidden sm:inline">
              Role:
            </span>
            <button
              onClick={toggleRole}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold rounded-lg bg-white/10 text-white hover:bg-white/15 transition-all"
              title="Click to toggle between Faculty and Student views"
            >
              <Badge variant={currentRole === 'faculty' ? 'coral' : 'teal'} size="sm">
                {currentRole === 'faculty' ? 'DR. ELENA (FACULTY)' : 'ALEX (STUDENT)'}
              </Badge>
              <ArrowLeftRight className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Notifications button */}
          <button
            className="relative p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-[#070B14]" />
          </button>

          {/* User profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-white/10">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-400 to-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center shadow-glow-teal">
              {currentRole === 'faculty' ? '👩‍🏫' : '🧑‍💻'}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-white leading-none">
                {currentRole === 'faculty' ? 'Dr. Elena' : 'Alex Johnson'}
              </p>
              <p className="text-[10px] text-teal-400 mt-0.5 capitalize">
                {currentRole === 'faculty' ? 'Professor of CS' : 'Undergrad Student'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
