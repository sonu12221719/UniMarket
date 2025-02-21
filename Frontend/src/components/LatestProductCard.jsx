import { useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { assets } from "../assets/assets";

const LatestProductCard = () => {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/latest-products")
      .then((response) => setLatestProducts(response.data))
      .catch((error) =>
        console.error("Error fetching latest products:", error)
      );
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto mt-2 py-8">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        effect="coverflow"
        centeredSlides={true}
        slidesPerView={2} // ✅ Increased to 3 to ensure center alignment
        spaceBetween={10} // ✅ Fixed spacing for proper centering
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120, // ✅ Increased depth for a more prominent middle card
          modifier: 1.5, // ✅ Adjusted modifier to ensure proper 3D effect
          slideShadows: true,
        }}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {latestProducts.map((product) => (
          <SwiperSlide
            key={product._id}
            className="flex justify-center transition-all duration-300"
          >
            <div className="w-[80%] h-[30%] bg-white shadow-lg rounded-2xl p-4 flex flex-col">
              {/* Image Section */}
              <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                <img
                  src={
                    product.photo
                      ? `http://localhost:5000/${product.photo}`
                      : "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt={product.title}
                  className="w-full h-[100%] object-cover overflow-hidden p-2rounded-2xl"
                />

                {/* Logo in top-left */}
                <div className="absolute top-3 left-3 bg-white rounded-full shadow-md">
                  <img
                    src={assets.university_logo}
                    alt="Logo"
                    className="w-10 h-10"
                  />
                </div>
              </div>

              {/* Header Section */}
              <h2 className="text-2xl font-bold mt-4 text-gray-800 baloo-text">
                {product.name || "Product Name"}
              </h2>

              {/* Description Section */}
              <p className="text-gray-600 mt-2">
                {product.description
                  ? product.description.length > 25
                    ? `${product.description.slice(0, 25)}...` // Truncate if longer than 25
                    : product.description
                  : "This is a short description of the product. Keep it concise and informative."}
              </p>

              {/* CTA Button */}
              <button
                className={`mt-4 w-full rounded-lg py-3 text-white transition-colors ${
                  product.isSold
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
                disabled={product.isSold}
              >
                {product.isSold
                  ? `Sold at ₹${product.price}`
                  : `Buy at ₹${product.price}`}
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LatestProductCard;
