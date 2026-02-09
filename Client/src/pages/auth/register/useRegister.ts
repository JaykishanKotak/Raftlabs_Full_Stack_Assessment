import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { registerSchema, type RegisterFormData } from './registerSchema';
import { register } from '@/shared/api/login.api';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import { ROUTE_CONST } from '@/utils/const';
import toast from 'react-hot-toast';
import { getCityList } from '@/shared/api/common.api';
import { useEffect, useState } from 'react';

const initialValues: RegisterFormData = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
};

export function useRegister() {
  const navigate = useNavigate();

  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema) as any,
    defaultValues: initialValues,
    mode: 'onBlur',
  });

  const [cityList, setCityList] = useState<{ value: string; label: string }[]>(
    [],
  );

  const fetchCityList = async () => {
    startScreenLoader();
    try {
      const data = await getCityList();
      console.log('city list', data);
      const mappedCities: { value: string; label: string }[] = data.map(
        (city: string) => ({
          value: city,
          label: city,
        }),
      );
      setCityList(mappedCities);
    } catch (error) {
      console.error(error);
    } finally {
      stopScreenLoader();
    }
  };

  useEffect(() => {
    fetchCityList();
  }, []);

  const onSubmit = async (data: RegisterFormData) => {
    startScreenLoader();

    try {
      const {
        name,
        email,
        password,
        phoneNumber,
        address,
        city,
        state,
        pinCode,
      } = data;
      const response = await register({
        name,
        email,
        password,
        phoneNumber,
        address,
        city,
        state,
        pinCode,
      });
      if (response) {
        toast.success('User registered successfully');
        navigate(ROUTE_CONST.LOGIN);
      }
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
    cityList,
  };
}
