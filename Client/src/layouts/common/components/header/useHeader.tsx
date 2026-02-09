import { logout } from '@/features/auth/authSlice';
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
      dispatch(logout());
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
