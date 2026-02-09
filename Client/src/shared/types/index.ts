export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Restaurant {
  _id: string;
  id: string;
  name: string;
  description: string;
  address: string;
  rating: number;
  imageUrl?: string;
}

export interface Dish {
  _id: string;
  id: string;
  name: string;
  baseDescription: string;
  price: number;
  restaurantId: string;
  imageUrl?: string;
  foodType: string;
  rating?: number;
}

export interface OrderItem {
  _id: string;
  id: string;
  dishId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderStatusHistory {
  _id: string;
  id: string;
  orderId: string;
  status: string;
  updatedAt: string;
}

export interface restaurant {
  _id: string;
  id: string;
  name: string;
  city: string;
  state: string;
  pinCode: string;
  description: string;
  address: string;
  rating: number;
  imageUrl?: string;
}

export interface Order {
  _id: string;
  id: string;
  userId: string;
  restaurantId: string;
  deliveryDetails?: {
    state?: string;
    city?: string;
    address?: string;
    pinCode?: string;
    phoneNumber?: string;
    name?: string;
  };
  restaurantName: string;
  status: 'pending' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  totalAmount: number;
  restaurant?: restaurant;
  items: OrderItem[];
  createdAt: string;
  statusHistory?: OrderStatusHistory[];
}
