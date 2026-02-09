import { createBrowserRouter } from 'react-router-dom';
import { privateRoutes } from '@/routes/privateRoutes';
import { publicRoutes } from '@/routes/publicRoutes';
import { lazy } from 'react';
const NotFoundPage = lazy(() => import('@/pages/common/NotFound/NotFound'));

export const router = createBrowserRouter([
  ...publicRoutes,
  ...privateRoutes,
  {
    path: '*',
    async lazy() {
      return { Component: NotFoundPage };
    },
  },
]);
