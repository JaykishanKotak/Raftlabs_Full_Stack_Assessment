import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getDishById } from '@/shared/api/dish.api';
import { addToCart } from '@/features/cart/cartSlice';
import type { Dish } from '@/shared/types';
import toast from 'react-hot-toast';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';

export const useDishDetails = () => {
  const { dishId, restaurantId } = useParams<{
    dishId: string;
    restaurantId: string;
  }>();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [dish, setDish] = useState<Dish | null>(null);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const fetchDish = async () => {
    if (!dishId) return;

    startScreenLoader();
    try {
      const { dish }: any = await getDishById(dishId);
      setDish(dish);
    } catch (error) {
      console.error('Failed to fetch dish details:', error);
    } finally {
      stopScreenLoader();
    }
  };

  useEffect(() => {
    fetchDish();
  }, [dishId]);

  const handleAddToCart = () => {
    if (!dish) return;

    setAdding(true);
    dispatch(addToCart({ dish, quantity, restaurantId }));

    setTimeout(() => {
      setAdding(false);
      toast.success('Added to cart!');
    }, 500);
  };

  return {
    dish,
    adding,
    quantity,
    setQuantity,
    handleAddToCart,
    navigate,
  };
};
