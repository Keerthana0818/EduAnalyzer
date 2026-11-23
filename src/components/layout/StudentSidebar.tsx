import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Compass, 
  GraduationCap, 
  FileCheck2, 
  Activity, 
  Sparkles,
  Bot
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const StudentSidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const navItems = [
    { label: 'My Dashboard', to: '/student/dashboard', icon: LayoutDashboard },
    { label: 'Browse Courses', to: '/student/catalog', icon: Compass },
    { label: 'My Enrolled Courses', to: '/student/courses', icon: GraduationCap },
    { label: 'My Assessments', to: '/student/assessments', icon: FileCheck2 },
    { label: 'Cognitive Analytics', to: '/student/analytics', icon: Activity },
    { label: 'AI Study Assistant', to: '/student/assistant', icon: Bot, badge: 'AI' },
    { label: 'Recommendations', to: '/student/recommendations', icon: Sparkles },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="p-4 border-b border-slate-100">
        <div className="bg-emerald-50/70 rounded-xl p-3 border border-emerald-100">
          <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs mb-1">
            <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />
            <span>Student Portal</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Learn with Bloom-guided assessments and receive targeted cognitive improvement plans.
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
                    ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-500/20'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 text-emerald-800'
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

      <div className="p-4 border-t border-slate-100 text-[11px] text-slate-400 text-center">
        EduAnalyzer v1.0 • Student Portal
      </div>
    </aside>
  );
};
