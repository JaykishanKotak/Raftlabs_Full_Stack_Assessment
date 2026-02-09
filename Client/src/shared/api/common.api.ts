import apiClient from './apiClient';
import API_ENDPOINTS from './endpoints';
import type { ApiResponse, CommonErrorInterface } from './types';
import { extractData, handleApiError } from './apiUtils';

export const getCityList = async () => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      API_ENDPOINTS.COMMON.CITY_LIST,
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};
