import React, { useState, useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSidebar";;
import { useRef } from "react";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productSlice";
import { useSelector } from "react-redux";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const queryParams = Object.fromEntries([...searchParams]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsByFilters({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    // Close sidebar if clicked outside
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Mobile Filter Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-3 flex justify-center items-center gap-2 bg-white rounded-xl shadow-md mt-4 mx-4 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
      >
        <FaFilter className="mr-2 text-lg" />
        Filters
      </button>

      {/* Filter Sidebar  */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 z-50 left-0 w-[280px] max-w-xs min-w-[220px] bg-white border-r border-gray-200 overflow-y-auto transition-transform duration-300 transform
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0 lg:static lg:border-none lg:w-1/5 lg:max-w-none lg:min-w-0 shadow-xl lg:shadow-none`}
      >
        <FilterSideBar />
      </div>
      {/* Products Section */}
      <div className="flex-grow p-6 md:p-10 lg:w-4/5">
        <h2 className="text-3xl font-extrabold uppercase mb-8 text-gray-900 tracking-tight drop-shadow-lg">
          All Collections
        </h2>
        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default CollectionPage;
