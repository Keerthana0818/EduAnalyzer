import React from 'react';
import { cn } from '../../lib/utils';
import { LoadingSpinner } from './LoadingSpinner';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'teal' | 'coral';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-150 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#070B14] disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]';

  const variants = {
    primary: 'bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-slate-950 font-bold shadow-glow-teal focus:ring-teal-400',
    teal: 'bg-[#00E5BE] hover:bg-[#1ff0cb] text-slate-950 font-bold shadow-glow-teal focus:ring-teal-400',
    coral: 'bg-[#FF647C] hover:bg-[#ff7b90] text-white font-bold shadow-glow-coral focus:ring-rose-500',
    secondary: 'bg-white/10 hover:bg-white/15 text-white border border-white/10 backdrop-blur-md focus:ring-slate-400',
    outline: 'border border-white/20 hover:border-white/40 text-slate-200 hover:bg-white/5 bg-transparent backdrop-blur-sm focus:ring-teal-400',
    ghost: 'hover:bg-white/10 text-slate-300 hover:text-white focus:ring-slate-400',
    danger: 'bg-rose-600/90 hover:bg-rose-600 text-white shadow-glow-coral focus:ring-rose-500',
    success: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md focus:ring-emerald-400',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-4 py-2 gap-2 rounded-xl',
    lg: 'text-base px-6 py-2.5 gap-2.5 rounded-2xl',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner size="sm" className="text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
