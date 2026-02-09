import { Document, Types } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  address: string;
  owner: Types.ObjectId;
  cuisine: string[];
  city: string;
  state: string;
  isOpened: boolean;
  imageUrl?: string;
  averageRating?: number;
  ratingCount?: number;
}
