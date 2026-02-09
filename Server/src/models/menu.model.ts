import mongoose, { Schema } from 'mongoose';
import { IMenu } from '../types/menu.type';

const menuSchema = new Schema<IMenu>(
  {
    dish: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: 'Restaurant',
      required: true,
    },
    price: { type: Number, required: true, min: 0 },
    prepTime: { type: Number, default: 1800 },
    isAvailable: { type: Boolean, default: true },
    customDescription: String,
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Menu = mongoose.model<IMenu>('Menu', menuSchema);

export default Menu;
