import React from 'react';
import { cn } from '../../lib/utils';
import { BLOOM_LEVELS } from '../../lib/bloomsTaxonomy';
import type { BloomLevel } from '../../lib/bloomsTaxonomy';

export interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'brand' | 'success' | 'warning' | 'danger' | 'teal' | 'coral' | BloomLevel;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = false,
  variant = 'teal',
  size = 'md',
  className,
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const isBloom = variant in BLOOM_LEVELS;

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const colors: Record<string, string> = {
    teal: 'bg-gradient-to-r from-teal-400 to-cyan-400 shadow-[0_0_10px_rgba(0,229,190,0.5)]',
    coral: 'bg-gradient-to-r from-rose-500 to-coral-400 shadow-[0_0_10px_rgba(255,100,124,0.5)]',
    brand: 'bg-gradient-to-r from-indigo-500 to-teal-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-500',
  };

  const fillColor = isBloom
    ? BLOOM_LEVELS[variant as BloomLevel].color.hex
    : undefined;

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="flex justify-between items-center text-xs mb-1.5">
          {label && <span className="font-semibold text-slate-300">{label}</span>}
          {showValue && <span className="font-bold text-teal-300">{percentage}%</span>}
        </div>
      )}
      <div className={cn('w-full bg-white/[0.08] rounded-full overflow-hidden p-0.5 border border-white/[0.05]', heights[size])}>
        <div
          className={cn('h-full transition-all duration-500 rounded-full', !isBloom && colors[variant])}
          style={{
            width: `${percentage}%`,
            backgroundColor: fillColor,
            boxShadow: fillColor ? `0 0 10px ${fillColor}` : undefined,
          }}
        />
      </div>
    </div>
  );
};
