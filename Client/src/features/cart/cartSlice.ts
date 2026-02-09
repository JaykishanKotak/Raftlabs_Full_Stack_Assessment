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

      // If cart is not empty and dish is from a different restaurant
      if (
        state.items.length > 0 &&
        state.restaurantId &&
        state.restaurantId !== rId
      ) {
        // Clear cart and add new item from the new restaurant
        state.items = [{ ...dish, quantity }];
        state.restaurantId = rId;
        return;
      }

      const existingItem = state.items.find(
        (item) => item._id === dish._id || item.id === dish.id,
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...dish, quantity });
      }

      if (!state.restaurantId) {
        state.restaurantId = rId;
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ dishId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (item) =>
          item._id === action.payload.dishId ||
          item.id === action.payload.dishId,
      );
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) =>
              i._id !== action.payload.dishId && i.id !== action.payload.dishId,
          );
        }
      }

      if (state.items.length === 0) {
        state.restaurantId = null;
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item._id !== action.payload && item.id !== action.payload,
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
