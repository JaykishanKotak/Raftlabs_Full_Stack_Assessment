import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { ApiResponse } from '../utils/ApiResponse';

const router = Router();

router.get('/me', authenticate, (req: any, res) => {
  res
    .status(200)
    .json(
      new ApiResponse(200, req.user, 'User profile retrieved successfully'),
    );
});

export default router;
