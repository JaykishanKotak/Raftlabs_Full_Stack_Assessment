import { Router } from 'express';
import * as restaurantController from '../controllers/restaurant.controller';

const router = Router();

router.get('/', restaurantController.getRestaurants);
router.get('/popular', restaurantController.getPopularRestaurants);
router.get('/top-rated', restaurantController.getTopRated);
router.get('/:id', restaurantController.getRestaurantById);
router.get('/:id/dishes', restaurantController.getRestaurantDishes);

export default router;
