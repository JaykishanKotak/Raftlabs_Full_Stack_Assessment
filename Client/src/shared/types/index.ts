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
  dishName: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  status: 'pending' | 'preparing' | 'on-the-way' | 'delivered' | 'cancelled';
  totalPrice: number;
  items: OrderItem[];
  createdAt: string;
}
