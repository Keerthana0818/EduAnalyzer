import React from 'react';
import { cn } from '../../lib/utils';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'brand' | 'teal' | 'coral' | 'outline' | BloomLevel;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  const isBloom = variant in BLOOM_LEVELS;

  const baseStyles = 'inline-flex items-center font-semibold rounded-full border transition-all select-none';

  const sizes = {
    sm: 'text-[10px] px-2.5 py-0.5 tracking-wider',
    md: 'text-xs px-3 py-1',
  };

  const standardVariants: Record<string, string> = {
    default: 'bg-white/10 text-slate-300 border-white/10',
    brand: 'bg-indigo-950/80 text-indigo-300 border-indigo-700/60',
    teal: 'bg-teal-950/80 text-teal-300 border-teal-500/40 shadow-[0_0_10px_rgba(0,229,190,0.2)]',
    coral: 'bg-rose-950/80 text-rose-300 border-rose-500/40 shadow-[0_0_10px_rgba(255,100,124,0.2)]',
    success: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50',
    warning: 'bg-amber-950/80 text-amber-300 border-amber-600/50',
    danger: 'bg-rose-950/80 text-rose-300 border-rose-600/50',
    outline: 'bg-transparent text-slate-300 border-white/20',
  };

  const badgeClass = isBloom
    ? BLOOM_LEVELS[variant as BloomLevel].color.badge
    : standardVariants[variant] || standardVariants.default;

  return (
    <span className={cn(baseStyles, sizes[size], badgeClass, className)} {...props}>
      {children || (isBloom ? BLOOM_LEVELS[variant as BloomLevel].label : null)}
    </span>
  );
};
