import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth';
import { OrderService } from '../services/order.service';
import { ApiResponse } from '../utils/ApiResponse';
import { ApiError } from '../utils/ApiError';

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }

    const { restaurant, items } = req.body;
    const order = await OrderService.createOrder(String(req.user._id), {
      restaurant,
      items,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, order, 'Order placed successfully'));
  } catch (error) {
    next(error);
  }
};

export const getMyOrders = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }
    const orders = await OrderService.getMyOrders(
      String(req.user._id),
      req.query,
    );
    return res
      .status(200)
      .json(new ApiResponse(200, orders, 'Orders retrieved successfully'));
  } catch (error) {
    next(error);
  }
};

export const getOrderDetails = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'User not authenticated');
    }
    const order = await OrderService.getOrderById(
      req.params.id,
      String(req.user._id),
    );
    return res
      .status(200)
      .json(new ApiResponse(200, order, 'Order retrieved successfully'));
  } catch (error) {
    next(error);
  }
};
