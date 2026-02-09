import mongoose, { Document, ObjectId } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId | ObjectId;
  dish: mongoose.Types.ObjectId | ObjectId;
  restaurant: mongoose.Types.ObjectId | ObjectId;
  rating: number;
  comment?: string;
}
