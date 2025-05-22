import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-green-50 to-white">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Content */}
        <div className="lg:w-1/2 p-10 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
          <h2 className="text-lg font-semibold mb-2 text-green-600 tracking-wider uppercase">
            Comfort with Style
          </h2>
          <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 text-gray-900 leading-tight drop-shadow-lg">
            Apparel made for everyday life
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl">
            Discover our latest collection of apparel designed for comfort and
            style. Perfect for any occasion, our pieces are made with
            high-quality materials to ensure a perfect fit and feel.
          </p>
          <Link
            to="/collections/all"
            className="inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-200"
          >
            Shop Now
          </Link>
        </div>
        {/* Right Content */}
        <div className="lg:w-1/2 flex items-center justify-center h-full p-6">
          <div className="w-full h-full rounded-3xl overflow-hidden shadow-xl">
            <img
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-3xl scale-100 hover:scale-105 transition-transform duration-500"
              src={featured}
              alt="Featured Collection"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;
