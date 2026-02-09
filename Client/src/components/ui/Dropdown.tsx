import { forwardRef } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';

export type DropdownProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  errorMessage?: string;
  isError?: boolean;
};

export const Dropdown = forwardRef<HTMLSelectElement, DropdownProps>(
  function Dropdown(
    { className, label, options, placeholder, isError, errorMessage, ...rest },
    ref,
  ) {
    return (
      <div className="flex flex-col w-full">
        {label && (
          <label className="mb-1 text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select
          ref={ref}
          className={cn(
            'w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition-colors',
            'hover:border-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500',
            isError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100',
            className,
          )}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {errorMessage && (
          <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
        )}
      </div>
    );
  },
);
