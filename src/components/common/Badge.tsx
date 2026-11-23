import React from 'react';
import { cn } from '../../lib/utils';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'brand' | 'outline' | BloomLevel;
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

  const baseStyles = 'inline-flex items-center font-medium rounded-full border transition-colors';

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };

  const standardVariants: Record<string, string> = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    outline: 'bg-transparent text-slate-600 border-slate-300',
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
