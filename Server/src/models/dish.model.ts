import mongoose, { Schema } from 'mongoose';
import { IDish } from '../types/dish.type';

const dishSchema = new Schema<IDish>(
  {
    name: { type: String, required: true, trim: true },
    baseDescription: { type: String, required: true },
    foodType: {
      type: String,
      enum: ['VEG', 'NON_VEG', 'VEGAN'],
      required: true,
    },
    baseIngredients: [String],
    price: { type: Number, required: true, min: 1, default: 10 },
    imageUrl: String,
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Dish = mongoose.model<IDish>('Dish', dishSchema);
export default Dish;
