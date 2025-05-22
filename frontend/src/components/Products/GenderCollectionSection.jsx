import React from "react";
import mensCollection from "../../assets/mens-collection.webp";
import womensCollection from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="container mx-auto flex flex-col md:flex-row gap-10">
        {/* Women's Collection */}
        <div className="relative flex-1 group rounded-3xl overflow-hidden shadow-xl">
          <img
            className="rounded-3xl w-full h-[500px] md:h-[700px] object-cover group-hover:scale-105 transition-transform duration-500"
            src={womensCollection}
            alt="Mens Picture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
          <div className="absolute bottom-10 left-10 z-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Women's Collection
            </h2>
            <Link
              className="inline-block bg-white/90 hover:bg-white text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg text-lg transition-all duration-200"
              to="/collections/all?gender=Women"
            >
              Shop Now
            </Link>
          </div>
        </div>
        {/* Men's Collection */}
        <div className="relative flex-1 group rounded-3xl overflow-hidden shadow-xl">
          <img
            className="rounded-3xl w-full h-[500px] md:h-[700px] object-cover group-hover:scale-105 transition-transform duration-500"
            src={mensCollection}
            alt="Womens Picture"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />
          <div className="absolute bottom-10 left-10 z-20">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-lg">
              Men's Collection
            </h2>
            <Link
              className="inline-block bg-white/90 hover:bg-white text-gray-900 font-semibold px-6 py-2 rounded-full shadow-lg text-lg transition-all duration-200"
              to="/collections/all?gender=Men"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
