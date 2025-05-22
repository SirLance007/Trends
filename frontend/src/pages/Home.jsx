import React from "react";
import axios from "axios";
import Hero from "../components/Layout/Hero";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProductsByFilters } from "../redux/slices/productSlice";

const Home = () => {
  const dispach = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = React.useState([]);

  useEffect(() => {
    // Fetch product for a specific category
    dispach(
      fetchProductsByFilters({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      })
    );

    // Fetch the best seller product
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error("Error fetching best seller products:", error);
      }
    };

    fetchBestSeller();
  }, [dispach]);

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller */}
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p>Loading...</p>
      )}

      <div className="container mx-auto mt-10">
        <h2 className="text-3xl text-center mb-5 font-bold">
          Top Wear's for women
        </h2>
        <ProductGrid products={products}  />
      </div>
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};

export default Home;
