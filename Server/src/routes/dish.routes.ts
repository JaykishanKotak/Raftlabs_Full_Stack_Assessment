import { Router } from 'express';
import * as dishController from '../controllers/dish.controller';

const router = Router();

router.get('/', dishController.getDishes);
router.get('/best-sellers', dishController.getBestSellers);
router.get('/top-rated', dishController.getTopRated);
router.get('/:id', dishController.getDishById);

export default router;
