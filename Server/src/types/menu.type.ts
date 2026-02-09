import { Document, Types } from 'mongoose';

export interface IMenu extends Document {
  dish: Types.ObjectId;
  restaurant: Types.ObjectId;
  price: number;
  prepTime: number;
  isAvailable: boolean;
  isDeleted: boolean;
  customDescription?: string;
}
