import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  updateQuantity,
  removeFromCart,
  clearCart,
} from '@/features/cart/cartSlice';
import { createOrder } from '@/shared/api/order.api';
import toast from 'react-hot-toast';

export const useCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, restaurantId } = useSelector((state: any) => state.cart);
  const { userDetails } = useSelector((state: any) => state.auth);

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: userDetails?.name || '',
    address: userDetails?.address || '',
    phone: userDetails?.phoneNumber || '',
  });

  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal > 0 ? 5 : 0;
  const total = subtotal + deliveryFee;

  const handleQuantityChange = (dishId: string, quantity: number) => {
    dispatch(updateQuantity({ dishId, quantity }));
  };

  const handleRemove = (dishId: string) => {
    dispatch(removeFromCart(dishId));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacingOrder(true);

    try {
      await createOrder({
        customer: {
          name: userDetails?.name || '',
          email: userDetails?.email || '',
          phone: userDetails?.phoneNumber || '',
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
  };

  return {
    items,
    isCheckingOut,
    placingOrder,
    deliveryDetails,
    setDeliveryDetails,
    subtotal,
    deliveryFee,
    total,
    setIsCheckingOut,
    handleQuantityChange,
    handleRemove,
    handlePlaceOrder,
    clearCart: () => dispatch(clearCart()),
  };
};
