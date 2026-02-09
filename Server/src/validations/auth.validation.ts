import * as yup from 'yup';

export const registerSchema = {
  body: yup.object({
    name: yup
      .string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters'),
    email: yup
      .string()
      .required('Email is required')
      .email('Must be a valid email'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    phoneNumber: yup
      .string()
      .required('Phone number is required')
      .matches(/^\d{10}$/, 'Please provide a valid 10-digit phone number'),
    city: yup
      .string()
      .required('City is required')
      .min(2, 'City must be at least 2 characters')
      .max(50, 'City cannot exceed 50 characters'),
    state: yup
      .string()
      .required('State is required')
      .min(2, 'State must be at least 2 characters')
      .max(50, 'State cannot exceed 50 characters'),
    address: yup
      .string()
      .required('Address is required')
      .min(5, 'Address must be at least 5 characters')
      .max(100, 'Address cannot exceed 100 characters'),
    pinCode: yup
      .string()
      .required('Pin code is required')
      .matches(/^\d{6}$/, 'Please provide a valid 6-digit pin code'),
  }),
};

export const loginSchema = {
  body: yup.object({
    email: yup
      .string()
      .required('Email is required')
      .email('Must be a valid email'),
    password: yup.string().required('Password is required'),
  }),
};
