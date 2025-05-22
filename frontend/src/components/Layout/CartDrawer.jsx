import React, { use, useState } from "react";
import CartContents from "../Cart/CartContents";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user._id : null;
  const handleCheckout = () => {
    toggleCartDrawer(false);
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-3/4 sm:w-1/2 md:w-[30rem] h-full bg-white shadow-lg transition--tranform duration-300 flex flex-col z-50 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <div className="flex p-4 jsutify-end">
        <button onClick={toggleCartDrawer}>
          <IoMdClose className="h-6 w-6 text-gray-600" />
        </button>
      </div>
      {/* Cart buttons */}
      <div className="flex-grow p-4 overflow-y-auto ">
        <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
        {cart && cart?.products?.length > 0 ? (
          <CartContents cartData={cart} userId={userId} guestId={guestId} />
        ) : (
          <div className="flex flex-col items-center justify-center h-80 animate-fade-in-up">
            <svg
              className="w-24 h-24 text-gray-300 animate-bounce mb-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 0 0 7.48 19h9.04a2 2 0 0 0 1.83-1.3L21 13M7 13V6a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v7"
              />
            </svg>
            <p className="text-lg font-bold text-gray-500 mb-2">
              Your cart is empty!
            </p>
            <p className="text-gray-400 mb-4">
              Looks like you haven't added anything yet.
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-400 mb-4"></div>
            <button
              onClick={() => navigate("/collections/all")}
              className="mt-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-200"
            >
              Shop Now
            </button>
          </div>
        )}
      </div>

      {/* Checkout Button */}
      <div className="p-4 bg-white sticky bottom-0">
        {cart && cart?.products?.length > 0 && (
          <>
            <button
              onClick={handleCheckout}
              className="bg-black w-full text-white px-3 py-3 rounded-lg font-semibold hover:bg-gray-800 transition "
            >
              Checkout
            </button>
            <p className="text-sm tracking-tighter text-gray-500 text-center mt-2">
              Shipping , taxes , and discount calculated at Checkout
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
