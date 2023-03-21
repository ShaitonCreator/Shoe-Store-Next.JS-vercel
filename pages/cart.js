import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";

// payment releated
import { makePaymentRequest } from "@/utils/api";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRPE_PUBLISHABLE_KEY);

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);

  // for payment gateway
  const handlePayment = async () => {
    try {
      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: cartItems,
      });
      stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // to update total amount
  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.totalPrice, 0);
  }, [cartItems]);
  return (
    <div>
      <Wrapper>
        {/* when cart has some items */}
        {cartItems?.length > 0 && (
          <>
            {/* Heading and prargraph start */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* Heading and prargraph end */}
            {/* content start */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* cart items start */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItems?.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              {/* cart items end */}
              {/* cart summery start */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>
                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className=" text-md md:text-lg font-medium text-black">
                      ₹ {subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The Subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    Id does not iclude delivery cost and internation transaction
                    fees.
                  </div>
                </div>
                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center justify-center gap-2"
                  onClick={handlePayment}
                >
                  Checkout
                  {loading && <img src="/spinner.svg" alt="loader-image" />}
                </button>
              </div>
              {/* cart summery end */}
            </div>
            {/* content end */}
          </>
        )}
        {/* when cart does'nt have item */}
        {cartItems?.length < 1 && (
          <>
            <div className="flex-[2] flex flex-col items-center pb-[50px] md:mt-14">
              <Image
                src="/empty-cart.jpg"
                width={300}
                height={300}
                className="w-[300px] md:w-[400px]"
                alt={`emplyt-cart`}
              />
              <span className="text-xl font-bold">Your Cart is Empty</span>
              <span>
                Looks like you have not added anything in your cart.
                <br />
                Go ahead and explore top categoreis.
              </span>
              <Link
                href="/"
                className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
