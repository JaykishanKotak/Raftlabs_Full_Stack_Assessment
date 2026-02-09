import { Router } from 'express';
import * as dishController from '../controllers/dish.controller';
import { validate } from '../middleware/validate';
import { getDishByIdSchema } from '../validations/dish.validation';

const router = Router();

router.get('/', dishController.getDishes);
router.get('/best-sellers', dishController.getBestSellers);
router.get('/top-rated', dishController.getTopRated);
router.get('/details', validate(getDishByIdSchema), dishController.getDishById);

export default router;
