import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdminProducts,
  deleteProduct,
} from "../../redux/slices/adminProductSlice";
import { toast } from "react-toastify";

const ProductManagment = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((res) => {
      if (res.meta && res.meta.requestStatus === "fulfilled") {
        toast.success("Product deleted successfully!");
        dispatch(fetchAdminProducts()); // Refresh list
      } else {
        toast.error("Failed to delete product.");
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col gap-8">
      <h2 className="text-3xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400 drop-shadow-lg tracking-tight animate-bounce-in flex items-center justify-center gap-3">
        <span className=" pt-3 animate-bounce">🛍️</span> Product Management{" "}
        <span className="pt-3  animate-bounce">✨</span>
      </h2>
      <div className="relative overflow-x-auto shadow-2xl rounded-2xl bg-gradient-to-br from-blue-100 via-white to-indigo-200 border border-blue-200 animate-fade-in-up">
        <svg
          className="absolute -top-8 -left-8 w-24 h-24 opacity-10 blur-2xl animate-float-slow z-0"
          viewBox="0 0 200 200"
        >
          <circle fill="#60a5fa" cx="100" cy="100" r="100" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-16 h-16 opacity-10 blur-2xl animate-float-fast z-0"
          viewBox="0 0 200 200"
        >
          <ellipse fill="#a5b4fc" cx="100" cy="100" rx="100" ry="80" />
        </svg>
        <div className="relative z-10">
          <table className="min-w-full text-left text-blue-900">
            <thead className="bg-gradient-to-r from-blue-100 to-indigo-100 text-xs uppercase text-blue-700 animate-fade-in-up">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <tr
                    className="border-b border-blue-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all animate-fade-in-up"
                    style={{ animationDelay: `${300 + idx * 60}ms` }}
                    key={product._id}
                  >
                    <td className="p-4 font-medium whitespace-nowrap flex items-center gap-2">
                      <span className="text-lg animate-bounce">👕</span>{" "}
                      {product.name}
                    </td>
                    <td className="p-4 font-bold text-blue-700">
                      ${product.price}
                    </td>
                    <td className="p-4 font-mono">{product.sku}</td>
                    <td className="p-4 flex gap-2">
                      <Link
                        to={`/admin/products/${product._id}/edit`}
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-yellow-300/70 transition-all animate-pop flex items-center gap-1"
                      >
                        <span className="animate-bounce">✏️</span> Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg font-semibold shadow hover:scale-105 hover:shadow-red-300/70 transition-all animate-pop flex items-center gap-1"
                      >
                        <span className="animate-bounce">🗑️</span> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-400">
                    No products found.
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

export default ProductManagment;
