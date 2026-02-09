import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Dish } from '@/shared/types';

export interface CartItem extends Dish {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  restaurantId: string | null;
}

const initialState: CartState = {
  items: [],
  restaurantId: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        dish: Dish;
        quantity: number;
        restaurantId?: string;
      }>,
    ) {
      const { dish, quantity, restaurantId } = action.payload;
      const rId = restaurantId ? String(restaurantId) : null;
      const dishId = dish._id ?? dish.id;

      // Different restaurant → reset cart
      if (
        state.items.length > 0 &&
        state.restaurantId &&
        state.restaurantId !== rId
      ) {
        state.items = [{ ...dish, quantity }];
        state.restaurantId = rId;
        return;
      }

      const existingItem = state.items.find(
        (item) => (item._id ?? item.id) === dishId,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...dish, quantity });
      }

      state.restaurantId = rId;
    },
    updateQuantity(
      state,
      action: PayloadAction<{ dishId: string; quantity: number }>,
    ) {
      const { dishId, quantity } = action.payload;

      const item = state.items.find((item) => (item._id ?? item.id) === dishId);

      if (!item) return;

      item.quantity = quantity;

      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => (i._id ?? i.id) !== dishId);
      }

      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const dishId = action.payload;

      state.items = state.items.filter(
        (item) => (item._id ?? item.id) !== dishId,
      );

      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    clearCart(state) {
      state.items = [];
      state.restaurantId = null;
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
