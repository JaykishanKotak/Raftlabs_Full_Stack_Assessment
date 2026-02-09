import { Request, Response, NextFunction } from 'express';
import { RestaurantService } from '../services/restaurant.service';
import { ApiResponse } from '../utils/ApiResponse';

export const getRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await RestaurantService.getRestaurants(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Restaurants retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export const getRestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const restaurant = await RestaurantService.getRestaurantById(req.params.id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, restaurant, 'Restaurant retrieved successfully'),
      );
  } catch (error) {
    next(error);
  }
};

export const getPopularRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const result = await RestaurantService.getPopularRestaurants(limit);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Popular restaurants retrieved successfully',
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getTopRated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const result = await RestaurantService.getTopRated(limit);
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Top rated restaurants retrieved successfully',
        ),
      );
  } catch (error) {
    next(error);
  }
};

export const getRestaurantDishes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const { DishService } = await import('../services/dish.service');
    const result = await DishService.getDishes({
      ...req.query,
      restaurant: id,
    });
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          result,
          'Restaurant dishes retrieved successfully',
        ),
      );
  } catch (error) {
    next(error);
  }
};
