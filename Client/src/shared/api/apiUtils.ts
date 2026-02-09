import type { AxiosResponse } from 'axios';
import type { ApiResponse, ApiError, CommonErrorInterface } from './types';
import toast from 'react-hot-toast';

export function extractData<T>(response: AxiosResponse<ApiResponse<T>>): T {
  if (response.data && 'data' in response.data) {
    return response.data.data as T;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.data as any as T;
}

export function isApiError(error: CommonErrorInterface): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  );
}

export function getErrorMessage(error: CommonErrorInterface): string {
  if (isApiError(error)) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}

export function getValidationErrors(
  error: CommonErrorInterface,
): Record<string, string[]> | null {
  if (
    isApiError(error) &&
    typeof error.errors === 'object' &&
    error.errors !== null
  ) {
    const isValid = Object.values(error.errors).every(
      (v) => Array.isArray(v) && v.every((str) => typeof str === 'string'),
    );
    if (isValid) {
      return error.errors as Record<string, string[]>;
    }
  }
  return null;
}

export const handleApiError = (error: CommonErrorInterface): never => {
  console.log('error', error, isApiError(error), getErrorMessage(error));
  toast.error(error?.message || 'Something went Wrong !');
  // throw new Error(error?.message)
  throw new Error(isApiError(error) ? error.message : getErrorMessage(error));
};
