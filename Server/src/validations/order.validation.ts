import * as yup from 'yup';
import { Types } from 'mongoose';

// Custom validator for Mongoose ObjectId
const objectIdSchema = yup
  .string()
  .test('is-objectid', 'Invalid ID format', (value) => {
    return value ? Types.ObjectId.isValid(value) : true;
  });

export const createOrderSchema = {
  body: yup.object({
    restaurant: objectIdSchema.required('Restaurant ID is required'),
    deliveryDetails: yup.object({
      state: yup.string().required('State is required for delivery address'),
      city: yup.string().required('City is required for delivery address'),
      address: yup
        .string()
        .required('Address line is required for delivery address'),
      pinCode: yup
        .string()
        .required('Pin code is required for delivery address')
        .matches(/^\d{6}$/, 'Please provide a valid 6-digit pin code'),
      phoneNumber: yup
        .string()
        .notRequired()
        .matches(/^\d{10}$/, 'Please provide a valid 10-digit phone number'),
      name: yup
        .string()
        .required('Recipient name is required for delivery address'),
    }),
    items: yup
      .array()
      .of(
        yup.object({
          menuItemId: objectIdSchema.required('Menu item ID is required'),
          quantity: yup
            .number()
            .required('Quantity is required')
            .integer()
            .min(1, 'Quantity must be at least 1'),
        }),
      )
      .min(1, 'Order must have at least one item')
      .required('Items are required'),
  }),
};

export const getOrderSchema = {
  params: yup.object({
    id: objectIdSchema.required('Order ID is required'),
  }),
};

export const listOrdersSchema = {
  query: yup.object({
    status: yup
      .string()
      .oneOf(['ORDER_RECEIVED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED']),
    page: yup.number().integer().min(1).default(1),
    limit: yup.number().integer().min(1).max(100).default(10),
  }),
};
