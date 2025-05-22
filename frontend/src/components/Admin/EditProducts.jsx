import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { toast } from "react-toastify";

const EditProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    category: "",
    sku: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [
      { url: "https://picsum.photos/150?random=1" },
      { url: "https://picsum.photos/150?random=2" },
      { url: "https://picsum.photos/150?random=3" },
    ],
  });

  const [uploading, setUploading] = useState(false);
  const [replaceIndex, setReplaceIndex] = useState(null);
  const fileInputRef = React.useRef();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      // Prepare product data for update (ensure images is an array of objects with url and altText)
      const updatedProductData = {
        ...productData,
        images: productData.images.map((img) => ({
          url: img.url,
          altText: img.altText || "",
        })),
      };
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        updatedProductData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      toast.error("Failed to update product.");
    }
  };

  const handleImageChange = async (e, index = null) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const imageUrl = data.imageUrl || data.url; // Use imageUrl if present, fallback to url
      if (!imageUrl) {
        toast.error(
          "Image upload failed: No URL returned from backend. Check backend upload route and Cloudinary config."
        );
        return;
      }
      setProductData((prevData) => {
        let newImages;
        if (index !== null) {
          newImages = [...prevData.images];
          newImages[index] = {
            url: imageUrl,
            altText: newImages[index]?.altText || "",
          };
        } else {
          newImages = [...prevData.images, { url: imageUrl, altText: "" }];
        }
        return { ...prevData, images: newImages };
      });
    } catch (error) {
      toast.error("Image upload failed. See console for details.");
    } finally {
      setUploading(false);
      setReplaceIndex(null);
      if (fileInputRef.current) fileInputRef.current.value = ""; // Reset file input
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prevData) => {
      const newImages = prevData.images.filter((_, i) => i !== index);
      toast.info("Image removed.");
      return {
        ...prevData,
        images: newImages,
      };
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 min-h-screen bg-gradient-to-br from-blue-100 via-white to-fuchsia-100 shadow-xl rounded-3xl flex flex-col gap-8">
      <h2 className="text-4xl font-extrabold text-center mb-10 text-blue-700 drop-shadow-lg tracking-tight flex items-center justify-center gap-4">
        <span className="inline-block animate-bounce-slow text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="2em"
            height="2em"
          >
            <path d="M3 6a2 2 0 0 1 2-2h2V3a1 1 0 1 1 2 0v1h4V3a1 1 0 1 1 2 0v1h2a2 2 0 0 1 2 2v2H3zm18 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8zm-7 3a1 1 0 0 0-2 0v2a1 1 0 0 0 2 0z" />
          </svg>
        </span>
        <span className="animate-gradient-x bg-gradient-to-r from-blue-600 via-fuchsia-500 to-cyan-400 bg-clip-text text-transparent">
          Edit Product
        </span>
        <span className="inline-block animate-bounce text-fuchsia-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
            width="1.5em"
            height="1.5em"
          >
            <path d="M15.232 2.232a2.5 2.5 0 0 1 3.536 3.536l-9.193 9.193a1 1 0 0 1-.293.195l-4 1.6a1 1 0 0 1-1.287-1.287l1.6-4a1 1 0 0 1 .195-.293l9.193-9.193zm2.121 1.415a.5.5 0 0 0-.707 0l-1.086 1.086 1.793 1.793 1.086-1.086a.5.5 0 0 0 0-.707l-1.086-1.086zm-2.5 2.5l-9.193 9.193-.8 2 2-.8 9.193-9.193-1.393-1.393z" />
          </svg>
        </span>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white/80 rounded-2xl shadow-lg p-8 border border-blue-100"
      >
        {/* Product Name */}
        <div>
          <label className="block font-semibold mb-2 text-blue-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            required
          />
        </div>
        {/* Description */}
        <div>
          <label className="block font-semibold mb-2 text-blue-700">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            rows={4}
            required
          ></textarea>
        </div>
        {/* Price & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Count In Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              required
            />
          </div>
        </div>
        {/* SKU, Brand, Category, Collection, Material, Gender */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              SKU
            </label>
            <input
              type="text"
              name="sku"
              value={productData.sku}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Collections
            </label>
            <input
              type="text"
              name="collections"
              value={productData.collections}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Material
            </label>
            <input
              type="text"
              name="material"
              value={productData.material}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Gender
            </label>
            <input
              type="text"
              name="gender"
              value={productData.gender}
              onChange={handleChange}
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>
        {/* Sizes & Colors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(",")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((size) => size.trim()),
                })
              }
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2 text-blue-700">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(",")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value
                    .split(",")
                    .map((color) => color.trim()),
                })
              }
              className="w-full border-2 border-blue-200 rounded-lg p-3 bg-white shadow-inner focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>
        {/* Image Upload */}
        <div className="mb-6">
          <label className="block font-semibold mb-2 text-blue-700">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => handleImageChange(e)}
            accept="image/*"
            className="block w-full text-blue-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
          />
          <div className="flex flex-wrap gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div
                key={index}
                className="rounded-xl shadow-lg bg-white/90 p-2 flex flex-col items-center animate-fade-in-up delay-100 relative"
              >
                <img
                  className="rounded-md w-20 h-20 object-cover mb-2 shadow hover:scale-110 hover:rotate-2 transition-transform duration-300 animate-wiggle cursor-pointer"
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  onClick={() => {
                    document
                      .getElementById(`replace-image-input-${index}`)
                      .click();
                  }}
                  title="Click to replace image"
                />
                <span className="text-xs text-blue-500 animate-pop delay-200">
                  Image {index + 1}
                </span>
                <button
                  type="button"
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition"
                  onClick={() => handleRemoveImage(index)}
                  title="Remove image"
                >
                  ×
                </button>
                {/* Hidden file input for replacing this image */}
                <input
                  type="file"
                  id={`replace-image-input-${index}`}
                  style={{ display: "none" }}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-fuchsia-500 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 hover:shadow-blue-300/70 transition-all animate-bounce text-lg flex items-center justify-center gap-2"
        >
          <span className="animate-wiggle">💾</span> Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProducts;
