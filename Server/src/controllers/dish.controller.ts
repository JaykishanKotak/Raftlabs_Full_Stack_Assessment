import { Request, Response, NextFunction } from 'express';
import { DishService } from '../services/dish.service';
import { ApiResponse } from '../utils/ApiResponse';

export const getDishes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await DishService.getDishes(req.query);
    return res
      .status(200)
      .json(new ApiResponse(200, result, 'Dishes retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export const getDishById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await DishService.getDishById(req.params.id);
    return res
      .status(200)
      .json(
        new ApiResponse(200, result, 'Dish details retrieved successfully'),
      );
  } catch (error) {
    next(error);
  }
};

export const getBestSellers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const limit = Number(req.query.limit) || 5;
    const result = await DishService.getBestSellers(limit);
    return res
      .status(200)
      .json(
        new ApiResponse(200, result, 'Best sellers retrieved successfully'),
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
    const result = await DishService.getTopRated(limit);
    return res
      .status(200)
      .json(
        new ApiResponse(200, result, 'Top rated dishes retrieved successfully'),
      );
  } catch (error) {
    next(error);
  }
};
