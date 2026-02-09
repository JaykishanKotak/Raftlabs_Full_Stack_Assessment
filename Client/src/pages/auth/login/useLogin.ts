import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { loginSchema, type LoginFormData } from './loginSchema';
import { login } from '@/shared/api/login.api';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import { loginSucceeded } from '@/features/auth/authSlice';
import { ROUTE_CONST } from '@/utils/const';
import { useAppDispatch } from '@/app/hooks';

const initialValues = {
  email: '',
  password: '',
};

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormData>({
    resolver: yupResolver<any>(loginSchema),
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const onSubmit = async (data: LoginFormData) => {
    startScreenLoader();

    try {
      const response = await login(data);
      dispatch(
        loginSucceeded({
          accessToken: response.accessToken,
          userDetails: response.user,
        }),
      );
      navigate(ROUTE_CONST.HOME);
    } catch (error) {
      console.log('error', error);
    } finally {
      stopScreenLoader();
    }
    return;
  };

  return {
    form,
    onSubmit,
  };
}
