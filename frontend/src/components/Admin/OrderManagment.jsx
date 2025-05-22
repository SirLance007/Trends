import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../../redux/slices/adminOrderSlice";

const OrderManagment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);
  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-6 min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-fuchsia-100 to-cyan-100 rounded-3xl shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Animated SVG background blobs */}
      <svg
        className="absolute -top-24 -left-24 w-60 h-60 sm:w-96 sm:h-96 opacity-25 blur-3xl animate-float-slow z-0"
        viewBox="0 0 200 200"
      >
        <circle fill="#60a5fa" cx="100" cy="100" r="100" />
      </svg>
      <svg
        className="absolute bottom-0 right-0 w-40 h-40 sm:w-72 sm:h-72 opacity-15 blur-3xl animate-float-fast z-0"
        viewBox="0 0 200 200"
      >
        <ellipse fill="#a5b4fc" cx="100" cy="100" rx="100" ry="80" />
      </svg>
      <h2 className="text-2xl sm:text-4xl font-extrabold text-center mb-6 sm:mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-fuchsia-500 to-cyan-500 drop-shadow-xl tracking-tight flex items-center justify-center gap-2 sm:gap-4 relative z-10 animate-fade-in-up">
        <span className="inline-block animate-bounce text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="1.5em"
            height="1.5em"
            className="sm:w-8 sm:h-8"
          >
            <path d="M3 6a2 2 0 0 1 2-2h2V3a1 1 0 1 1 2 0v1h4V3a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v2H3zm18 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zm-7 3a1 1 0 0 0-2 0v2a1 1 0 0 0 2 0z" />
          </svg>
        </span>
        <span className="animate-gradient-x">Order Management</span>
      </h2>
      <div className="w-full overflow-x-auto shadow-2xl rounded-2xl sm:rounded-3xl bg-white/90 backdrop-blur-lg p-2 sm:p-8 relative z-10 animate-fade-in-up border border-blue-100">
        <table className="text-left text-gray-700 min-w-[600px] w-full text-xs sm:text-base">
          <thead className="bg-gradient-to-r from-blue-200 via-fuchsia-100 to-cyan-100 text-xs uppercase text-blue-700 rounded-2xl">
            <tr>
              <th className="py-2 px-2 sm:py-4 sm:px-6 rounded-tl-2xl">
                Order ID
              </th>
              <th className="py-2 px-2 sm:py-4 sm:px-6">Customer</th>
              <th className="py-2 px-2 sm:py-4 sm:px-6">Total Price</th>
              <th className="py-2 px-2 sm:py-4 sm:px-6">Status</th>
              <th className="py-2 px-2 sm:py-4 sm:px-6 rounded-tr-2xl">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-fuchsia-50 cursor-pointer transition-all duration-200 group animate-fade-in-up"
                >
                  <td className="py-2 px-2 sm:py-4 sm:px-6 font-extrabold text-blue-900 whitespace-nowrap group-hover:scale-105 transition-transform text-base sm:text-lg flex items-center gap-1 sm:gap-2">
                    <span className="inline-block animate-pop text-blue-400">
                      #
                    </span>
                    {order._id}
                  </td>
                  <td className="p-2 sm:p-4 font-semibold text-fuchsia-700 group-hover:text-fuchsia-500 transition-colors text-xs sm:text-base">
                    {order.user && order.user.name
                      ? order.user.name
                      : "Unknown"}
                  </td>
                  <td className="p-2 sm:p-4 font-semibold text-cyan-700 group-hover:text-cyan-500 transition-colors text-xs sm:text-base">
                    <span className="inline-flex items-center gap-1">
                      $<span className="inline-block">{order.totalPrice}</span>
                    </span>
                  </td>
                  <td className="p-2 sm:p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="bg-white/90 border border-blue-200 text-blue-900 text-xs sm:text-sm rounded-xl focus:ring-fuchsia-400 focus:border-fuchsia-400 block p-1.5 sm:p-2.5 shadow-inner transition-all duration-200 outline-none group-hover:scale-105 font-semibold"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-2 sm:p-4">
                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-1.5 sm:py-2 font-bold shadow-xl transition-all duration-200 animate-pop flex items-center gap-1 sm:gap-2 border border-green-200 group-hover:scale-105 text-xs sm:text-base"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-8 text-gray-500 animate-fade-in-up text-base sm:text-lg font-semibold"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagment;
