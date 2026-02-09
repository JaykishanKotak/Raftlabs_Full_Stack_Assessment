import { useEffect, useState } from 'react';
import { getMyOrders } from '@/shared/api/order.api';
import type { Order } from '@/shared/types';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';

export const STATUS = [
  { id: 'ORDER_RECEIVED', label: 'Received' },
  { id: 'PREPARING', label: 'Preparing' },
  { id: 'OUT_FOR_DELIVERY', label: 'On The Way' },
  { id: 'DELIVERED', label: 'Delivered' },
  { id: 'CANCELLED', label: 'Cancelled' },
];

export const useOrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const [filters, setFilters] = useState({
    search: '',
    status: [] as string[],
    page: 1,
    limit: 5,
  });

  const fetchOrders = async () => {
    startScreenLoader();
    try {
      const { orders, pagination }: any = await getMyOrders(filters);
      setOrders(orders);
      if (pagination) setPagination(pagination);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      stopScreenLoader();
    }
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleChangeStatus = (status: string) => {
    setFilters((prev) => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status],
      page: 1,
    }));
  };
  useEffect(() => {
    fetchOrders();
  }, [filters]);

  useEffect(() => {
    const handleSocketMessage = (event: any) => {
      const { detail: message } = event;

      if (message.type === 'ORDER_STATUS_UPDATE') {
        setOrders((prev) =>
          prev.map((order) =>
            order._id === message.orderId
              ? { ...order, status: message.status }
              : order,
          ),
        );
      }
    };

    window.addEventListener('socket-message', handleSocketMessage);
    return () => {
      window.removeEventListener('socket-message', handleSocketMessage);
    };
  }, []);

  return {
    orders,
    filters,
    pagination,
    statusList: STATUS,
    handlePageChange,
    handleChangeStatus,
  };
};
