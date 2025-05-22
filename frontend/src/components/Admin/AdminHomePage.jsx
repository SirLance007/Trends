import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/slices/adminProductSlice";
import { fetchAllOrders } from "../../redux/slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);

  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="relative max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 overflow-hidden animate-fade-in">
      {/* Animated SVG blobs for background */}
      <svg
        className="absolute top-0 left-0 w-72 h-72 opacity-30 blur-2xl animate-float-slow z-0"
        viewBox="0 0 200 200"
      >
        <circle fill="#6ee7b7" cx="100" cy="100" r="100" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-60 h-60 opacity-20 blur-2xl animate-float-slower z-0"
        viewBox="0 0 200 200"
      >
        <ellipse fill="#a7f3d0" cx="100" cy="100" rx="100" ry="80" />
      </svg>
      <svg
        className="absolute top-1/2 left-1/2 w-40 h-40 opacity-20 blur-2xl animate-float-fast z-0"
        style={{ transform: "translate(-50%,-50%)" }}
        viewBox="0 0 200 200"
      >
        <circle fill="#99f6e4" cx="100" cy="100" r="100" />
      </svg>
      <h1 className="relative z-10 text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 drop-shadow-lg tracking-tight animate-bounce-in flex items-center justify-center gap-3">
        {productsLoading || ordersLoading ? (
          <p>Loading...</p>
        ) : productsError ? (
          <p className="text-red-500">
            Error fetching the products: {productsError}
          </p>
        ) : ordersError ? (
          <p className="text-red-500">
            Error fetching the orders: {ordersError}
          </p>
        ) : (
          <>
            <span className="animate-wiggle">🛒</span> Admin Dashboard{" "}
            <span className="animate-wiggle">✨</span>
          </>
        )}
      </h1>
      {/* Dashboard Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {/* Revenue Card */}
        <div className="group p-6 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md border border-emerald-200 flex flex-col items-center hover:scale-[1.07] hover:shadow-emerald-200/60 hover:-rotate-1 transition-all duration-300 animate-fade-in-up">
          <div className="text-4xl mb-2 animate-bounce">💰</div>
          <h2 className="text-xl font-bold text-emerald-700 mb-2 animate-fade-in-up delay-100">
            Revenue
          </h2>
          <p className="text-3xl font-extrabold text-emerald-600 mb-1 animate-bounce-in delay-200">
            {totalSales.toFixed(2)}
          </p>
          <Link
            to="/admin/orders"
            className="mt-2 text-emerald-500 font-semibold hover:underline hover:text-emerald-700 transition-colors duration-200 animate-fade-in-up delay-400"
          >
            Manage Revenue
          </Link>
        </div>
        {/* Orders Card */}
        <div className="group p-6 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md border border-teal-200 flex flex-col items-center hover:scale-[1.07] hover:shadow-teal-200/60 hover:rotate-1 transition-all duration-300 animate-fade-in-up delay-100">
          <div className="text-4xl mb-2 animate-bounce">📦</div>
          <h2 className="text-xl font-bold text-emerald-700 mb-2 animate-fade-in-up delay-200">
            Total Orders
          </h2>
          <p className="text-3xl font-extrabold text-emerald-600 mb-1 animate-bounce-in delay-300">
            {totalOrders}
          </p>
          <Link
            to="/admin/orders"
            className="mt-2 text-emerald-500 font-semibold hover:underline hover:text-emerald-700 transition-colors duration-200 animate-fade-in-up delay-400"
          >
            Manage Orders
          </Link>
        </div>
        {/* Products Card */}
        <div className="group p-6 rounded-3xl shadow-2xl bg-white/60 backdrop-blur-md border border-cyan-200 flex flex-col items-center hover:scale-[1.07] hover:shadow-cyan-200/60 hover:-rotate-2 transition-all duration-300 animate-fade-in-up delay-200">
          <div className="text-4xl mb-2 animate-bounce">🛍️</div>
          <h2 className="text-xl font-bold text-emerald-700 mb-2 animate-fade-in-up delay-300">
            Total Products
          </h2>
          <p className="text-3xl font-extrabold text-emerald-600 mb-1 animate-bounce-in delay-400">
            {products.length}
          </p>
          <Link
            to="/admin/products"
            className="mt-2 text-emerald-500 font-semibold hover:underline hover:text-emerald-700 transition-colors duration-200 animate-fade-in-up delay-500"
          >
            Manage Products
          </Link>
        </div>
      </div>
      {/* Orders & Products Buttons */}
      <div className="relative z-20 flex flex-wrap gap-6 justify-center mb-10 animate-fade-in-up delay-300">
        <Link
          to="/admin/orders"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-emerald-300/70 transition-all animate-glow-fab"
        >
          <span className="text-xl">📦</span> View All Orders
        </Link>
        <Link
          to="/admin/products"
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 text-white font-bold shadow-lg hover:scale-105 hover:shadow-cyan-300/70 transition-all animate-glow-fab"
        >
          <span className="text-xl">🛍️</span> View All Products
        </Link>
      </div>
      {/* Floating Action Button */}
      <Link
        to="/admin/products"
        className="fixed bottom-10 right-10 z-30 bg-gradient-to-br from-emerald-400 to-teal-400 text-white rounded-full shadow-2xl p-5 flex items-center gap-2 text-lg font-bold hover:scale-110 hover:shadow-emerald-300/70 transition-all animate-glow-fab"
      >
        <span className="text-2xl animate-bounce">➕</span> Add Product
      </Link>
      {/* Recent Orders Table */}
      <div className="relative z-10 mt-10 bg-white/90 rounded-2xl shadow-xl p-8 animate-fade-in-up delay-300">
        <h2 className="text-2xl font-bold mb-6 text-emerald-800 tracking-tight animate-fade-in-up delay-400 flex items-center gap-2">
          <span className="text-xl animate-pop">📝</span> Recent Orders
          <span className="ml-2 px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold animate-pulse">
            NEW
          </span>
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-gray-700">
            <thead className="sticky top-0 bg-emerald-50/90 text-lg uppercase text-emerald-700 animate-fade-in-up delay-500">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Total Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, idx) => (
                  <tr
                    key={order._id + idx}
                    className="border-b hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 cursor-pointer transition-all animate-fade-in-up"
                    style={{ animationDelay: `${600 + idx * 60}ms` }}
                  >
                    <td className="p-4 font-mono text-emerald-900 font-bold">
                      {order._id}
                    </td>
                    <td className="p-4">
                      {order.user && order.user.name
                        ? order.user.name
                        : "Unknown"}
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      ${order.totalPrice}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 animate-pulse">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-500">
                    No Recent Orders Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
