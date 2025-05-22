import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../redux/slices/orderSlice";

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Use a fallback to avoid destructuring undefined
  const { orders, loading, error } = useSelector(
    (state) => state.order || { orders: [], loading: false, error: null }
  );

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 tracking-tight flex items-center gap-2">
        <span className="inline-block w-2 h-2 bg-black rounded-full"></span> My
        Orders
      </h2>
      <div className="relative rounded-2xl shadow-lg sm:rounded-2xl overflow-hidden bg-white">
        <div className="no-scrollbar overflow-x-auto w-full">
          <table className="min-w-full text-left text-gray-700 text-sm sm:text-base">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
              <tr>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Order Id</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4">Shipping Address</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    onClick={() => handleRowClick(order._id)}
                    key={order._id}
                    className="border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer group"
                  >
                    <td className="py-3 px-4">
                      <img
                        className="w-12 h-12 object-cover rounded-lg border-2 border-gray-200 group-hover:border-black transition"
                        src={
                          order.orderItems &&
                          order.orderItems[0] &&
                          order.orderItems[0].image
                        }
                        alt=""
                      />
                    </td>
                    <td className="font-semibold text-gray-900 whitespace-nowrap py-3 px-4">
                      #{order._id}
                    </td>
                    <td className="py-3 px-4">
                      <span className="block text-gray-800 font-medium">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : ""}
                      </span>
                      <span className="block text-xs text-gray-400">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleTimeString()
                          : ""}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="block font-medium text-gray-800">
                        {order.shippingAddress && order.shippingAddress.city}
                      </span>
                      <span className="block text-xs text-gray-400">
                        {order.shippingAddress && order.shippingAddress.country}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                        {order.orderItems ? order.orderItems.length : 0}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-gray-900">
                      ${order.totalPrice}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`${
                          order.isPaid
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        } px-3 py-1 rounded-full text-xs sm:text-sm font-bold border border-opacity-30 border-green-400`}
                      >
                        {order.isPaid ? "Paid" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td colSpan="7" className="py-8 text-center">
                    <p className="text-gray-400 text-lg">No orders found.</p>
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

export default MyOrdersPage;
