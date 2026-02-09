import * as yup from 'yup';
import { Types } from 'mongoose';
// Custom validator for Mongoose ObjectId
const objectIdSchema = yup
  .string()
  .test('is-objectid', 'Invalid ID format', (value) => {
    return value ? Types.ObjectId.isValid(value) : true;
  });

export const getDishByIdSchema = {
  query: yup.object({
    dishId: objectIdSchema.required('Dish ID is required'),
    restaurantId: objectIdSchema.required('Restaurant ID is required'),
  }),
};
