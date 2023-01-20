import { createContext, useCallback, useContext, useReducer } from "react";
import { CategoryContext } from "context/category.reducer.context";
import { reverseObject } from "utils/array.util";

export const CartContext = createContext({
  cartItems: {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  isCartOpen: false,
  toggleCart: () => {},
  cartItemsCount: 0,
  cartItemsArray: [],
  cartTotal: 0,
});

const cartSlice = {
  cartItems: {},
  cartItemsArray: [],
  cartItemsCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

const cartActionTypes = {
  UPDATE_CART: "UPDATE_CART",
  TOGGLE_CART: "TOGGLE_CART",
};

const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case cartActionTypes.UPDATE_CART: {
      const { cartItems, cartItemsArray, cartItemsCount, cartTotal } = payload;
      return {
        ...state,
        cartItems,
        cartItemsArray,
        cartItemsCount,
        cartTotal,
      };
    }
    case cartActionTypes.TOGGLE_CART:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { categoryMap } = useContext(CategoryContext);
  const [
    { cartItems, cartItemsArray, cartItemsCount, cartTotal, isCartOpen },
    dispatch,
  ] = useReducer(cartReducer, cartSlice);

  const updateCartItems = useCallback((cartItems) => {
    const cartItemsArray = reverseObject(cartItems);

    const cartItemsCount = cartItemsArray.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    );

    const cartTotal = cartItemsArray.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0
    );

    dispatch({
      type: cartActionTypes.UPDATE_CART,
      payload: { cartItems, cartItemsArray, cartItemsCount, cartTotal },
    });
  }, []);

  const addToCart = useCallback( (id, category) => {
    const product = categoryMap[category].find((product) => product.id === id);
    const productExists = cartItems[id];
    const resolution = productExists
      ? {
          ...productExists,
          quantity: productExists.quantity + 1,
        }
      : { ...product, quantity: 1 };

    updateCartItems({ ...cartItems, [id]: resolution });
  }, [cartItems, categoryMap, updateCartItems]);

  const removeFromCart = useCallback((id, removeAll = false) => {
    const productExists = cartItems[id];
    const resolution =
      productExists.quantity === 1 || removeAll
        ? undefined
        : {
            ...productExists,
            quantity: productExists.quantity - 1,
          };

    updateCartItems({ ...cartItems, [id]: resolution });
  }, [cartItems, updateCartItems]);

  const clearCart = () => updateCartItems({});

  const toggleCart = () => dispatch({ type: cartActionTypes.TOGGLE_CART });

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isCartOpen,
        toggleCart,
        cartItemsCount,
        cartItemsArray,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
