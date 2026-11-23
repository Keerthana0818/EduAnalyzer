import React, { createContext, useContext, useState } from 'react';
import type { UserRole } from '../types/models';

interface RolePreviewContextType {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  toggleRole: () => void;
}

const RolePreviewContext = createContext<RolePreviewContextType | undefined>(undefined);

export const RolePreviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('faculty');

  const toggleRole = () => {
    setCurrentRole((prev) => (prev === 'faculty' ? 'student' : 'faculty'));
  };

  return (
    <RolePreviewContext.Provider value={{ currentRole, setRole: setCurrentRole, toggleRole }}>
      {children}
    </RolePreviewContext.Provider>
  );
};

export const useRolePreview = () => {
  const context = useContext(RolePreviewContext);
  if (!context) {
    throw new Error('useRolePreview must be used within a RolePreviewProvider');
  }
  return context;
};
