import { useState, useEffect } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Payment= () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/all-products")
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

  const handlePayment = async (product) => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/payment/create-order", {
        amount: product.price,
        currency: "INR",
      });

      const options = {
        key: "your_test_key_id", // Replace with your Razorpay Test Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Unimarket",
        description: product.name,
        order_id: data.id,
        handler: async function (response) {
          const verifyRes = await axios.post("http://localhost:5000/api/payment/verify-payment", response);
          if (verifyRes.data.success) {
            alert("Payment successful!");
            // Redirect to success page or update UI
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          email: "sonukumar200219@gmail.com", // Replace with user email
          contact: "8789694040", // Replace with user phone number
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed! Please try again.");
    }
  };

  if (loading) return <p className="text-center text-white">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mx-auto px-4 mt-8" id="all_products">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="relative bg-white shadow-lg rounded-2xl p-4 flex flex-col justify-between w-[280px] h-[360px] mx-auto">
              <div className="absolute top-3 left-3 z-10 bg-white rounded-full shadow-md p-1">
                <img src={assets.university_logo} alt="Logo" className="w-8 h-8" />
              </div>

              <div className="relative w-full h-[180px] rounded-lg overflow-hidden">
                <img src={product.photo ? `http://localhost:5000/${product.photo}` : assets.image_place_holder} alt={product.name} className="w-full h-full object-cover" />
              </div>

              <h3 className="text-lg font-semibold baloo-text">{product.name}</h3>

              <p className="text-gray-600 text-sm">{product.description ? (product.description.length > 40 ? `${product.description.slice(0, 40)}...` : product.description) : "No description available."}</p>

              <div className="flex flex-col items-center">
                <button onClick={() => handlePayment(product)} className="mt-2 w-full rounded-full py-2 text-white bg-green-500 hover:bg-green-600">
                  Buy at ₹{product.price}
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

export default Payment;
