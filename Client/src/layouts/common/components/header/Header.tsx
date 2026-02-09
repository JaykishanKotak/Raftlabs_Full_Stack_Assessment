import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHeader } from './useHeader';
import CitySelector from '../city-selector/CitySelector';

const Header = () => {
  const { onClickLogout, onClickProfile } = useHeader();
  const cartItems = useSelector((state: any) => state.cart.items) || [];
  const cartCount = cartItems.reduce(
    (acc: number, item: any) => acc + item.quantity,
    0,
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
        <Link
          to="/"
          className="font-semibold tracking-tight text-slate-900 border-2 border-brand-500 px-2 py-0.5 rounded-lg mr-4"
        >
          FOA
        </Link>

        <CitySelector />

        <div className="flex-1" />

        <div className="flex items-center gap-4">
          <Link
            to="/cart"
            className="relative p-2 text-slate-600 hover:text-brand-600 transition-colors"
          >
            <span className="text-2xl">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={onClickProfile}>
              Profile
            </Button>
            <Button variant="primary" onClick={onClickLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
