import { ROUTE_CONST } from '@/utils/const';
import type { RouteObject } from 'react-router-dom';

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTE_CONST.LOGIN,
    async lazy() {
      const { default: Login } = await import('@/pages/auth/login/Login');
      return { Component: Login };
    },
  },
  {
    path: ROUTE_CONST.REGISTER,
    async lazy() {
      const { default: Register } =
        await import('@/pages/auth/register/Register');
      return { Component: Register };
    },
  },
];
