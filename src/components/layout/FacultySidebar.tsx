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
  Sparkles
} from 'lucide-react';
import { cn } from '../../lib/utils';

export const FacultySidebar: React.FC<{ onCloseMobile?: () => void }> = ({ onCloseMobile }) => {
  const navItems = [
    { label: 'Dashboard', to: '/faculty/dashboard', icon: LayoutDashboard },
    { label: 'Courses', to: '/faculty/courses', icon: BookOpen },
    { label: 'Learning Outcomes', to: '/faculty/outcomes', icon: Layers },
    { label: 'Units & Materials', to: '/faculty/materials', icon: UploadCloud },
    { label: 'AI Question Bank', to: '/faculty/questions', icon: HelpCircle, badge: 'AI' },
    { label: 'Assessments', to: '/faculty/assessments', icon: ClipboardCheck },
    { label: 'Class Analytics', to: '/faculty/analytics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="p-4 border-b border-slate-100">
        <div className="bg-brand-50/60 rounded-xl p-3 border border-brand-100">
          <div className="flex items-center gap-2 text-brand-700 font-semibold text-xs mb-1">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Faculty Workspace</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Design Bloom-mapped outcomes, upload lecture materials & evaluate assessments.
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
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
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
                          : 'bg-brand-100 text-brand-700'
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
        EduAnalyzer v1.0 • Bloom's Taxonomy
      </div>
    </aside>
  );
};
