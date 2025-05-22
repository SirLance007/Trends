import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";

const TopBar = () => {
  return (
    <div className="text-white bg-gradient-to-r from-[#e53935] via-[#e35d5b] to-[#e53935]">
      <div className="container mx-auto flex justify-between items-center py-3 px-4 relative">
        {/* Social Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#"
            className="hover:text-yellow-200 transition-colors duration-200"
          >
            <TbBrandMeta className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-pink-200 transition-colors duration-200"
          >
            <IoLogoInstagram className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="hover:text-blue-200 transition-colors duration-200"
          >
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        {/* Announcement */}
        <div className="text-sm text-center flex-grow font-semibold tracking-wide drop-shadow-lg">
          <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm shadow-md animate-pulse">
            🚚 We Ship world wide — Faster & Reliable Shipping
          </span>
        </div>
        {/* Contact */}
        <div className="text-sm hidden md:block font-medium">
          <a
            href="tel:+918005665228"
            className="hover:text-yellow-200 transition-colors duration-200"
          >
            <span className="inline-block bg-white/10 px-3 py-1 rounded-full">
              +91 8005665228
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
