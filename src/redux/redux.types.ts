import { UserData } from "utils/firebase.utils";

export type AuthDetails = {
  email: string;
  password: string;
  displayName?: string;
};

export type Category = {
  title: string;
  items: Product[];
};

export type CategoryMap = {
  [title: string]: Product[];
};

export type CategoryState = {
  categories: Category[] | null;
  error: StateError;
  isLoading: boolean;
};

export interface CartItem extends Product {
  quantity: number;
}

export type CartItems = {
  [key: string]: CartItem;
};

export type CartState = {
  readonly cartItems: CartItems;
  readonly isCartOpen: boolean;
};

export interface Product {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  category: string;
}

export type StateError = {
  code: string;
  message: string;
} | null;

export type UserState = {
  readonly currentUser: UserData | null;
  readonly error: StateError;
  readonly isLoading: boolean;
};
