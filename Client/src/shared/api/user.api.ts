import apiClient from './apiClient';
import API_ENDPOINTS from './endpoints';
import type { ApiResponse, CommonErrorInterface, User } from './types';
import { extractData, handleApiError } from './apiUtils';

type MyProfile = {
  user: User;
};

export const getMyProfile = async () => {
  try {
    const response = await apiClient.get<ApiResponse<MyProfile>>(
      API_ENDPOINTS.USER.MY_PROFILE,
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};
