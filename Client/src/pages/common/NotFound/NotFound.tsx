import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-soft">
        <div className="text-3xl font-semibold tracking-tight text-slate-900">
          404
        </div>
        <p className="mt-2 text-sm text-slate-600">That page doesn’t exist.</p>
        <Link to="/" className="mt-5 inline-block">
          <Button>Go home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
