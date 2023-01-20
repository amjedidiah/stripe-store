import Button from "components/button/button";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useNavigate } from "react-router-dom";
import {
  selectCartIsOpen,
  selectCartItemsArray,
  toggleCart,
} from "redux/slices/cart.slice";
import styles from "routes/components/shop/components/cart/components/cart-dropdown/cart-dropdown.module.scss";
import CartItem from "routes/components/shop/components/cart/components/cart-item/cart-item";

export default function CartDropdown() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isCartOpen = useAppSelector(selectCartIsOpen);
  const cartItemsArray = useAppSelector(selectCartItemsArray);

  const goToCheckout = useCallback(() => {
    dispatch(toggleCart(true));
    navigate("/checkout");
    // Disabled because dispatch is never updated throughout the React app lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isCartOpen) return null;

  return (
    <div className={styles["cart-dropdown-container"]}>
      <div className={styles["cart-items"]}>
        {cartItemsArray.length ? (
          cartItemsArray.map((cartItem) => (
            <CartItem key={`cartItem-${cartItem.id}`} {...cartItem} />
          ))
        ) : (
          <span className={styles["empty-message"]}>Your cart is empty</span>
        )}
      </div>
      <Button
        id="go-to-checkout-button"
        value="CHECKOUT"
        onClick={goToCheckout}
        disabled={!cartItemsArray.length}
      />
    </div>
  );
}
