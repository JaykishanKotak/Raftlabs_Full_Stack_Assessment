import { useEffect, useState } from 'react';
import { getOrderDetails } from '@/shared/api/order.api';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import toast from 'react-hot-toast';
import type { Order } from '@/shared/types';

interface Params {
  orderId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const useOrderDetails = ({ orderId, isOpen, onClose }: Params) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!isOpen || !orderId) return;
    fetchOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, orderId]);

  const fetchOrderDetails = async () => {
    startScreenLoader();
    try {
      const res = await getOrderDetails(orderId);
      setOrder(res);
    } catch (error) {
      console.error('Error fetching order details:', error);
      toast.error('Failed to load order details');
      setTimeout(() => onClose(), 5000);
    } finally {
      stopScreenLoader();
    }
  };

  return { order };
};
