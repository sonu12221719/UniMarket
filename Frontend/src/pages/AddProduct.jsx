import { useState, } from "react";
import { Plus, Video } from "lucide-react";
import axios from "axios";
// import AuthContext from "../context/AuthContext"; // ✅ Import Auth Context

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setSelectedImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedVideo(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", formData.name);
    productData.append("description", formData.description);
    productData.append("category", formData.category);
    productData.append("price", formData.price);

    selectedImages.forEach((image) => productData.append("photo", image.file));
    if (selectedVideo) productData.append("video", selectedVideo);

    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:5000/api/products/add-product", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });

      alert("Product Added Successfully!");
      console.log(response.data);
      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
      });
      setSelectedImages([]);
      setSelectedVideo(null);
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error);
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="min-h-fit bg-[#454545] px-10">
      <form onSubmit={handleSubmit} className="mx-auto w-full">
        <h1 className="mb-2 text-3xl font-bold text-white">ADD NEW PRODUCT</h1>

        <div className="grid gap-8 md:grid-cols-[1fr,1fr]">
          {/* General Information */}
          <div className="space-y-4">
            <h2 className="mb-4 text-xl font-semibold text-white">General Information</h2>
            <div className="space-y-4">
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="w-full h-12 p-3 bg-zinc-600 text-white rounded-md" />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Product Description" className="w-full min-h-[120px] p-3 bg-zinc-600 text-white rounded-md"></textarea>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full h-12 p-3 bg-zinc-600 text-white rounded-md">
                <option value="" disabled>Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="books">Books</option>
              </select>
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full h-12 p-3 bg-zinc-600 text-white rounded-md" />
            </div>
          </div>

          {/* Upload Section */}
          <div className="flex gap-10">
            {/* Upload Image */}
            <div className="w-1/2">
              <h2 className="mb-4 text-xl font-semibold text-white">Upload Image</h2>
              <label className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald-500 bg-zinc-700 hover:bg-zinc-600">
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleImageUpload} />
                <Plus className="h-10 w-10 text-emerald-500" />
              </label>

              {/* Image Preview Section */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img src={image.preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover rounded-md" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Video */}
            <div className="w-1/2">
              <h2 className="mb-4 text-xl font-semibold text-white">Upload Video</h2>
              <label className="group relative flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-emerald-500 bg-zinc-700 hover:bg-zinc-600">
                <input type="file" className="hidden" accept="video/*" onChange={handleVideoUpload} />
                <Video className="h-10 w-10 text-emerald-500" />
              </label>

              {/* Video Preview Section */}
              {selectedVideo && (
                <video src={selectedVideo} className="mt-4 rounded-lg w-full" controls />
              )}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-4 flex items-center justify-center w-full ">
          <button type="submit" className="h-12 w-2/3 bg-emerald-500 text-lg text-white drop-shadow-lg font-semibold rounded-full hover:bg-emerald-600">
            ADD
          </button>
        </div>
      </form>
    </div>
  );
}
