import React, { use, useEffect } from "react";
import { useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductDetails = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImage, setmainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const location = useLocation();

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images && selectedProduct.images.length > 0) {
      setmainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (action) => {
    if (action === "plus") {
      setQuantity((prev) => prev + 1);
    }
    if (action === "minus") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart successfully.", {
          duration: 1000,
        });
      })
      .finally(() => setIsButtonDisabled(false));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-lg text-gray-500">
          Loading product details...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[40vh]">
        <span className="text-lg text-red-500">Error: {error}</span>
      </div>
    );
  }

  if (!selectedProduct) {
    return null; // Don't render anything until product is loaded or errored
  }

  return (
    <div className="sm:p-4 md:p-8 lg:py-10 lg:px-0 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen animate-fade-in">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-3xl shadow-xl animate-fade-in-up">
        {(location.pathname === "/" || location.pathname === "/home") && (
          <h2
            className="mt-10 text-4xl md:text-5xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 drop-shadow-lg tracking-tight uppercase flex items-center justify-center gap-4 animate-bounce-in"
            style={{
              overflow: "visible",
              paddingTop: "0.5em",
              paddingBottom: "0.5em",
            }}
          >
            <span
              className="inline-block animate-bounce"
              style={{ fontSize: "1.4em", lineHeight: 1 }}
            >
              🔥
            </span>
            Best Seller
            <span
              className="inline-block animate-bounce"
              style={{ fontSize: "1.4em", lineHeight: 1 }}
            >
              🔥
            </span>
          </h2>
        )}
        <div className="flex flex-col md:flex-row gap-10 items-start animate-fade-in-up delay-100">
          {/* Left Thumbnails */}
          <div className="hidden md:flex flex-col space-y-4 mr-6 justify-center h-full min-h-[28rem] animate-fade-in-left delay-200">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 shadow-sm hover:scale-110 hover:shadow-lg ${
                  mainImage === image.url
                    ? "border-black scale-110"
                    : "border-gray-200"
                }`}
                onClick={() => setmainImage(image.url)}
              />
            ))}
          </div>
          {/* Main Image */}
          <div className="md:w-1/2 flex flex-col items-center justify-center h-full min-h-[28rem] animate-fade-in-up delay-300">
            <div className="mb-4 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-lg relative bg-gray-100 flex items-center justify-center group">
              <img
                src={mainImage}
                alt="Main Product"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:rotate-1"
              />
              <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide animate-fade-in-down delay-500">
                Featured
              </span>
            </div>
          </div>
          {/* Mobile Thumbnail */}
          <div className="md:hidden flex overflow-x-auto space-x-4 mb-4 pb-2 animate-fade-in-left delay-200">
            {selectedProduct.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.alt}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 shadow-sm hover:scale-110 hover:shadow-lg ${
                  mainImage === image.url
                    ? "border-black scale-110"
                    : "border-gray-200"
                }`}
                onClick={() => setmainImage(image.url)}
              />
            ))}
          </div>
          {/* Right Side  */}
          <div className="md:w-1/2 md:ml-10 flex flex-col justify-center animate-fade-in-right delay-300">
            <h1 className="text-3xl font-extrabold mb-2 text-gray-900 tracking-tight animate-fade-in-up delay-400">
              {selectedProduct.name}
            </h1>
            <div className="flex items-center gap-3 mb-2 animate-fade-in-up delay-500">
              {selectedProduct.discountPrice &&
              selectedProduct.discountPrice < selectedProduct.price ? (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    ${selectedProduct.price}
                  </span>
                  <span className="text-2xl text-pink-600 font-bold">
                    ${selectedProduct.discountPrice}
                  </span>
                </>
              ) : (
                <span className="text-2xl text-pink-600 font-bold">
                  ${selectedProduct.price}
                </span>
              )}
            </div>
            <p className="text-gray-600 mb-6 text-base leading-relaxed animate-fade-in-up delay-600">
              {selectedProduct.description}
            </p>
            <div className="mb-6 animate-fade-in-up delay-700">
              <p className="text-gray-700 font-semibold mb-1">Color :</p>
              <div className="flex gap-3 mt-2">
                {selectedProduct.colors.map((color, index) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 shadow-sm cursor-pointer transition-all duration-200 ${
                      selectedColor === color
                        ? "border-black ring-2 ring-black scale-110"
                        : "border-gray-300"
                    }`}
                    style={{
                      backgroundColor: color.toLocaleLowerCase(),
                      filter: "brightness(0.8)",
                    }}
                    onClick={() => setSelectedColor(color)}
                  ></button>
                ))}
              </div>
            </div>
            <div className="mb-6 animate-fade-in-up delay-800">
              <p className="text-gray-700 font-semibold mb-1">Size :</p>
              <div className="flex gap-3 mt-2">
                {selectedProduct.sizes.map((size) => (
                  <button
                    onClick={() => setSelectedSize(size)}
                    key={size}
                    className={`rounded-lg border-2 px-5 py-2 font-semibold text-sm transition-all duration-200 shadow-sm ${
                      selectedSize === size
                        ? "bg-black text-white border-black scale-110"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className="mb-8 animate-fade-in-up delay-900">
              <p className="text-gray-700 font-semibold mb-1">Quantity</p>
              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleQuantityChange("minus")}
                  className="px-3 py-1.5 bg-gray-200 border rounded-lg text-lg font-bold hover:bg-gray-300 transition-all"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange("plus")}
                  className="px-3 py-1.5 border bg-gray-200 rounded-lg text-lg font-bold hover:bg-gray-300 transition-all"
                >
                  +
                </button>
              </div>
            </div>
            <button
              disabled={isButtonDisabled}
              onClick={handleAddToCart}
              className={`bg-gradient-to-r from-black to-gray-800 text-white py-3 px-8 rounded-xl w-full mb-4 font-bold text-lg shadow-lg transition-all duration-200 animate-fade-in-up delay-1000 ${
                isButtonDisabled
                  ? "cursor-not-allowed opacity-50"
                  : "hover:from-gray-900 hover:to-black hover:scale-105"
              }`}
            >
              {isButtonDisabled ? "Adding..." : "ADD TO CART"}
            </button>
            <div className="mt-10 text-gray-600 animate-fade-in-up delay-1100">
              <h3 className="text-xl font-bold mb-4">Characteristics :</h3>
              <table className="w-full text-left text-sm text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-1 font-semibold">Brand</td>
                    <td className="py-2">{selectedProduct.brand}</td>
                  </tr>
                  <tr>
                    <td className="py-1 font-semibold">Material</td>
                    <td className="py-2">{selectedProduct.material}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-20 animate-fade-in-up delay-1200">
          <h2 className="text-2xl text-center font-bold mb-8 text-gray-900 tracking-tight animate-fade-in-up delay-1300">
            You may also like
          </h2>
          <ProductGrid
            products={similarProducts}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
