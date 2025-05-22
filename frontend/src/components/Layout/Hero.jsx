import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[400px] md:min-h-[600px] lg:min-h-[780px] flex items-center justify-center overflow-hidden">
      <img
        src={heroImg}
        alt="Rabbit"
        className="w-full h-[400px] md:h-[600px] lg:h-[780px] object-cover scale-105 brightness-90 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/10 flex items-center justify-center">
        <div className="text-center text-white p-8 md:p-16">
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase mb-6 drop-shadow-xl animate-fade-in">
            Vacation
          </h1>
          <p className="text-base md:text-2xl mb-8 font-medium tracking-tight text-white/90 max-w-2xl mx-auto animate-fade-in delay-100">
            Explore our vacation outfits with our fast world wide shipping
          </p>
          <Link
            to="#"
            className="inline-block bg-gradient-to-r from-white to-gray-200 text-gray-900 px-10 py-4 rounded-full text-xl font-bold shadow-lg hover:from-pink-200 hover:to-yellow-100 hover:scale-105 transition-all duration-200 animate-fade-in delay-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
