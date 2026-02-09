import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import {
  getRestaurantById,
  getRestaurantDishes,
} from '@/shared/api/restaurant.api';
import type { Dish, Restaurant } from '@/shared/types';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useRestaurantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const fetchRestaurantData = useCallback(async () => {
    if (!id) return;
    startScreenLoader();
    try {
      const restaurantData = await getRestaurantById(id);
      setRestaurant(restaurantData);
    } catch (error) {
      console.error('Failed to fetch restaurant details:', error);
    } finally {
      stopScreenLoader();
    }
  }, [id]);

  const fetchDishes = useCallback(async () => {
    if (!id) return;
    startScreenLoader();
    try {
      const dishesData: any = await getRestaurantDishes(id, {
        page,
        limit: 5,
      });
      setDishes(dishesData.dishes);
      if (dishesData.pagination) setPagination(dishesData.pagination);
    } catch (error) {
      console.error('Failed to fetch dishes:', error);
    } finally {
      stopScreenLoader();
    }
  }, [id, page]);

  useEffect(() => {
    setPage(1);
    fetchRestaurantData();
  }, [id, fetchRestaurantData]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  return {
    restaurant,
    dishes,
    pagination,
    page,
    setPage,
    id,
  };
};
