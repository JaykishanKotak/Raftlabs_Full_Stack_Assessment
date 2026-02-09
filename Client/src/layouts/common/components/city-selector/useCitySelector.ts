import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  startScreenLoader,
  stopScreenLoader,
} from '@/shared/utils/loaderControl';
import { getCityList } from '@/shared/api/common.api';
import {
  setCityListData,
  setSelectedCity,
} from '@/features/common/commonSlice';

export const useCitySelector = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { userDetails } = useSelector((state: any) => state.auth);

  const { cityList, selectedCity } = useSelector((state: any) => state.common);

  const fetchCityList = async () => {
    startScreenLoader();
    try {
      const data = await getCityList();
      dispatch(setCityListData(data));
    } catch (error) {
      console.error(error);
    } finally {
      stopScreenLoader();
    }
  };

  useEffect(() => {
    const savedCity = userDetails?.city;
    if (savedCity) {
      dispatch(setSelectedCity(savedCity));
    }
  }, [userDetails, dispatch]);

  useEffect(() => {
    if (!cityList?.isDataFetch) {
      fetchCityList();
    }
  }, [cityList?.isDataFetch]);

  const handleCitySelect = (city: string) => {
    dispatch(setSelectedCity(city));
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    cityList,
    selectedCity,
    handleCitySelect,
  };
};
