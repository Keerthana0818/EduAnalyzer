import React from 'react';
import { cn } from '../../lib/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, placeholder, className, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold text-slate-300 mb-1.5">
            {label}
            {props.required && <span className="text-rose-400 ml-0.5">*</span>}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={cn(
            'block w-full rounded-xl border border-white/10 bg-[#0C1220] px-3.5 py-2.5 text-sm text-slate-100 focus:border-teal-400 focus:outline-none focus:ring-1 focus:ring-teal-400 disabled:bg-white/5 disabled:text-slate-500 transition-colors',
            error && 'border-rose-400 text-rose-300 focus:border-rose-400 focus:ring-rose-400',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="bg-[#0C1220] text-slate-500">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled} className="bg-[#0C1220] text-slate-100">
              {opt.label}
            </option>
          ))}
        </select>
        {error ? (
          <p className="mt-1 text-xs text-rose-400">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
