import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import { useEffect, useState, useCallback, useRef } from 'react';
import type { Restaurant } from '@/shared/types';
import { getRestaurants } from '@/shared/api/restaurant.api';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

export const useDashboard = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  const { selectedCity } = useSelector((state: any) => state.common);

  const [filters, setFilters] = useState<{
    search: string;
    foodTypes: string[];
    page: number;
    limit: number;
  }>({
    search: '',
    foodTypes: [],
    page: 1,
    limit: 5,
  });

  const fetchRestaurants = useCallback(
    async (filtersPayload = filters) => {
      startScreenLoader();
      try {
        const payload: any = {
          city: selectedCity,
          ...filtersPayload,
        };

        const { restaurants, pagination }: any = await getRestaurants(payload);
        setRestaurants(restaurants);
        if (pagination) {
          setPagination(pagination);
        }
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        stopScreenLoader();
      }
    },
    [selectedCity, filters],
  );

  const debouncedFetchRef = useRef(
    debounce((nextFilters) => {
      fetchRestaurants(nextFilters);
    }, 500),
  );

  useEffect(() => {
    return () => {
      debouncedFetchRef.current.cancel();
    };
  }, []);

  useEffect(() => {
    fetchRestaurants();
  }, [selectedCity, filters.page, filters.foodTypes, filters.limit]);

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const handleToggleFoodType = (type: string) => {
    setFilters((prev) => {
      const newTypes = prev.foodTypes.includes(type)
        ? prev.foodTypes.filter((t) => t !== type)
        : [...prev.foodTypes, type];

      return { ...prev, foodTypes: newTypes, page: 1 };
    });
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => {
      const nextFilters = { ...prev, search, page: 1 };
      debouncedFetchRef.current(nextFilters);
      return nextFilters;
    });
  };

  return {
    restaurants,
    pagination,
    filters,
    setFilters,
    handlePageChange,
    handleToggleFoodType,
    handleSearchChange,
  };
};
