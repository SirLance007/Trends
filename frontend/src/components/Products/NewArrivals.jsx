import React, { useRef, useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error("Error fetching newArrivals:", error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = container.offsetWidth / 1.2;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft + container.clientWidth < container.scrollWidth
    );
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollButtons();
    container.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [newArrivals]);

  const handleOnMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollStart - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <section className="flex flex-center flex-col py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="container mx-auto text-center mb-12 relative">
        <h2 className="text-4xl font-extrabold mb-4 text-gray-900 tracking-tight drop-shadow-lg">
          New Arrivals
        </h2>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          Discover the latest styles and trends in our new arrivals collection.
        </p>
        <div className="absolute right-0 bottom-[-30px] md:mr-6 sm:mr-1 flex space-x-2 z-10">
          <button
            className="p-3 rounded-full border bg-white text-black shadow-lg hover:bg-black hover:text-white transition disabled:opacity-30"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            aria-label="Scroll Left"
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            className="p-3 rounded-full border bg-white text-black shadow-lg hover:bg-black hover:text-white transition disabled:opacity-30"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            aria-label="Scroll Right"
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing"
        onMouseDown={handleOnMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex space-x-8">
          {newArrivals.map((product) => (
            <div
              key={product.id || product._id}
              className="min-w-[250px] sm:min-w-[300px] lg:min-w-[350px] relative group transition-transform duration-300 hover:scale-105"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl bg-white">
                <img
                  className="w-full object-cover h-[400px] rounded-2xl group-hover:scale-110 transition-transform duration-500"
                  src={product.images[0]?.url}
                  alt={product.images[0]?.alt}
                  draggable={false}
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white text-xs px-3 py-1 rounded-full font-semibold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
                  New
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white p-6 rounded-b-2xl flex flex-col items-start">
                  <Link
                    to={`/product/${product.id || product._id}`}
                    className="block w-full"
                  >
                    <h4 className="font-bold text-lg mb-1 truncate">
                      {product.name}
                    </h4>
                    <p className="text-pink-300 font-semibold text-base">
                      ${product.price}
                    </p>
                    <span className="inline-block mt-3 bg-white/90 text-black font-semibold px-4 py-1 rounded-full shadow hover:bg-pink-600 hover:text-white transition-all text-sm">
                      View Details
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
