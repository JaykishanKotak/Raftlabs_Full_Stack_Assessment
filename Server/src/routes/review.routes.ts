import { Router } from 'express';
import * as reviewController from '../controllers/review.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, reviewController.submitReview);
router.get('/dish/:dishId', reviewController.getDishReviews);

export default router;
