import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PaymentForm from "./PaymentForm";

const stripe = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripePayment = () => {
  const location = useLocation();
  const [clientSecret, setClientSecret] = useState(null);

  const cartItems = location.state?.cartItems || [];

  useEffect(() => {
    if (cartItems.length === 0) {
      console.error("No cart items found");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_REACT_APP_URI}/create-payment-intent`, {
        items: cartItems.map((item) => ({
          id: item.menuItemId,
          name: item.name,
          amount: item.price * item.quantity,
        })),
      })
      .then((resp) => setClientSecret(resp.data.clientSecret))
      .catch((error) => console.error("Error creating payment intent:", error));
  }, [cartItems]);

  const options = {
    clientSecret,
    theme: "stripe",
  };

  if (cartItems.length === 0) {
    return (
      <div>
        No items in cart. Please add items before proceeding to payment.
      </div>
    );
  }

  return (
    clientSecret && (
      <Elements stripe={stripe} options={options}>
        <PaymentForm cartItems={cartItems} />
      </Elements>
    )
  );
};

export default StripePayment;
