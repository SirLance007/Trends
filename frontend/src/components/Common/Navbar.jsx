import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import { FaDog } from "react-icons/fa";
import { HiOutlineSearch } from "react-icons/hi";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import { GiClothes } from "react-icons/gi";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  // Show number of unique products in cart, not sum of quantities
  const cartItemCount = cart?.products?.length || 0;
  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [navDrawerOpen, setnavDrawerOpen] = useState(false);

  const toggleNavDrawer = () => {
    setnavDrawerOpen(!navDrawerOpen);
  };

  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <>
      <nav className="container mx-auto flex items-center justify-between py-5 px-6 bg-white/95 rounded-3xl shadow-2xl mt-4 mb-4 sticky top-4 z-50 backdrop-blur-xl border border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <GiClothes className="h-10 w-10 text-pink-500 animate-bounce" />
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-gradient drop-shadow-lg hover:scale-110 transition-transform duration-200"
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            TrendTrove
          </Link>
        </div>
        {/* Center - Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/collections/all?gender=Men" className="nav-link">
            Men
          </Link>
          <Link to="/collections/all?gender=Women" className="nav-link">
            Women
          </Link>
          <Link to="/collections/all?category=Top Wear" className="nav-link">
            Top Wear
          </Link>
          <Link to="/collections/all?category=Bottom Wear" className="nav-link">
            Bottom Wear
          </Link>
        </div>
        {/* Right-Icons */}
        <div className="flex items-center space-x-4">
          <Link to="/profile" className="icon-btn" title="Profile">
            <HiOutlineUser className="h-7 w-7" />
          </Link>
          <button
            onClick={toggleCartDrawer}
            className="icon-btn relative"
            title="Cart"
          >
            <HiOutlineShoppingBag className="h-7 w-7" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow-lg border-2 border-white animate-bounce">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Hide Search and Admin on mobile, show in nav drawer */}
          <div className="hidden md:block overflow-hidden max-w-[180px] md:max-w-xs rounded-full bg-gray-100 px-2 py-1 shadow-inner">
            <SearchBar />
          </div>
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="hidden md:inline px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-md hover:scale-110 hover:shadow-xl transition-all duration-200 animate-fade-in-up border-2 border-white"
              title="Admin Panel"
            >
              Admin
            </Link>
          )}
          <button
            onClick={toggleNavDrawer}
            className="md:hidden icon-btn"
            title="Menu"
          >
            <HiBars3BottomRight className="h-10 w-7" />
          </button>
        </div>
      </nav>
      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      {/* Mobile Navigation */}
      <div
        className={`fixed top-0 left-0 w-4/5 sm:w-1/2 md:w-1/3 h-full bg-white/95 shadow-2xl rounded-tr-3xl rounded-br-3xl transform transition-transform duration-300 z-50 border-r-2 border-pink-200 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleNavDrawer}
            className="icon-btn"
            title="Close Menu"
          >
            <IoMdClose className="h-7 w-7 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setShowMobileSearch(true)}
              className="icon-btn"
              title="Search"
            >
              <HiOutlineSearch className="h-7 w-7" />
            </button>
            <Link
              to="/admin"
              onClick={toggleNavDrawer}
              className="mobile-nav-link bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              style={{ fontWeight: 700 }}
            >
              Admin
            </Link>
          </div>
          <h2
            className="text-2xl font-bold mb-6 text-gradient tracking-tight"
            style={{
              background: "linear-gradient(90deg, #a855f7 0%, #ec4899 100%)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Menu
          </h2>
          <nav className="space-y-6">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNavDrawer}
              className="mobile-nav-link"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNavDrawer}
              className="mobile-nav-link"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawer}
              className="mobile-nav-link"
            >
              Top Wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawer}
              className="mobile-nav-link"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
      {/* Mobile SearchBar modal */}
      {showMobileSearch && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/30 z-[60] flex items-start justify-center"
          onClick={() => setShowMobileSearch(false)}
        >
          <div
            className="mt-24 w-11/12 max-w-md bg-white rounded-2xl shadow-2xl p-4 animate-fade-in-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <SearchBar autoFocus />
            <button
              className="absolute top-2 right-2 icon-btn"
              onClick={() => setShowMobileSearch(false)}
              title="Close"
            >
              <IoMdClose className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      )}
      {/* Custom Styles for nav-link and icon-btn */}
      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .nav-link {
          position: relative;
          padding: 0.5rem 1.2rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1rem;
          color: #6b7280;
          background: transparent;
          transition: all 0.2s;
        }
        .nav-link:hover, .nav-link.active {
          color: #ec4899;
          background: linear-gradient(90deg, #f3e8ff 0%, #fce7f3 100%);
          box-shadow: 0 2px 8px 0 #f3e8ff44;
          transform: scale(1.08);
        }
        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(90deg, #f3e8ff 0%, #fce7f3 100%);
          border-radius: 9999px;
          padding: 0.5rem;
          transition: all 0.2s;
        }
        .icon-btn:hover {
          background: linear-gradient(90deg, #a855f7 0%, #ec4899 100%);
          color: #fff;
          box-shadow: 0 2px 8px 0 #f3e8ff44;
          transform: scale(1.1);
        }
        .mobile-nav-link {
          display: block;
          padding: 0.75rem 1.5rem;
          border-radius: 9999px;
          font-weight: 600;
          font-size: 1.1rem;
          color: #6b7280;
          background: transparent;
          transition: all 0.2s;
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: #ec4899;
          background: linear-gradient(90deg, #f3e8ff 0%, #fce7f3 100%);
          box-shadow: 0 2px 8px 0 #f3e8ff44;
          transform: scale(1.08);
        }
      `}</style>
    </>
  );
};

export default Navbar;
