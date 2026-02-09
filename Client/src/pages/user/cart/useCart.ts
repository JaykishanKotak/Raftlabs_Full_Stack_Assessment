import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from '@/features/cart/cartSlice';
import { createOrder } from '@/shared/api/order.api';
import toast from 'react-hot-toast';

const deliveryDetailsSchema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must not exceed 50 characters'),
  address: yup
    .string()
    .required('Delivery address is required')
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must not exceed 200 characters'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number'),
  state: yup
    .string()
    .required('State is required')
    .min(2, 'State must be at least 2 characters')
    .max(50, 'State must not exceed 50 characters'),
  city: yup
    .string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must not exceed 50 characters'),
  pinCode: yup
    .string()
    .required('Pin code is required')
    .matches(/^[0-9]{6}$/, 'Pin code must be a valid 6-digit number'),
});

export type DeliveryDetailsFormData = yup.InferType<
  typeof deliveryDetailsSchema
>;

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cityList } = useSelector((state: any) => state.common);

  const { items, restaurantId } = useSelector((state: any) => state.cart);
  const { userDetails } = useSelector((state: any) => state.auth);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<DeliveryDetailsFormData>({
    resolver: yupResolver(deliveryDetailsSchema as any),
    defaultValues: {
      name: userDetails?.name || '',
      address: userDetails?.address || '',
      phoneNumber: userDetails?.phoneNumber || '',
      state: userDetails?.state || '',
      city: userDetails?.city || '',
      pinCode: userDetails?.pinCode || '',
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const deliveryDetails = watch();

  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal < 350 ? 50 : 0;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (dishId: string, quantity: number) => {
    dispatch(updateQuantity({ dishId, quantity }));
  };

  const handleRemove = (dishId: string) => {
    dispatch(removeFromCart(dishId));
  };

  const handlePlaceOrder = handleSubmit(
    async (data: DeliveryDetailsFormData) => {
      setPlacingOrder(true);

      try {
        await createOrder({
          customer: {
            name: userDetails.name,
            email: userDetails?.email || '',
            phone: userDetails.phoneNumber,
          },
          deliveryDetails: {
            ...data,
          },
          items: items.map((item: any) => ({
            menuItemId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          restaurant: restaurantId,
          totalAmount: subtotal,
        });

        toast.success('Order placed successfully!');
        dispatch(clearCart());
        navigate('/profile/orders');
      } catch (error) {
        console.error('Failed to place order:', error);
        toast.error('Failed to place order. Please try again.');
      } finally {
        setPlacingOrder(false);
      }
    },
  );
  console.log('errors', errors);

  return {
    items,
    isCheckingOut,
    placingOrder,
    deliveryDetails,
    control,
    errors,
    subtotal,
    deliveryFee,
    total,
    setIsCheckingOut,
    handleQuantityChange,
    handleRemove,
    handlePlaceOrder,
    cityList: cityList.data,
    clearCart: () => dispatch(clearCart()),
  };
};
