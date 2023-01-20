import { FormEvent, useCallback, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Button from "components/button/button";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import styles from "./payment-form.module.scss";
import { clearCart, selectCartTotal } from "redux/slices/cart.slice";
import { selectCurrentUser } from "redux/slices/user.slice";
import { StripeCardElement } from "@stripe/stripe-js";

const ifValidCardElement = (
  cardElement: StripeCardElement | null
): cardElement is StripeCardElement => cardElement !== null;

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useAppSelector(selectCartTotal);
  const currentUser = useAppSelector(selectCurrentUser);
  const [isPaymentOngoing, setIsPaymentOngoing] = useState(false);
  const dispatch = useAppDispatch();

  const paymentHandler = useCallback( async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!(stripe && elements)) {
      return;
    }

    setIsPaymentOngoing(true);

    const res = await fetch("/.netlify/functions/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({ amount: amount * 100 }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    const {
      paymentIntent: { client_secret: clientSecret },
    } = res;
    const cardElement = elements.getElement(CardElement);

    if (!ifValidCardElement(cardElement)) return;

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: currentUser ? (currentUser.displayName as string) : "Guest",
        },
      },
    });

    setIsPaymentOngoing(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else if (paymentResult.paymentIntent.status === "succeeded") {
      dispatch(clearCart())
      alert("Payment succeeded");
    }
    // Disabled because dispatch is never updated throughout the React app lifecycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, currentUser, elements, stripe]);

  return (
    <div className={styles["payment-form-container"]}>
      <form className={styles["form-container"]} onSubmit={paymentHandler}>
        <h4>Credit Card Payment </h4>
        <CardElement />
        <Button
          id="payment-button"
          className={styles["payment-button"]}
          loading={isPaymentOngoing}
          type="submit"
          value="Pay Now"
          buttonType="inverted"
        />
      </form>
    </div>
  );
}
