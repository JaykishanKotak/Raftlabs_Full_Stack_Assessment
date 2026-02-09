const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
  },
  USER: {
    MY_PROFILE: '/users/me',
  },
  RESTAURANTS: {
    LIST: '/restaurants',
    POPULAR: '/restaurants/popular',
    TOP_RATED: '/restaurants/top-rated',
    BY_ID: (id: string) => `/restaurants/${id}`,
    DISHES: (id: string) => `/restaurants/${id}/dishes`,
  },
  DISHES: {
    LIST: '/dishes',
    BEST_SELLERS: '/dishes/best-sellers',
    TOP_RATED: '/dishes/top-rated',
    BY_ID: (id: string) => `/dishes/${id}`,
  },
  ORDERS: {
    CREATE: '/orders',
    MY_ORDERS: '/orders/my-orders',
    BY_ID: (id: string) => `/orders/${id}`,
  },
  COMMON: {
    CITY_LIST: '/common/cities',
    STATE_LIST: '/common/states',
  },
};

export default API_ENDPOINTS;
