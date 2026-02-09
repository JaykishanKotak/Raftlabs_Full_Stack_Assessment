import { Document } from 'mongoose';

export interface IDish extends Document {
  name: string;
  baseDescription: string;
  foodType: 'VEG' | 'NON_VEG' | 'VEGAN';
  baseIngredients: string[];
  imageUrl?: string;
  price: number;
  averageRating?: number;
  ratingCount?: number;
}
