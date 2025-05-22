import React from "react";
import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="sm:mx-0 md:mx-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => {
        // Defensive: handle both product.image.url and product.images[0]?.url
        const imageUrl = product.image?.url || product.images?.[0]?.url || "";
        const imageAlt =
          product.image?.alt || product.images?.[0]?.alt || product.name || "";
        return (
          <Link
            to={`/product/${product.id || product._id}`}
            key={index}
            className="group"
          >
            <div className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col h-full border border-transparent group-hover:border-black/10">
              <div className="w-full aspect-[4/5] mb-4 overflow-hidden rounded-xl relative">
                <img
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                  src={imageUrl}
                  alt={imageAlt}
                />
                <span className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                  View
                </span>
              </div>
              <h3
                className="mb-1 text-base font-semibold text-gray-900 truncate"
                title={product.name}
              >
                {product.name}
              </h3>
              <p className="text-gray-500 font-medium text-sm tracking-tighter mb-2">
                {product.discountPrice &&
                product.discountPrice < product.price ? (
                  <>
                    <span className="text-gray-400 line-through mr-2">
                      ${product.price}
                    </span>
                    <span className="text-pink-600 font-bold">
                      ${product.discountPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-pink-600 font-bold">
                    ${product.price}
                  </span>
                )}
              </p>
              <button className="mt-auto w-full bg-black text-white py-2 rounded-lg font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                View Details
              </button>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductGrid;
