import React from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    searchParams.set("sortBy", selectedSort);
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-6 mr-8 flex items-center justify-end">
      <label
        htmlFor="sort"
        className="mr-3 text-gray-700 font-semibold text-base hidden sm:block"
      >
        Sort by:
      </label>
      <div className="relative">
        <select
          value={searchParams.get("sortBy") || ""}
          onChange={handleSortChange}
          id="sort"
          className="border border-gray-300 p-2 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-rabbit-red transition-all bg-white text-gray-700 font-medium shadow-sm hover:border-rabbit-red cursor-pointer min-w-[170px]"
        >
          <option value="">Default</option>
          <option value="priceAsc">Price : Low to High</option>
          <option value="priceDsc">Price : High to Low</option>
          <option value="popularity">Popularity</option>
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
          ▼
        </span>
      </div>
    </div>
  );
};

export default SortOptions;
