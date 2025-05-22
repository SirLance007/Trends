import React from "react";
import { HiOutlineCreditCard, HiShoppingBag } from "react-icons/hi";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";

const FeaturesSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group">
          <div className="p-6 rounded-full mb-6 bg-gradient-to-tr from-pink-500 to-indigo-500 text-white shadow-lg group-hover:scale-110 transition-transform">
            <HiArrowPathRoundedSquare className="text-3xl" />
          </div>
          <h4 className="tracking-tight mb-2 text-lg font-bold text-gray-900">
            45 Days Return
          </h4>
          <p className="text-gray-500 text-base tracking-tight">
            Money back guarantee
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group">
          <div className="p-6 rounded-full mb-6 bg-gradient-to-tr from-green-400 to-blue-500 text-white shadow-lg group-hover:scale-110 transition-transform">
            <HiShoppingBag className="text-3xl" />
          </div>
          <h4 className="tracking-tight mb-2 text-lg font-bold text-gray-900">
            FREE INTERNATIONAL SHIPPING
          </h4>
          <p className="text-gray-500 text-base tracking-tight">
            on all order over $100
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 group">
          <div className="p-6 rounded-full mb-6 bg-gradient-to-tr from-yellow-400 to-pink-500 text-white shadow-lg group-hover:scale-110 transition-transform">
            <HiOutlineCreditCard className="text-3xl" />
          </div>
          <h4 className="tracking-tight mb-2 text-lg font-bold text-gray-900">
            SECURE CHECKOUT
          </h4>
          <p className="text-gray-500 text-base tracking-tight">
            100% Secure Checkout Process
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
