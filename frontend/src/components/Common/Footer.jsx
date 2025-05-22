import React from "react";
import { Link } from "react-router-dom";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram, IoLogoTwitter } from "react-icons/io";
import { FiPhoneCall } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 to-white border-t pt-16 pb-8 px-4 mt-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 px-4">
        {/* Newsletter */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Newsletter
          </h3>
          <p className="text-gray-500 mb-4 text-base">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-gray-800 mb-6 text-sm">
            Sign up and get 10% off your first order
          </p>
          <form action="" className="flex rounded-lg overflow-hidden shadow-lg">
            <input
              type="email"
              placeholder="Enter your Email"
              className="p-3 w-full text-sm border-none focus:outline-none focus:ring-2 focus:ring-rabbit-red transition-all bg-white"
              required
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-rabbit-red to-pink-500 text-white px-6 py-3 text-sm font-bold hover:from-pink-600 hover:to-rabbit-red transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Support Links */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Support
          </h3>
          <ul className="space-y-3 text-gray-600 text-base">
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Support
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Contact Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                About Us
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                FAQ
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* Shop Links */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Shop
          </h3>
          <ul className="space-y-3 text-gray-600 text-base">
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Men's Top Wear
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Women's Top Wear
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Men's Bottom Wear
              </Link>
            </li>
            <li>
              <Link className="hover:text-rabbit-red transition-colors" to="#">
                Women's Bottom Wear
              </Link>
            </li>
          </ul>
        </div>
        {/* Follow Us */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
            Follow Us
          </h3>
          <div className="flex items-center space-x-5 mb-8">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rabbit-red bg-white p-3 rounded-full shadow-lg transition-colors duration-200"
            >
              <TbBrandMeta className="h-6 w-6" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 bg-white p-3 rounded-full shadow-lg transition-colors duration-200"
            >
              <IoLogoInstagram className="h-6 w-6" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 bg-white p-3 rounded-full shadow-lg transition-colors duration-200"
            >
              <IoLogoTwitter className="h-6 w-6" />
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-700 font-semibold bg-white/80 rounded-lg px-4 py-2 shadow">
            <FiPhoneCall className="inline-block mr-2 text-rabbit-red" />
            <span>01234 567 890</span>
          </div>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
        <p className="text-center text-gray-500 text-base">
          ©2025, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
