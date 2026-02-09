import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CommonState = {
  cityList: {
    isDataFetch: boolean;
    data: any[];
  };
  selectedCity?: string;
};

const initialState: CommonState = {
  cityList: {
    isDataFetch: false,
    data: [],
  },
  selectedCity: '',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCityListData(state, action: PayloadAction<any>) {
      state.cityList.isDataFetch = true;
      state.cityList.data = action.payload;
    },
    setSelectedCity(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
  },
});

export const { setCityListData, setSelectedCity } = commonSlice.actions;
export const commonReducer = commonSlice.reducer;
