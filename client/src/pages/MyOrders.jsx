import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { cartFail, cartReq, cartSuccess, clearErrors } from "../reducers/order";
import CartItemsCard from "../components/CartItemsCard";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { loadStripe } from "@stripe/stripe-js";

const getCart = async (dispatch) => {
  try {
    dispatch(cartReq());
    const { data } = await axios.get(`/api/v1/myOrders`);
    // console.log(data);
    dispatch(cartSuccess(data));
    return data;
  } catch (error) {
    dispatch(cartFail(error));
    return {};
  }
};

const MyOrders = () => {
  const [cart, setCart] = useState({});
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCart(dispatch);
        // console.log(data)
        setCart(data.message[0]); // Assuming the cart data is directly returned as an object
      } catch (error) {
        alert.error("Failed to fetch cart");
      }
    };

    fetchCart();
    dispatch(clearErrors());
  }, [dispatch, alert]);
  // console.log(cart);

  const makePayment = async () => {
    try {
      // Fetch the publishable key
      const keyResponse = await axios.get(`/api/v1/config/stripe`);
      const publishableKey = keyResponse.data.publishableKey;

      // Load Stripe
      const stripe = await loadStripe(publishableKey);

      // Create checkout session
      const checkoutResponse = await axios.post(`api/v1/checkout`, {
        cartItems: cart.orderItems,
        successUrl: `http://localhost:5173/payment/success`,
        cancelUrl: `http://localhost:5173/payment/cancel`
      });

      const sessionId = checkoutResponse.data.sessionId;

      // Redirect to checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId
      });

      if (error) {
        console.error('Error redirecting to checkout:', error);
      }
    } catch (error) {
      console.error('Error processing payment:', error);
    }
};


  return (
    <div className="pt-24 m-auto w-[90%] min-h-screen max-sm:h-[160vh]">
      <h1 className="text-4xl font-bold font-serif text-red-800 pl-10">
        My Cart Items
      </h1>
      <div className="flex justify-evenly max-sm:flex-col">
        <div className="lg:w-[55%]">
          {cart && cart.orderItems && cart.orderItems.length > 0 ? (
            cart.orderItems.map((items, index) => (
              <CartItemsCard key={index} cartItems={items} />
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </div>
        <div className="bg-white max-h-[80vh] p-3 m-1 rounded-md lg:w-[35%] py-10">
          <p className="font-bold text-slate-500 text-xl underline-offset-2 underline">
            PRICE DETAILS
          </p>
          <hr className="my-5" />
          {cart && cart.orderItems && (
            <div className="">
              <div className="flex items-center justify-between mx-3">
                <p className="">Price ({cart.orderItems.length})</p>
                <p className="">₹{cart.totalPrice} </p>
              </div>
              <div className="flex items-center justify-between mx-3 my-3">
                <p className="">Taxes</p>
                <p className="">₹{cart.taxPrice} </p>
              </div>
              <hr className="my-5" />

              <div className="flex font-bold items-center justify-between mx-3">
                <p className="">Total Payable</p>
                <p className="">₹{cart.totalPrice} </p>
              </div>
              <hr className="my-5" />

              <button
                onClick={makePayment}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-10"
              >
                Place Order
              </button>
            </div>
          )}

          <div className="flex">
            <AiFillSafetyCertificate size={44} color="green" />
            <p className="font-bold">
              Safe and Secure Payments. Easy returns. 100% Automatic Products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
