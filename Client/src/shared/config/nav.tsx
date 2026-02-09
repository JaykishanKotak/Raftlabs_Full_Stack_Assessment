import type { NavItem } from '@/shared/types/nav';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Restaurants', to: '/' },
  { label: 'My Orders', to: '/profile' },
];

export const PROFILE_NAV_ITEMS: NavItem[] = [
  { label: 'My Profile', to: '/profile', icon: '👤' },
  { label: 'Order History', to: '/profile/orders', icon: '🛍️' },
];
