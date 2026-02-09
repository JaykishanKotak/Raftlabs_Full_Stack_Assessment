import { Router } from 'express';
import authRoutes from './auth.routes';
import commonRoutes from './common.routes';
import restaurantRoutes from './restaurant.routes';
import orderRoutes from './order.routes';
import dishRoutes from './dish.routes';
import reviewRoutes from './review.routes';
import userRoutes from './user.routes';

import { ApiResponse } from '../utils/ApiResponse';

const router = Router();

router.use('/auth', authRoutes);
router.use('/common', commonRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/orders', orderRoutes);
router.use('/dishes', dishRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

// Health check route
router.get('/health', (_req, res) => {
  res.status(200).json(new ApiResponse(200, null, 'Server is running'));
});

export default router;
