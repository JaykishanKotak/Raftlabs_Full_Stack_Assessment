import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '@/shared/config/nav';

type SideNavProps = {
  onNavigate?: () => void;
};

const Sidebar = ({ onNavigate }: SideNavProps) => {
  return (
    <nav className="flex flex-col gap-1 p-3">
      <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Navigation
      </div>

      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition',
              isActive
                ? 'bg-brand-50 text-brand-700'
                : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900',
            ].join(' ')
          }
        >
          {item.icon ? <span className="text-base">{item.icon}</span> : null}
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
