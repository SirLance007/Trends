import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchOrderDetails } from "../redux/slices/orderSlice";

const OrderDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { orderDetails, loading, error } = useSelector((state) => state.order);

    useEffect(() => {
        if (id) {
        dispatch(fetchOrderDetails(id));
        }
    }, [dispatch, id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error}</p>;

    // Add a refresh button to manually refetch order details
    const handleRefresh = () => {
        dispatch(fetchOrderDetails(id));
    };

    return (
        <div className="max-w-5xl mx-auto p-4 sm:p-8 min-h-screen bg-gradient-to-br from-emerald-50 to-white animate-fade-in">
        <div className="bg-white/90 rounded-3xl shadow-2xl p-8">
            <button
            onClick={() => navigate("/my-orders")}
            className="mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 text-white font-bold shadow-lg transition-all duration-200 animate-fade-in-up hover:scale-105 hover:shadow-2xl hover:-translate-y-1"
            >
            ← Back to My Orders
            </button>
            <button
            onClick={handleRefresh}
            className="mb-8 ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
            >
            Refresh Status
            </button>
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 drop-shadow-lg tracking-tight animate-bounce-in">
            Order Details
            </h2>
            {orderDetails && (
            <>
                {/* Order Info */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="bg-emerald-50 rounded-xl px-6 py-4 shadow-sm text-lg md:text-xl font-semibold text-emerald-700 animate-fade-in-left hover:scale-105 hover:shadow-xl hover:bg-emerald-100 transition-all duration-200">
                    <div className="mb-1">
                    Order Id:{" "}
                    <span className="font-mono text-emerald-900">
                        {orderDetails._id}
                    </span>
                    </div>
                    <div className="text-gray-500 text-sm">
                    Order date:{" "}
                    {orderDetails.createdAt
                        ? new Date(orderDetails.createdAt).toLocaleDateString()
                        : ""}
                    </div>
                    <div className="mt-2 flex gap-3">
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                        orderDetails.isPaid
                            ? "bg-emerald-200 text-emerald-800"
                            : "bg-red-200 text-red-800"
                        }`}
                    >
                        {orderDetails.isPaid ? "Paid" : "Not Paid"}
                    </span>
                    <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                        orderDetails.status === "Delivered"
                            ? "bg-emerald-200 text-emerald-800"
                            : orderDetails.status === "Cancelled"
                            ? "bg-red-200 text-red-800"
                            : orderDetails.status === "Shipped"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                    >
                        {orderDetails.status}
                    </span>
                    </div>
                </div>
                <div className="bg-gradient-to-r from-emerald-200 to-teal-100 rounded-xl px-6 py-4 shadow animate-fade-in-right hover:scale-105 hover:shadow-xl transition-all duration-200">
                    <div className="text-emerald-700 text-base font-bold flex items-center gap-2">
                    <span className="text-lg">🚚</span>
                    Shipping: {" Delivery"}
                    <span className="ml-1 text-emerald-900">
                        {orderDetails.shippingMethod}
                    </span>
                    </div>
                    <div className="text-emerald-700 text-base font-bold flex items-center gap-2 mt-2">
                    <span className="text-lg">💳</span>
                    Payment:{" "}
                    <span className="ml-1 text-emerald-900">
                        {orderDetails.paymentMethod}
                    </span>
                    </div>
                </div>
                </div>
                {/* Shipping Address */}
                <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
                <div className="bg-emerald-50 rounded-xl p-6 shadow flex flex-col items-start hover:scale-105 hover:shadow-xl transition-all duration-200">
                    <h4 className="text-lg font-semibold mb-2 text-emerald-800 flex items-center gap-2">
                    <span>📦</span> Shipping Address
                    </h4>
                    <p className="text-gray-700 font-medium">
                    {orderDetails.shippingAddress.address || "N/A"}
                    </p>
                    <p className="text-gray-700 font-medium">
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.country ||
                        orderDetails.shippingAddress.coutry}
                    </p>
                </div>
                </div>
                {/* Order Items */}
                <div className="mb-12 animate-fade-in-up delay-200">
                <h3 className="text-2xl font-bold mb-6 text-emerald-800 tracking-tight">
                    Items
                </h3>
                <div className="divide-y divide-emerald-100">
                    {orderDetails.orderItems.map((item, idx) => (
                    <div
                        key={item.productId + idx}
                        className="py-6 flex items-center gap-6 animate-fade-in-up hover:bg-emerald-50 hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
                        style={{ animationDelay: `${100 + idx * 60}ms` }}
                    >
                        <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-2xl shadow-md border-2 border-emerald-100 bg-white"
                        />
                        <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.name}
                        </h4>
                        <div className="flex items-center gap-2">
                            <span className="inline-block bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold">
                            Qty: {item.quantity}
                            </span>
                        </div>
                        </div>
                        <div className="text-right min-w-[80px]">
                        <p className="text-lg font-bold text-emerald-700">
                            ${item.price}
                        </p>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </>
            )}
        </div>
        </div>
    );
};

export default OrderDetailsPage;
