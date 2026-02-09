import { logout } from '@/features/auth/authSlice';
import { clearCart } from '@/features/cart/cartSlice';
import { clearCommonState } from '@/features/common/commonSlice';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import { ROUTE_CONST } from '@/utils/const';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

export function useHeader() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickLogout = async () => {
    startScreenLoader();
    try {
      dispatch(clearCommonState());
      dispatch(logout());
      dispatch(clearCart());
      toast.success('Successfully logged out');
    } catch (error) {
      console.log('error', error);
    } finally {
      stopScreenLoader();
    }
  };

  const onClickProfile = () => {
    navigate(ROUTE_CONST.PROFILE);
  };

  return {
    onClickProfile,
    onClickLogout,
  };
}
