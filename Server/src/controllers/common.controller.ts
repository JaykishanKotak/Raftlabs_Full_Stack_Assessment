import Restaurant from '../models/restaurant.model';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/ApiResponse';

export const getDistinctList =
  (field: 'city' | 'state') =>
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await Restaurant.distinct(field);

      return res
        .status(200)
        .json(new ApiResponse(200, data, `${field}s retrieved successfully`));
    } catch (error) {
      next(error);
    }
  };
