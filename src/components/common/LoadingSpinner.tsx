import React from 'react';
import { cn } from '../../lib/utils';

export interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className,
  label = 'Loading...',
}) => {
  const sizes = {
    sm: 'w-3.5 h-3.5 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3',
    xl: 'w-12 h-12 border-4',
  };

  return (
    <div className="inline-flex items-center gap-2" role="status">
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-current border-t-transparent',
          sizes[size],
          className || 'text-brand-600'
        )}
      />
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};
