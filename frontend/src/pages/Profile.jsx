import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart()); // Clear cart state on logout
    toast.info("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
    navigate("/login");
  };

  return (
    <div className="p-6 sm:p-10 min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="flex-grow container mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-pink-400 to-indigo-400 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-4xl font-bold text-white select-none">
                JD
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              {user?.name}
            </h1>
            <p className="text-base text-gray-500 mb-6">{user?.email}</p>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-5 py-2 rounded-full shadow-lg font-semibold text-base hover:scale-105 hover:from-red-600 hover:to-pink-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M18 15l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
              Logout
            </button>
          </div>
          {/* Right Section */}
          <div className="w-full md:h-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
