import React, { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import {
  fetchProductDetails,
  fetchProductsByFilters,
  setFilters,
} from "../../redux/slices/productSlice";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ autoFocus = false }) => {
  const [searchTerm, setSearchTerm] = useState("");
  // If autoFocus is true, always open; otherwise, use isOpen state
  const [isOpen, setIsOpen] = useState(autoFocus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const inputRef = React.useRef(null);

  const handleSearchToggle = () => {
    if (!autoFocus) setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductsByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        autoFocus || isOpen
          ? "absolute top-0 left-0 bg-white w-full h-28 z-50 shadow-2xl"
          : "w-auto"
      }`}
    >
      {autoFocus || isOpen ? (
        <form
          onSubmit={handleSearch}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-full max-w-xl mx-auto">
            <input
              ref={inputRef}
              onChange={(e) => setSearchTerm(e.target.value)}
              type="text"
              placeholder="Search for products, brands, or categories..."
              value={searchTerm}
              className="bg-gray-100 px-6 py-4 rounded-xl outline-none w-full placeholder:text-gray-500 text-lg shadow-lg border border-gray-200 focus:ring-2 focus:ring-rabbit-red transition-all pr-4"
              autoFocus={autoFocus}
            />
            {/* Close (X) Icon */}
            {!autoFocus && (
              <button
                type="button"
                onClick={handleSearchToggle}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rabbit-red bg-white rounded-full p-1 shadow transition-colors"
              >
                <HiMiniXMark className="h-7 w-7" />
              </button>
            )}
            {/* Search Icon removed when open */}
          </div>
        </form>
      ) : (
        <button
          onClick={handleSearchToggle}
          className="bg-gray-100 p-2 rounded-full shadow hover:bg-gray-200 transition-all border border-gray-200"
        >
          <HiMagnifyingGlass className="h-6 w-6 text-gray-600" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
