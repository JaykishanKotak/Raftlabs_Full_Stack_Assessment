import type { RouteObject } from 'react-router-dom';
import { CommonLayout } from '@/layouts/common/CommonLayout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import ProfileLayout from '@/layouts/ProfileLayout';

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <CommonLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        async lazy() {
          const { default: RestaurantList } =
            await import('@/pages/user/dashboard/Dashboard');
          return { Component: RestaurantList };
        },
      },
      {
        path: 'restaurants/:id',
        async lazy() {
          const { default: RestaurantDetails } =
            await import('@/pages/user/restaurant/RestaurantDetails');
          return { Component: RestaurantDetails };
        },
      },
      {
        path: 'restaurants/:restaurantId/dishes/:dishId',
        async lazy() {
          const { default: DishDetails } =
            await import('@/pages/user/dish/DishDetails');
          return { Component: DishDetails };
        },
      },
      {
        path: 'cart',
        async lazy() {
          const { default: Cart } = await import('@/pages/user/cart/Cart');
          return { Component: Cart };
        },
      },
      {
        path: 'profile',
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            async lazy() {
              const { default: Profile } =
                await import('@/pages/user/profile/Profile');
              return { Component: Profile };
            },
          },
          {
            path: 'orders',
            async lazy() {
              const { default: OrderHistory } =
                await import('@/pages/user/profile/OrderHistory');
              return { Component: OrderHistory };
            },
          },
        ],
      },
    ],
  },
];
