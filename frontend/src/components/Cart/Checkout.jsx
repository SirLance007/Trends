import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import axios from "axios";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
      return;
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      // Only send required fields for shippingAddress
      const shippingAddressPayload = {
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
      };
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: shippingAddressPayload,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
          paymentDetails: {}, // send placeholder
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
    navigate("/order-confirmation");
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p>Error {error}...</p>;
  if (!cart || !cart.products || cart.products.length === 0)
    return <p>Cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-7xl mx-auto py-10 px-2 sm:px-6 tracking-tighter gap-8 bg-gradient-to-br from-blue-50 via-fuchsia-50 to-cyan-100 min-h-screen animate-fade-in">
      {/* Checkout Form */}
      <div className="bg-white/90 rounded-3xl p-6 sm:p-10 shadow-2xl border border-blue-100 animate-fade-in-up delay-100">
        <h2 className="text-3xl font-extrabold uppercase mb-8 text-blue-700 tracking-wide bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-400 animate-gradient-x flex items-center gap-2">
          <span className="inline-block animate-pop">🧾</span> Checkout
        </h2>
        <form onSubmit={handleCreateCheckout} className="space-y-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2 animate-fade-in-up delay-200">
              <span className="inline-block w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>{" "}
              Contact Details
            </h3>
            <div className="mb-6">
              <label className="block text-blue-500 mb-1 font-medium">
                Email
              </label>
              <input
                type="email"
                value={user ? user.email : ""}
                className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                disabled
              />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-700 flex items-center gap-2 animate-fade-in-up delay-300">
              <span className="inline-block w-2 h-2 bg-fuchsia-500 rounded-full animate-pulse"></span>{" "}
              Delivery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-blue-500 mb-1 font-medium">
                  First Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  required
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-blue-500 mb-1 font-medium">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  required
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-blue-500 mb-1 font-medium">
                Address
              </label>
              <input
                type="text"
                className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                required
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-blue-500 mb-1 font-medium">
                  City
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  required
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-blue-500 mb-1 font-medium">
                  Postal Code
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  required
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-blue-500 mb-1 font-medium">
                  Country
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  required
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-blue-500 mb-1 font-medium">
                  Phone No
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-blue-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                  required
                  value={shippingAddress.phone}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 via-fuchsia-500 to-cyan-400 hover:from-blue-600 hover:to-fuchsia-600 text-white py-3 rounded-xl font-bold text-lg shadow-xl transition-all duration-200 animate-pop flex items-center justify-center gap-2"
              >
                <span className="animate-bounce">→</span> Continue to Payment
              </button>
            ) : (
              <div className="animate-fade-in-up delay-200">
                <h3 className="mb-4 text-lg font-semibold text-blue-700 flex items-center gap-2">
                  <span className="animate-pop">💳</span> Pay with Paypal
                </h3>
                <PayPalButton
                  onError={(err) => alert("Payment Failed. Try again ")}
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Order Summary Section */}
      <div className="bg-white/90 rounded-3xl p-6 sm:p-10 mt-8 lg:mt-0 lg:ml-8 shadow-2xl border border-blue-100 flex flex-col min-w-[320px] max-w-md w-full animate-fade-in-up delay-200">
        <h2 className="text-xl font-extrabold mb-4 border-b border-blue-100 pb-2 text-blue-700 tracking-tight bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-400 animate-gradient-x flex items-center gap-2">
          <span className="animate-pop">🛒</span> Order Summary
        </h2>
        <div className="flex-1 overflow-y-auto">
          {cart.products.map((item) => (
            <div
              key={item.id}
              className="flex items-center mb-4 border-b border-blue-100 pb-3 last:border-b-0 last:pb-0 animate-fade-in-up"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-lg mr-4 border border-blue-100 shadow"
              />
              <div className="flex-1">
                <div className="font-bold text-blue-700">{item.name}</div>
                <div className="text-xs text-blue-400">
                  {item.brand} • {item.category}
                </div>
                <div className="text-xs text-blue-400">
                  Size: {item.size} | Color: {item.color}
                </div>
                <div className="text-sm text-blue-500 mt-1">
                  Qty: {item.quantity}
                </div>
              </div>
              <div className="font-semibold text-fuchsia-600 ml-2">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-400">Subtotal</span>
            <span className="font-bold text-blue-700">
              ${cart.totalPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400">Shipping</span>
            <span className="text-blue-700">$0</span>
          </div>
          <div className="flex justify-between border-t border-blue-100 pt-2 font-extrabold text-lg">
            <span>Total</span>
            <span>${(cart.totalPrice + 0).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
