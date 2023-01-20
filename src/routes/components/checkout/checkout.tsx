import styles from "routes/components/checkout/checkout.module.scss";
import { reverseObject } from "utils/array.util";
import CheckoutItem from "routes/components/checkout/components/checkout-item/checkout-item";
import { useAppSelector } from "redux/hooks";
import { selectCartItems, selectCartTotal } from "redux/slices/cart.slice";
import PaymentForm from "components/payment-form/payment-form";

const headerBlocks = ["Product", "Description", "Quantity", "Price", "Remove"];

export default function Checkout() {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <div className={styles["checkout-container"]}>
      <div className={styles["checkout-header"]}>
        {headerBlocks.map((headerBlock) => (
          <div className={styles["header-block"]} key={headerBlock}>
            <span>{headerBlock}</span>
          </div>
        ))}
      </div>
      {reverseObject(cartItems).map((item) => (
        <CheckoutItem key={item.id} {...item} />
      ))}
      <div className={styles.total}>
        <span>TOTAL: ${cartTotal}</span>
        <PaymentForm />
      </div>
    </div>
  );
}
