import { Outlet, NavLink } from 'react-router-dom';
import { PROFILE_NAV_ITEMS } from '@/shared/config/nav';

export const ProfileLayout = () => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
      <aside className="space-y-1">
        <h2 className="px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Account Settings
        </h2>
        <nav className="mt-4 flex flex-col gap-1">
          {PROFILE_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/profile'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all',
                  isActive
                    ? 'bg-brand-600 text-white shadow-brand-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-soft',
                ].join(' ')
              }
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileLayout;
