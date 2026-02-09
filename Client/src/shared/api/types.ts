export type LoginRequest = {
  email?: string;
  password?: string;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};

export type RegisterRequest = {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
};

export type RegisterResponse = {
  message: string;
  status?: number;
};

export type User = {
  id?: string;
  email?: string;
  name?: string;
  createdAt?: string | Date;
  password?: string;
};

export interface ApiResponse<T> {
  message: string;
  error: string | null;
  data: T;
  status: number;
}

export interface ApiError {
  status: number;
  message: string;
  errors?: unknown;
}

export type CommonErrorInterface = {
  message?: string;
  error?: string;
  data?: null;
  status?: number;
};
