import { Document } from 'mongoose';

export interface IUser extends Document {
  // _id: mongoose.Types.ObjectId | ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'CUSTOMER' | 'ADMIN' | 'DELIVERY';
  address: string;
  phoneNumber: string;
  city: string;
  state: string;
  pinCode: string;
  accessToken?: string;
  isDeleted: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
