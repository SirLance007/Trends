import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import celebrationAnimation from "../assets/celebration.json";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slices/cartSlice";
import { getAllOrders } from "../redux/slices/orderSlice";

const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout);

    // Clear the cart whe the order is confirmed
    useEffect(() => {
        if (checkout && checkout._id) {
        dispatch(clearCart());
        localStorage.removeItem("cart");
        dispatch(getAllOrders()); // Refresh orders after confirmation
        } else {
        navigate("/my-order");
        }
    }, [checkout, dispatch, navigate]);

    const [showContent, setShowContent] = useState(false);
    const [showLottie, setShowLottie] = useState(true);

    useEffect(() => {
        setShowContent(false);
        setShowLottie(true);
        // Show Lottie for 2.5 seconds, then show main content
        const lottieTimeout = setTimeout(() => {
        setShowLottie(false);
        setShowContent(true);
        }, 2500);
        return () => clearTimeout(lottieTimeout);
    }, []);

    const calculateEstimateDelivery = (createAt) => {
        const orderDate = new Date(createAt);
        orderDate.setDate(orderDate.getDate() + 10); // Add 10 days to the order date
        return orderDate.toLocaleDateString();
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-white">
        {showLottie && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
            <div className="w-full h-full flex items-center justify-center">
                <Lottie
                animationData={celebrationAnimation}
                loop={false}
                style={{ width: "100vw", height: "100vh" }}
                />
            </div>
            </div>
        )}
        {showContent && (
            <div
            className={`max-w-4xl mx-auto p-6 bg-gradient-to-br from-emerald-50 to-white min-h-screen flex flex-col items-center animate-fade-in`}
            >
            <div
                className={`w-full bg-white/90 rounded-3xl shadow-2xl p-8 mt-10 ${
                showContent ? "animate-fade-in-up" : "opacity-0"
                } overflow-visible`}
            >
                <h1
                className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 drop-shadow-lg tracking-tight animate-bounce-in flex items-center justify-center gap-2"
                style={{
                    overflow: "visible",
                    paddingTop: "0.5em",
                    paddingBottom: "0.5em",
                }}
                >
                <span
                    className="inline-block animate-bounce"
                    style={{ fontSize: "1.5em", lineHeight: 1 }}
                >
                    🎉
                </span>
                Thank you for your Order!
                <span
                    className="inline-block animate-bounce"
                    style={{ fontSize: "1.5em", lineHeight: 1 }}
                >
                    🎉
                </span>
                </h1>
                {checkout && (
                <div className="rounded-2xl border border-emerald-100 bg-white/80 p-6 shadow-lg animate-fade-in-up delay-100">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                    {/* Order Id and Date */}
                    <div className="text-lg md:text-xl font-semibold text-emerald-700 bg-emerald-50 rounded-xl px-6 py-4 shadow-sm animate-fade-in-left">
                        <h2 className="mb-1">
                        Order Id:{" "}
                        <span className="font-mono text-emerald-900">
                            {checkout._id}
                        </span>
                        </h2>
                        <p className="text-gray-500 text-sm">
                        Order date:{" "}
                        {checkout.createdAt
                            ? new Date(checkout.createdAt).toLocaleDateString()
                            : ""}
                        </p>
                    </div>
                    {/* Estimate Delivery */}
                    <div className="bg-gradient-to-r from-emerald-200 to-teal-100 rounded-xl px-6 py-4 shadow animate-fade-in-right">
                        <p className="text-emerald-700 text-base font-bold flex items-center gap-2">
                        <span className="text-lg">🚚</span>
                        Estimated Delivery:{" "}
                        <span className="ml-1 text-emerald-900">
                            {checkout.createdAt
                            ? calculateEstimateDelivery(checkout.createdAt)
                            : ""}
                        </span>
                        </p>
                    </div>
                    </div>
                    {/* Ordered Items */}
                    <div className="mb-12">
                    <h3 className="text-2xl font-bold mb-6 text-emerald-800 tracking-tight animate-fade-in-up delay-200">
                        Order Summary
                    </h3>
                    <div className="divide-y divide-emerald-100">
                        {checkout.checkoutItems &&
                        checkout.checkoutItems.map((item, idx) => (
                            <div
                            key={item.productId}
                            className="py-6 flex items-center gap-6 animate-fade-in-up"
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
                                <p className="text-sm text-gray-500 mb-1">
                                {item.color} | {item.size}
                                </p>
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
                    {/* Payment and Delivery Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 animate-fade-in-up delay-300">
                    <div className="bg-emerald-50 rounded-xl p-6 shadow flex flex-col items-start">
                        <h4 className="text-lg font-semibold mb-2 text-emerald-800 flex items-center gap-2">
                        <span>💳</span> Payment
                        </h4>
                        <p className="text-gray-700 font-medium">PayPal</p>
                    </div>
                    <div className="bg-emerald-50 rounded-xl p-6 shadow flex flex-col items-start">
                        <h4 className="text-lg font-semibold mb-2 text-emerald-800 flex items-center gap-2">
                        <span>📦</span> Delivery
                        </h4>
                        <p className="text-gray-700 font-medium">
                        {checkout.shippingAddress &&
                            checkout.shippingAddress.address}
                        </p>
                        <p className="text-gray-700 font-medium">
                        {checkout.shippingAddress &&
                            checkout.shippingAddress.city}
                        ,{" "}
                        {checkout.shippingAddress &&
                            checkout.shippingAddress.country}
                        </p>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </div>
        )}
        </div>
    );
};

export default OrderConfirmation;
