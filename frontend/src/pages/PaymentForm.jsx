import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/UserContext";

const PaymentForm = ({ cartItems }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { token, userId } = useContext(AuthContext);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsLoading(true);
    setMessage("Payment in Progress");

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setMessage("Some Error Occurred !!");
    } else {
      navigate("/success", {
        state: {
          cartItems,
          userId,
          token,
        },
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="card w-100 bg-base-100 bg-gray-200 shadow-2xl rounded-lg">
          <div className="card-body p-6">
            <h1 className="card-title font-bold text-2xl mb-4 justify-center">
              Complete your payment here!
            </h1>
            <PaymentElement />
            <div className="card-actions justify-center">
              <button
                className="btn btn-primary rounded-xl text-white px-4 py-2 mt-6"
                disabled={isLoading || !stripe || !elements}
              >
                {isLoading ? "Loading..." : "Pay now"}
              </button>
            </div>
            {message && <div>{message}</div>}
          </div>
        </div>
      </form>
    </div>
  );
};

PaymentForm.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      menuItemId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default PaymentForm;
