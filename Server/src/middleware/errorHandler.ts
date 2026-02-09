import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  let { message } = err;

  if (!(err instanceof ApiError)) {
    const status = err.statusCode || 500;
    message = err.message || 'Something went wrong';
    err = new ApiError(status, message, [], err.stack);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    err = new ApiError(400, err.message);
  }

  // Handle Mongoose duplicate key errors
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    err = new ApiError(400, 'Duplicate field value entered');
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    err = new ApiError(401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    err = new ApiError(401, 'Token expired');
  }

  const response = {
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    errors: err.errors || [],
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥:', err);
  }

  res.status(err.statusCode || 500).json(response);
};
