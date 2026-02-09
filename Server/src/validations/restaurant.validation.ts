import * as yup from 'yup';

export const getRestaurantListSchema = {
  query: yup.object({
    city: yup.string().required('City ID is required'),
  }),
};

export const getRestaurantSchema = {
  params: yup.object({
    id: yup.string().required('Restaurant ID is required'),
  }),
};
