import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaBoxOpen,
  FaClipboardCheck,
  FaClipboardList,
  FaSignOutAlt,
  FaUser,
  FaStore,
  FaDog,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/cartSlice";
import { logout } from "../../redux/slices/authSlice";

const AdminSidebar = ({ onNav }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
    if (onNav) onNav();
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900 shadow-2xl rounded-r-3xl relative overflow-hidden animate-fade-in">
      {/* Animated SVG blob background */}
      <svg
        className="absolute -top-10 -left-10 w-40 h-40 opacity-20 blur-2xl animate-float-slow z-0"
        viewBox="0 0 200 200"
      >
        <circle fill="#60a5fa" cx="100" cy="100" r="100" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-32 h-32 opacity-10 blur-2xl animate-float-fast z-0"J
        viewBox="0 0 200 200"
      >
        <ellipse fill="#a5b4fc" cx="100" cy="100" rx="100" ry="80" />
      </svg>
      <div className="mb-6 relative z-10 flex items-center gap-2 justify-center">
        <span className="text-3xl animate-bounce text-pink-500">
          {/* Clothing icon SVG, matches dashboard */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="inline w-8 h-8 align-middle"
          >
            <path d="M12 2c-.55 0-1 .45-1 1v2.09c-1.39.36-2.4 1.61-2.4 3.09 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.48-1.01-2.73-2.4-3.09V3c0-.55-.45-1-1-1zm0 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-7 7.5c0-.28.22-.5.5-.5h2.09c.36-1.39 1.61-2.4 3.09-2.4 1.66 0 3 1.34 3 3 0 1.48-1.01 2.73-2.4 3.09V21c0 .55-.45 1-1 1s-1-.45-1-1v-5.91c-1.39-.36-2.4-1.61-2.4-3.09 0-1.66 1.34-3 3-3zm14 0c0-.28-.22-.5-.5-.5h-2.09c-.36-1.39-1.61-2.4-3.09-2.4-1.66 0-3 1.34-3 3 0 1.48 1.01 2.73 2.4 3.09V21c0 .55.45 1 1 1s1-.45 1-1v-5.91c1.39-.36 2.4-1.61 2.4-3.09 0-1.66-1.34-3-3-3z" />
          </svg>
        </span>
        <Link
          to="/admin"
          className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-400 drop-shadow-lg tracking-tight"
        >
          TrendTrove
        </Link>
      </div>
      <h2 className="text-xl font-bold mb-6 text-center text-emerald-200 tracking-wide relative z-10 animate-fade-in-up">
        Admin Dashboard
      </h2>
      <nav className="flex flex-col space-y-2 relative z-10">
        <NavLink
          to="/admin/users"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105"
              : "text-emerald-100 hover:bg-gradient-to-r hover:from-emerald-700 hover:to-teal-700 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up"
          }
        >
          <FaUser className="text-lg group-hover:animate-bounce" />
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/products"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-cyan-500 to-emerald-400 text-white shadow-lg scale-105"
              : "text-emerald-100 hover:bg-gradient-to-r hover:from-cyan-700 hover:to-emerald-700 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up delay-75"
          }
        >
          <FaBoxOpen className="text-lg group-hover:animate-bounce" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/admin/orders"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-yellow-400 to-emerald-400 text-white shadow-lg scale-105"
              : "text-emerald-100 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-emerald-700 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up delay-150"
          }
        >
          <FaClipboardList className="text-lg group-hover:animate-bounce" />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/"
          onClick={onNav}
          className={({ isActive }) =>
            (isActive
              ? "bg-gradient-to-r from-pink-400 to-emerald-400 text-white shadow-lg scale-105"
              : "text-emerald-100 hover:bg-gradient-to-r hover:from-pink-600 hover:to-emerald-700 hover:text-white") +
            " py-3 px-4 rounded-2xl flex items-center space-x-3 font-semibold transition-all duration-200 group animate-fade-in-up delay-200"
          }
        >
          <FaStore className="text-lg group-hover:animate-bounce" />
          <span>Shop</span>
        </NavLink>
        <div className="mt-6 animate-fade-in-up delay-300">
          <button
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-2xl flex items-center justify-center space-x-3 font-bold shadow-lg hover:scale-105 hover:shadow-red-400/60 transition-all group"
            onClick={handleLogout}
          >
            <FaSignOutAlt className="group-hover:animate-bounce" />
            <span>Logout</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;
