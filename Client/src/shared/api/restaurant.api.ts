import apiClient from './apiClient';
import API_ENDPOINTS from './endpoints';
import type { ApiResponse, CommonErrorInterface } from './types';
import { extractData, handleApiError } from './apiUtils';
import type { Restaurant, Dish } from '../types';

export const getRestaurants = async (payload: any): Promise<Restaurant[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Restaurant[]>>(
      API_ENDPOINTS.RESTAURANTS.LIST,
      { params: payload },
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};

export const getRestaurantById = async (id: string): Promise<Restaurant> => {
  try {
    const response = await apiClient.get<ApiResponse<Restaurant>>(
      API_ENDPOINTS.RESTAURANTS.BY_ID(id),
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};

export const getRestaurantDishes = async (
  id: string,
  payload?: any,
): Promise<Dish[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Dish[]>>(
      API_ENDPOINTS.RESTAURANTS.DISHES(id),
      { params: payload },
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};
