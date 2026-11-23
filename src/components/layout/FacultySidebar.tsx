import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  Layers, 
  UploadCloud, 
  HelpCircle, 
  ClipboardCheck, 
  BarChart3,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const FacultySidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const navItems = [
    { label: 'Live Lecture Hub', to: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Dual Mobile Flow', to: '/fluid', icon: Smartphone, badge: 'Graphic' },
    { label: 'Course Catalog', to: '/faculty/courses', icon: BookOpen },
    { label: 'Bloom Outcomes (CLO)', to: '/faculty/outcomes', icon: Layers },
    { label: 'Units & Slide Uploads', to: '/faculty/materials', icon: UploadCloud },
    { label: 'AI Question Generator', to: '/faculty/questions', icon: HelpCircle, badge: 'Gemini' },
    { label: 'Assessments & Quizzes', to: '/faculty/assessments', icon: ClipboardCheck },
    { label: 'Class Cognitive Heatmap', to: '/faculty/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-[#0A0F1D]/80 border-r border-white/[0.08] flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none backdrop-blur-xl">
      <div className="p-4 border-b border-white/[0.06]">
        <div className="bg-white/[0.03] rounded-2xl p-3 border border-white/[0.08]">
          <div className="flex items-center gap-2 text-teal-300 font-bold text-xs mb-1">
            <Sparkles className="w-3.5 h-3.5 text-teal-400" />
            <span>Faculty Workspace</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Dr. Elena • Bloom's Taxonomy & Instant Class Lecture Control
          </p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group',
                  isActive
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-300 border border-teal-500/40 shadow-glow-teal'
                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-teal-400' : 'text-slate-500 group-hover:text-slate-300')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider',
                        isActive
                          ? 'bg-teal-500 text-slate-950'
                          : 'bg-white/10 text-teal-300 border border-teal-500/30'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/[0.06] text-[10px] text-slate-500 text-center">
        EduAnalyzer v1.0 • Fluid Spaces
      </div>
    </aside>
  );
};
