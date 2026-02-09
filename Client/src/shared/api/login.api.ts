import apiClient from './apiClient';
import API_ENDPOINTS from './endpoints';
import type {
  ApiResponse,
  CommonErrorInterface,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from './types';
import { extractData, handleApiError } from './apiUtils';

export const login = async (
  credentials: LoginRequest,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};

export const register = async (
  credentials: RegisterRequest,
): Promise<RegisterResponse> => {
  try {
    const response = await apiClient.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      credentials,
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};
