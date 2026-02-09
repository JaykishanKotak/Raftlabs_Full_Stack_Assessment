import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { ReviewService } from '../services/review.service';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

export const submitReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const review = await ReviewService.submitReview(
      String(req.user._id),
      req.body,
    );
    return res
      .status(201)
      .json(new ApiResponse(201, review, 'Review submitted successfully'));
  } catch (error) {
    next(error);
  }
};

export const getDishReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reviews = await ReviewService.getDishReviews(req.params.dishId);
    return res
      .status(200)
      .json(new ApiResponse(200, reviews, 'Reviews retrieved successfully'));
  } catch (error) {
    next(error);
  }
};
