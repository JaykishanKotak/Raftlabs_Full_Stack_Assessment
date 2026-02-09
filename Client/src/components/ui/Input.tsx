import { forwardRef, useState } from 'react';
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/shared/utils/cn';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isError?: boolean;
  errorMessage?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = 'text', label, isError, errorMessage, ...rest },
  ref,
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          ref={ref}
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          className={cn(
            'h-10 w-full rounded-md border px-3 pr-10 text-sm outline-none focus:ring-4',
            isError
              ? 'border-red-500 focus:border-red-500 focus:ring-red-100'
              : 'border-slate-300 focus:border-brand-500 focus:ring-brand-100',
            className,
          )}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        )}
      </div>
      {errorMessage && (
        <span className="mt-1 text-sm text-red-500">{errorMessage}</span>
      )}
    </div>
  );
});
