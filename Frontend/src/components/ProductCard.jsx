import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all-products") // Replace with actual API URL
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching products");
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleBuyClick = (product) => {
    const token = localStorage.getItem("authToken"); // Check for token
    if (token) {
      navigate(`/payment/${product._id}`); // Navigate to payment page with product ID
    } else {
      navigate("/login"); // Redirect to login if token is missing
    }
  };

  if (loading) return <p className="text-center text-white">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mx-auto px-4 mt-8" id="all_products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between w-[280px] h-[360px] mx-auto"
            >
              {/* Logo in top-left */}
              <div className="absolute top-3 left-3 z-10 bg-white rounded-full shadow-md p-1">
                <img src={assets.university_logo} alt="Logo" className="w-8 h-8" />
              </div>

              {/* Image Section */}
              <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
                <img
                  src={
                    product.photo
                      ? `http://localhost:5000/${product.photo}`
                      : assets.image_place_holder
                  }
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-semibold baloo-text">{product.name}</h3>

              <p className="text-gray-600 text-sm">
                {product.description
                  ? product.description.length > 40
                    ? `${product.description.slice(0, 40)}...`
                    : product.description
                  : "No description available."}
              </p>

              {/* Price & Buy Button */}
              <div className="flex flex-col items-center">
                <button
                  className={`mt-2 w-full rounded-full py-2 text-white transition ${
                    product.isSold
                      ? "bg-red-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                  disabled={product.isSold}
                  onClick={() => handleBuyClick(product)}
                >
                  {product.isSold ? `Sold at ₹${product.price}` : `Buy at ₹${product.price}`}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-white">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
