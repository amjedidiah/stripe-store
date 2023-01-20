import { useCallback, memo } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import {
  addToCart,
  removeFromCart,
  selectCartItems,
} from "redux/slices/cart.slice";
import { selectCategoryMap } from "redux/slices/category.slice";
import styles from "routes/components/checkout/components/checkout-item/checkout-item.module.scss";
import { CartItemProps } from "routes/components/shop/components/cart/components/cart-item/cart-item";

export function CheckoutItem({
  id,
  name,
  imageUrl,
  price,
  quantity,
  category,
}: CartItemProps) {
  const categoryMap = useAppSelector(selectCategoryMap);
  const cartItems = useAppSelector(selectCartItems);
  const dispatch = useAppDispatch();

  const removeItemFromCart = useCallback(
    () => dispatch(removeFromCart({ id, cartItems })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, id]
  );
  const removeItemsFromCart = useCallback(
    () => dispatch(removeFromCart({ id, cartItems, removeAll: true })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, id]
  );
  const addItemToCart = useCallback(
    () => dispatch(addToCart({ id, category, categoryMap, cartItems })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, category, categoryMap, id]
  );

  return (
    <div className={styles["checkout-item-container"]}>
      <div className={styles["image-container"]}>
        <img src={imageUrl} alt={name} />
      </div>
      <div className={styles.name}>{name}</div>
      <div className={styles.quantity}>
        <span className={styles.arrow} onClick={removeItemFromCart}>
          &#10094;
        </span>
        <span className={styles.value}>{quantity}</span>
        <span className={styles.arrow} onClick={addItemToCart}>
          &#10095;
        </span>
      </div>
      <div className={styles.price}>{price}</div>
      <div className={styles["remove-button"]} onClick={removeItemsFromCart}>
        &#10005;
      </div>
    </div>
  );
}

export default memo(CheckoutItem);
