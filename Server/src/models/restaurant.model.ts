import mongoose, { Schema } from 'mongoose';
import { IRestaurant } from '../types/restaurant.type';

const restaurantSchema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: [true, 'Restaurant name is required'],
      unique: true,
    },
    address: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    cuisine: [String],
    city: { type: String, required: true },
    state: { type: String, required: true },
    isOpened: { type: Boolean, default: true },
    imageUrl: { type: String, required: false },
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Restaurant = mongoose.model<IRestaurant>('Restaurant', restaurantSchema);
export default Restaurant;
