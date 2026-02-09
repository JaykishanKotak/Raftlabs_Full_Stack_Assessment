import { Document, Types } from 'mongoose';

export interface IOrderItem {
  menuItemId: Types.ObjectId;
  name: string;
  price: number;
  quantity: number;
}

export interface IStatusHistory {
  status: string;
  updatedAt: Date;
  updatedBy?: Types.ObjectId;
}

export interface IOrder extends Document {
  restaurant: Types.ObjectId;
  customer: Types.ObjectId;
  items: {
    menuItemId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  deliveryDetails: {
    state: string;
    city: string;
    address: string;
    pinCode: string;
    phoneNumber?: string;
    name: string;
  };
  status:
    | 'ORDER_RECEIVED'
    | 'PREPARING'
    | 'OUT_FOR_DELIVERY'
    | 'DELIVERED'
    | 'CANCELLED';
  createdBy?: Types.ObjectId;
  statusHistory: {
    status: string;
    updatedAt: Date;
    updatedBy?: Types.ObjectId;
  }[];
}
