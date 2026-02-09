import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { authenticate } from '../middleware/auth';
import { validate } from '../middleware/validate';
import * as orderValidation from '../validations/order.validation';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  validate(orderValidation.createOrderSchema),
  orderController.createOrder,
);
router.get('/my-orders', orderController.getMyOrders);
router.get(
  '/:id',
  validate(orderValidation.getOrderSchema),
  orderController.getOrderDetails,
);

export default router;
