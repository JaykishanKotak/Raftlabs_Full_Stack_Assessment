import apiClient from './apiClient';
import API_ENDPOINTS from './endpoints';
import type { ApiResponse, CommonErrorInterface } from './types';
import { extractData, handleApiError } from './apiUtils';
import type { Order } from '../types';

export const createOrder = async (orderData: {
  restaurant: string;
  items: {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  customer?: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
  };
}): Promise<Order> => {
  try {
    const response = await apiClient.post<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.CREATE,
      orderData,
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};

export const getMyOrders = async (payload: any): Promise<any> => {
  try {
    const response = await apiClient.get<ApiResponse<any>>(
      API_ENDPOINTS.ORDERS.MY_ORDERS,
      { params: payload },
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};

export const getOrderDetails = async (id: string): Promise<Order> => {
  try {
    const response = await apiClient.get<ApiResponse<Order>>(
      API_ENDPOINTS.ORDERS.BY_ID(id),
    );
    return extractData(response);
  } catch (error: unknown) {
    return handleApiError(error as CommonErrorInterface);
  }
};
