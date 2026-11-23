import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FacultySidebar } from './FacultySidebar';
import { StudentSidebar } from './StudentSidebar';
import { useRolePreview } from '../../context/RolePreviewContext';
import { X } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { currentRole } = useRolePreview();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar onToggleSidebar={() => setMobileMenuOpen((prev) => !prev)} />

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          {currentRole === 'faculty' ? <FacultySidebar /> : <StudentSidebar />}
        </div>

        {/* Mobile Drawer Backdrop & Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl flex flex-col z-10">
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <span className="font-bold text-slate-800 text-sm">Navigation Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                {currentRole === 'faculty' ? (
                  <FacultySidebar onCloseMobile={() => setMobileMenuOpen(false)} />
                ) : (
                  <StudentSidebar onCloseMobile={() => setMobileMenuOpen(false)} />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
