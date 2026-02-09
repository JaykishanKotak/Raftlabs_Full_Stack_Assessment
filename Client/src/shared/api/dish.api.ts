import apiClient from './apiClient';
import API_ENDPOINTS from './endpoints';
import type { ApiResponse, CommonErrorInterface } from './types';
import { extractData, handleApiError } from './apiUtils';
import type { Dish } from '../types';

export const getDishById = async (id: string): Promise<Dish> => {
  try {
    const response = await apiClient.get<ApiResponse<Dish>>(
      API_ENDPOINTS.DISHES.BY_ID(id),
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};
