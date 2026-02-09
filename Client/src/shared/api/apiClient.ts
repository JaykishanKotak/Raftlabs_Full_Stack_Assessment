/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import type { AxiosError, AxiosInstance } from 'axios';
import type { Store } from '@reduxjs/toolkit';

import { API_CONFIG } from './config';
import type { ApiError } from './types';

let store: Store<any> | null = null;

export const setApiStore = (s: Store<any>) => {
  store = s;
};

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
});

const getToken = (): string | null => {
  if (store) {
    return store.getState().auth.token;
  }

  try {
    const persisted = localStorage.getItem('persist:root');
    if (!persisted) return null;
    return JSON.parse(JSON.parse(persisted).auth)?.token ?? null;
  } catch {
    return null;
  }
};

const toApiError = (error: AxiosError): ApiError => {
  const status = error.response?.status ?? 0;
  const data = error.response?.data as any;

  return {
    status,
    message:
      data?.message ??
      (status === 0
        ? 'Network error. Please check your connection.'
        : 'Something went wrong.'),
    errors: data?.error ?? data?.errors,
  };
};

apiClient.interceptors.request.use((config: any) => {
  const token = getToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (config.method === 'get') {
    config.params = { ...config.params, _t: Date.now() };
  }

  return config;
});

// Response
apiClient.interceptors.response.use(
  (response: any) => {
    return response.data;
  },
  (error: AxiosError) => {
    return Promise.reject(toApiError(error));
  },
);

export default apiClient;
