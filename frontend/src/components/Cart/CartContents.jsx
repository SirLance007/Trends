import React from "react";
import { Ri24HoursLine } from "react-icons/ri";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";
import { toast } from "react-toastify";

// Remove cart from props to avoid naming conflict
const CartContents = ({ cartData, userId, guestId }) => {
  const dispach = useDispatch();

  // Handle adding or subtracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispach(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      )
        .then(() => {
          toast.success(
            `Quantity updated: ${color} / ${size} (${newQuantity})`,
            { position: "top-right", autoClose: 1200 }
          );
        })
        .catch(() => {
          toast.error("Failed to update cart item.", {
            position: "top-right",
            autoClose: 1200,
          });
        });
    } else if (newQuantity === 0) {
      dispach(
        removeFromCart({
          productId,
          guestId,
          userId,
          size,
          color,
        })
      )
        .then(() => {
          toast.info("Item removed from cart.", {
            position: "top-right",
            autoClose: 1200,
          });
        })
        .catch(() => {
          toast.error("Failed to remove item from cart.", {
            position: "top-right",
            autoClose: 1200,
          });
        });
    }
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispach(
      removeFromCart({
        productId,
        guestId,
        userId,
        size,
        color,
      })
    )
      .then(() => {
        toast.info("Item removed from cart.", {
          position: "top-right",
          autoClose: 1200,
        });
      })
      .catch(() => {
        toast.error("Failed to remove item from cart.", {
          position: "top-right",
          autoClose: 1200,
        });
      });
  };

  // Use the correct cart state from Redux
  const productsToShow = Array.isArray(cartData?.products)
    ? cartData.products
    : [];

  // Defensive: always use product.productId for cart operations
  const getProductId = (product) => product.productId || product._id;

  return (
    <div className="divide-y divide-gray-200">
      {productsToShow.map((product, index) => (
        <div
          key={product._id || index}
          className="flex flex-start justify-between py-6 group hover:bg-gray-50 transition-all duration-200"
        >
          <div className="flex items-start gap-4">
            <img
              className="w-20 h-24 object-cover rounded-xl shadow-md border border-gray-200"
              src={product.image}
              alt={product.name}
            />
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Size:{" "}
                <span className="font-medium text-gray-700">
                  {product.size}
                </span>{" "}
                | Color:{" "}
                <span className="font-medium text-gray-700 capitalize">
                  {product.color}
                </span>
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      getProductId(product),
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded-lg px-3 py-1 text-xl font-bold text-gray-700 bg-white hover:bg-gray-100 transition-all shadow-sm"
                >
                  -
                </button>
                <span className="mx-2 text-base font-semibold text-gray-800">
                  {product.quantity}
                </span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      getProductId(product),
                      1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded-lg px-3 py-1 text-xl font-bold text-gray-700 bg-white hover:bg-gray-100 transition-all shadow-sm"
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between min-w-[70px]">
            <p className="font-bold text-lg text-gray-900">
              ${product.price.toLocaleString()}
            </p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  getProductId(product),
                  product.size,
                  product.color
                )
              }
              className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity"
            >
              <RiDeleteBin3Line className="h-6 w-6 text-red-500 hover:text-red-700 transition-colors" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartContents;
