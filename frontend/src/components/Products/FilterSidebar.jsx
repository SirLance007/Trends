import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const FilterSideBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        category: "",
        price: "",
        rating: "",
        color: [],
        size: [],
        material: [],
        brand: [],
        minPrice: 0,
        maxPrice: 0,
    });

    const [priceRange, setPriceRange] = useState([0, 100]);

    const categories = ["Top Wear", "Bottom Wear", "Footwear", "Accessories"];
    const brands = ["Levis", "Pepe Jeans", "Wrangler", "U.S. Polo"];
    const sizes = ["S", "M", "L", "XL", "XXL"];
    const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange"];
    const materials = ["Cotton", "Polyester", "Nylon", "Wool"];
    const genders = ["Men", "Women"];

    useEffect(() => {
        const params = Object.fromEntries([...searchParams]);

        setFilters({
            category: params.category || "",
            price: params.price || "",
            rating: params.rating || "",
            color: params.color ? params.color.split(",") : [],
            size: params.size ? params.size.split(",") : [],
            material: params.material ? params.material.split(",") : [],
            brand: params.brand ? params.brand.split(",") : [],
            minPrice: params.minPrice || 0,
            maxPrice: params.maxPrice || 0,
        });

        setPriceRange([+params.minPrice || 0, +params.maxPrice || 100]);
    }, [searchParams]);

    const hadlePriceChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleCategoryChange = (e) => {
        const { name, value, checked, type } = e.target;
        let newFilters = { ...filters };

        if (type === "checkbox") {
            if (checked) {
                newFilters[name] = [...newFilters[name], value];
            } else {
                newFilters[name] = newFilters[name].filter((item) => item !== value);
            }
        } else if (type === "radio") {
            newFilters[name] = value;
        }

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const handleColorClick = (e) => {
        const color = e.target.value;
        let newFilters = { ...filters };

        if (newFilters.color.includes(color)) {
            newFilters.color = newFilters.color.filter((c) => c !== color);
        } else {
            newFilters.color = [...newFilters.color, color];
        }

        setFilters(newFilters);
        updateURLParams(newFilters);
    };

    const updateURLParams = (newFilters) => {
        const params = new URLSearchParams();
        Object.keys(newFilters).forEach((key) => {
            if (Array.isArray(newFilters[key])) {
                if (newFilters[key].length > 0) {
                    params.set(key, newFilters[key].join(","));
                }
            } else if (newFilters[key]) {
                params.set(key, newFilters[key]);
            }
        });
        setSearchParams(params);
        navigate(`?${params.toString()}`);
    };

    return (
        <aside className="sticky top-24 w-full max-w-sm min-w-[260px] bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 animate-fade-in transition-all duration-500">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 tracking-wide flex items-center gap-2 animate-slide-in-down">
                <span className="inline-block w-2 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mr-2 animate-bounce" />
                Filter
            </h3>

            {/* Category Filter */}
            <div className="mb-8 animate-fade-in-up delay-100">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Category:</label>
                <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                        <label key={category} className={`px-3 py-1 rounded-full cursor-pointer border border-gray-300 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${filters.category === category ? 'ring-2 ring-blue-400 bg-gradient-to-r from-blue-200 to-purple-200' : ''}`}>
                            <input
                                checked={filters.category === category}
                                className="hidden"
                                type="radio"
                                name="category"
                                value={category}
                                onChange={handleCategoryChange}
                            />
                            {category}
                        </label>
                    ))}
                </div>
            </div>

            {/* Gender Filter */}
            <div className="mb-8 animate-fade-in-up delay-200">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Gender:</label>
                <div className="flex flex-wrap gap-2">
                    {genders.map((gender) => (
                        <label key={gender} className={`px-3 py-1 rounded-full cursor-pointer border border-gray-300 bg-gradient-to-r from-pink-50 to-blue-50 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${filters.gender === gender ? 'ring-2 ring-pink-400 bg-gradient-to-r from-pink-200 to-blue-200' : ''}`}>
                            <input
                                checked={filters.gender === gender}
                                type="radio"
                                name="gender"
                                value={gender}
                                className="hidden"
                                onChange={handleCategoryChange}
                            />
                            {gender}
                        </label>
                    ))}
                </div>
            </div>

            {/* Material Filter */}
            <div className="mb-8 animate-fade-in-up delay-300">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Material:</label>
                <div className="flex flex-wrap gap-2">
                    {materials.map((material) => (
                        <label key={material} className={`px-3 py-1 rounded-full cursor-pointer border border-gray-300 bg-gradient-to-r from-green-50 to-blue-50 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${filters.material.includes(material) ? 'ring-2 ring-green-400 bg-gradient-to-r from-green-200 to-blue-200' : ''}`}>
                            <input
                                type="checkbox"
                                name="material"
                                value={material}
                                checked={filters.material.includes(material)}
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            {material}
                        </label>
                    ))}
                </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-8 animate-fade-in-up delay-400">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Brand:</label>
                <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                        <label key={brand} className={`px-3 py-1 rounded-full cursor-pointer border border-gray-300 bg-gradient-to-r from-yellow-50 to-blue-50 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${filters.brand.includes(brand) ? 'ring-2 ring-yellow-400 bg-gradient-to-r from-yellow-200 to-blue-200' : ''}`}>
                            <input
                                type="checkbox"
                                name="brand"
                                value={brand}
                                checked={filters.brand.includes(brand)}
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            {brand}
                        </label>
                    ))}
                </div>
            </div>

            {/* Color Filter */}
            <div className="mb-8 animate-fade-in-up delay-500">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Colors:</label>
                <div className="flex flex-wrap gap-3">
                    {colors.map((color, idx) => (
                        <button
                            key={color}
                            value={color}
                            onClick={handleColorClick}
                            className={`w-8 h-8 rounded-full border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300
                                ${filters.color.includes(color) ? 'ring-2 ring-blue-500 border-blue-400 scale-110 animate-color-pop' : 'hover:animate-color-wiggle'}
                            `}
                            style={{ backgroundColor: color.toLowerCase(), animationDelay: `${idx * 60}ms` }}
                            aria-label={color}
                        />
                    ))}
                </div>
            </div>

            {/* Size Filter */}
            <div className="mb-8 animate-fade-in-up delay-600">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Size:</label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <label key={size} className={`px-3 py-1 rounded-full cursor-pointer border border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50 text-gray-700 font-medium shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md ${filters.size.includes(size) ? 'ring-2 ring-blue-400 bg-gradient-to-r from-blue-200 to-gray-200' : ''}`}>
                            <input
                                type="checkbox"
                                name="size"
                                value={size}
                                checked={filters.size.includes(size)}
                                onChange={handleCategoryChange}
                                className="hidden"
                            />
                            {size}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="mb-8 animate-fade-in-up delay-700">
                <label className="block text-gray-600 font-semibold mb-3 text-lg">Price Range:</label>
                <div className="flex items-center gap-4">
                    <span className="text-gray-500 font-semibold">${priceRange[0]}</span>
                    <input
                        min={0}
                        max={100}
                        type="range"
                        value={priceRange[1]}
                        onChange={(e) => {
                            const newRange = [priceRange[0], Number(e.target.value)];
                            setPriceRange(newRange);
                            const newFilters = {
                                ...filters,
                                minPrice: newRange[0],
                                maxPrice: newRange[1]
                            };
                            setFilters(newFilters);
                            updateURLParams(newFilters);
                        }}
                        name="priceRange"
                        className="w-full h-2 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer transition-all duration-200 focus:ring-2 focus:ring-blue-400"
                    />
                    <span className="text-gray-500 font-semibold">${priceRange[1]}</span>
                </div>
            </div>
        </aside>
    );
};

export default FilterSideBar;


