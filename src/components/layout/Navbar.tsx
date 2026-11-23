import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  Menu, 
  Bell, 
  User, 
  ArrowLeftRight
} from 'lucide-react';
import { useRolePreview } from '../../context/RolePreviewContext';
import { Badge } from '../common/Badge';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar }) => {
  const { currentRole, toggleRole } = useRolePreview();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-lg flex items-center gap-1.5">
                EduAnalyzer
                <span className="text-[10px] uppercase font-extrabold tracking-wider px-1.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                  AI + Bloom
                </span>
              </span>
            </div>
          </Link>
        </div>

        {/* Right Actions: Role Toggle, Notifications & User */}
        <div className="flex items-center gap-3">
          {/* Dev/Preview Role Switcher */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 font-medium px-2 hidden sm:inline">
              Role:
            </span>
            <button
              onClick={toggleRole}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg bg-white shadow-sm border border-slate-200 text-slate-800 hover:bg-slate-50 transition-all"
              title="Click to toggle between Faculty and Student views"
            >
              <Badge variant={currentRole === 'faculty' ? 'brand' : 'success'} size="sm">
                {currentRole.toUpperCase()}
              </Badge>
              <ArrowLeftRight className="w-3 h-3 text-slate-400" />
              <span className="text-slate-500 hidden md:inline">Switch</span>
            </button>
          </div>

          {/* Notifications button */}
          <button
            className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* User profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center ring-2 ring-brand-200">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-none">
                {currentRole === 'faculty' ? 'Prof. Sarah Jenkins' : 'Alex Johnson'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5 capitalize">
                {currentRole === 'faculty' ? 'Faculty Member' : 'Enrolled Student'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
