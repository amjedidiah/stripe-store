import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems, CartState, CategoryMap } from "redux/redux.types";
import { RootState } from "redux/store";
import { reverseObject } from "utils/array.util";

type CartAddObject = {
  id: number;
  category: string;
  categoryMap: CategoryMap;
  cartItems: CartItems;
};

type CartRemoveObject = {
  id: number;
  cartItems: CartItems;
  removeAll?: boolean;
};

export const initialState = {
  cartItems: {},
  isCartOpen: false,
} as CartState;

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCartItems: (state, action: PayloadAction<CartItems>) => {
      state.cartItems = action.payload;
    },
    toggleCart: (state, action: PayloadAction<boolean>) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const addToCart = ({
  id,
  category,
  categoryMap,
  cartItems,
}: CartAddObject) => {
  const product = categoryMap[category].find((product) => product.id === id);
  const productExists = cartItems[id];
  const resolution = productExists
    ? {
        ...productExists,
        quantity: productExists.quantity + 1,
      }
    : { ...product, quantity: 1 };

  return cartSlice.actions.updateCartItems({ ...cartItems, [id]: resolution });
};

export const removeFromCart = ({
  id,
  cartItems,
  removeAll = false,
}: CartRemoveObject) => {
  const productExists = cartItems[id];
  const resolution =
    productExists?.quantity === 1 || removeAll
      ? undefined
      : {
          ...productExists,
          quantity: productExists.quantity - 1,
        };

  return cartSlice.actions.updateCartItems({ ...cartItems, [id]: resolution });
};

export const clearCart = () => cartSlice.actions.updateCartItems({});

export const { toggleCart } = cartSlice.actions;

export const selectCartIsOpen = (state: RootState) => state.cart.isCartOpen;

export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectCartItemsArray = (state: RootState) =>
  reverseObject<CartItems>(state.cart.cartItems);

export const selectCartItemsCount = (state: RootState) =>
  Object.keys(state.cart.cartItems).reduce(
    (accumulatedQuantity, cartItemKey) =>
      accumulatedQuantity + (state.cart.cartItems[cartItemKey]?.quantity ?? 0),
    0
  );

export const selectCartTotal = (state: RootState) =>
  Object.keys(state.cart.cartItems).reduce(
    (accumulatedQuantity, cartItemKey) =>
      accumulatedQuantity +
      (state.cart.cartItems[cartItemKey]?.quantity ?? 0) *
        (state.cart.cartItems[cartItemKey]?.price ?? 0),
    0
  );

export default cartSlice.reducer;
