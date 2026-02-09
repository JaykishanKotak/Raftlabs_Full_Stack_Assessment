import type { HTMLAttributes, JSX } from 'react';
import { cn } from '@/shared/utils/cn';

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  fullscreen?: boolean;
};

const Loader = ({
  className,
  fullscreen,
  ...rest
}: LoaderProps): JSX.Element => {
  const content = (
    <div
      className={cn('flex items-center justify-center gap-2', className)}
      {...rest}
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
      <span className="text-sm text-slate-600">Loading...</span>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
