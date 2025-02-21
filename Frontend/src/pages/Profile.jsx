// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
// import { assets } from "../assets/assets";
// import AuthContext from "../context/AuthContext";
// import Footer from "../components/Footer";

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editableUser, setEditableUser] = useState(user);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/products/user-products", {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, [token]);

//   const handleUserChange = (e) => {
//     setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
//   };

//   const saveUserDetails = () => {
//     // Call API to update user details (if needed)
//     console.log("User details saved:", editableUser);
//     setEditMode(false);
//   };

//   const handleProductChange = (id, field, value) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product._id === id ? { ...product, [field]: value } : product
//       )
//     );
//   };

//   const saveProductChanges = async (id, updatedProduct) => {
//     try {
//       await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("Product updated successfully");
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   const deleteProduct = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts(products.filter((product) => product._id !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#454545] p-4 md:p-8">
//       <div className="mx-auto max-w-5xl pt-5">
//         <div className="bg-emerald-800/90 p-8 text-white rounded-2xl shadow-lg relative">
//           <div className="grid gap-32 md:grid-cols-[1fr_300px]">
//             <div className="space-y-4 space-x-4">
//               <div className="mx-auto -my-16 mb-9 h-24 w-24 overflow-hidden rounded-full border-4 border-emerald-400">
//                 <img
//                   src={editableUser?.profile || assets.profile_holder}
//                   alt="Profile"
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               <button
//                 onClick={() => setEditMode(!editMode)}
//                 className="bg-blue-500 px-4 py-2 rounded-md text-white"
//               >
//                 {editMode ? "Cancel" : "Edit Profile"}
//               </button>

//               {editMode && (
//                 <button onClick={saveUserDetails} className="bg-green-500 px-4 py-2 rounded-md text-white ml-2">
//                   Save
//                 </button>
//               )}

//               <div className="grid gap-4 md:grid-cols-2">
//                 {[
//                   { label: "First Name", name: "firstName" },
//                   { label: "Last Name", name: "lastName" },
//                   { label: "Email", name: "email" },
//                   { label: "College", name: "college" },
//                   { label: "Registration Number", name: "registration" },
//                 ].map(({ label, name }) => (
//                   <div key={name} className="space-y-2">
//                     <label className="text-sm">{label}</label>
//                     <input
//                       type="text"
//                       name={name}
//                       value={editableUser[name] || ""}
//                       onChange={handleUserChange}
//                       disabled={!editMode}
//                       className="w-full px-3 py-2 border rounded-md border-emerald-600 bg-emerald-900/50 text-white"
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-8">
//           <h2 className="mb-4 text-2xl font-bold text-white text-center">Uploaded Products</h2>

//           {products.length === 0 ? (
//             <p className="text-white text-center">No products uploaded yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {products.map((product) => (
//                 <div key={product._id} className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-lg">
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
//                     <img src={product.photo || assets.product_holder} alt={product.name} className="h-full w-full object-cover" />
//                   </div>
//                   <div className="flex-1">
//                     <input
//                       type="text"
//                       value={product.name}
//                       onChange={(e) => handleProductChange(product._id, "name", e.target.value)}
//                       onBlur={() => saveProductChanges(product._id, product)}
//                       className="text-lg font-semibold w-full bg-transparent border-b border-gray-400 focus:outline-none"
//                     />
//                     <input
//                       type="text"
//                       value={product.description}
//                       onChange={(e) => handleProductChange(product._id, "description", e.target.value)}
//                       onBlur={() => saveProductChanges(product._id, product)}
//                       className="text-sm text-gray-600 w-full bg-transparent border-b border-gray-400 focus:outline-none"
//                     />
//                   </div>
//                   <div className="flex items-center gap-4">
//                     <input
//                       type="text"
//                       value={product.price}
//                       onChange={(e) => handleProductChange(product._id, "price", e.target.value)}
//                       onBlur={() => saveProductChanges(product._id, product)}
//                       className="text-lg font-bold text-orange-500 bg-transparent border-b border-gray-400 focus:outline-none"
//                     />
//                     <button onClick={() => deleteProduct(product._id)} className="text-red-500 hover:text-red-700">
//                       <FaTrashAlt className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Profile;



// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
// import { assets } from "../assets/assets";
// import AuthContext from "../context/AuthContext";
// import Footer from "../components/Footer";

// const Profile = () => {
//   const { user } = useContext(AuthContext);
//   const [products, setProducts] = useState([]);
//   const [editMode, setEditMode] = useState(null);
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5000/api/products/user-products",
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         setProducts(response.data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };
//     fetchProducts();
//   }, [token]);

//   // Handle Edit
//   const handleEdit = (id) => {
//     setEditMode(id);
//   };

//   // Handle Save
//   const handleSave = async (id, updatedProduct) => {
//     try {
//       await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setProducts((prev) =>
//         prev.map((product) => (product._id === id ? updatedProduct : product))
//       );
//       setEditMode(null);
//     } catch (error) {
//       console.error("Error updating product:", error);
//     }
//   };

//   // Handle Delete
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/products/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProducts((prev) => prev.filter((product) => product._id !== id));
//     } catch (error) {
//       console.error("Error deleting product:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#454545] p-4 md:p-8">
//       <div className="mx-auto max-w-5xl pt-5">
//         {/* Profile Section */}
//         <div className="bg-emerald-800/90 p-8 text-white rounded-2xl shadow-lg relative">
//           <div className="grid gap-32 md:grid-cols-[1fr_300px]">
//             <div className="space-y-4">
//               <div className="mx-auto -my-16 mb-9 h-24 w-24 overflow-hidden rounded-full border-4 border-emerald-400">
//                 <img
//                   src={user?.profile ? user.profile : assets.profile_holder}
//                   alt="Profile"
//                   className="h-full w-full object-cover"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="text-sm">Email</label>
//                 <input
//                   type="email"
//                   defaultValue={user.email}
//                   className="w-full px-3 py-2 border rounded-md border-emerald-600 bg-emerald-900/50 text-white"
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Uploaded Products Section */}
//         <div className="mt-8">
//           <h2 className="mb-4 text-2xl font-bold text-white text-center">
//             Uploaded Products
//           </h2>

//           {products.length === 0 ? (
//             <p className="text-white text-center">No products uploaded yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-lg"
//                 >
//                   <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
//                     <img
//                       src={product.photo || assets.product_holder}
//                       alt={product.name}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>
//                   <div className="flex-1">
//                     {editMode === product._id ? (
//                       <>
//                         <input
//                           type="text"
//                           defaultValue={product.name}
//                           className="w-full px-3 py-1 border rounded-md"
//                           onChange={(e) =>
//                             setProducts((prev) =>
//                               prev.map((p) =>
//                                 p._id === product._id
//                                   ? { ...p, name: e.target.value }
//                                   : p
//                               )
//                             )
//                           }
//                         />
//                         <input
//                           type="text"
//                           defaultValue={product.description}
//                           className="w-full px-3 py-1 border rounded-md mt-1"
//                           onChange={(e) =>
//                             setProducts((prev) =>
//                               prev.map((p) =>
//                                 p._id === product._id
//                                   ? { ...p, description: e.target.value }
//                                   : p
//                               )
//                             )
//                           }
//                         />
//                         <input
//                           type="number"
//                           defaultValue={product.price}
//                           className="w-full px-3 py-1 border rounded-md mt-1"
//                           onChange={(e) =>
//                             setProducts((prev) =>
//                               prev.map((p) =>
//                                 p._id === product._id
//                                   ? { ...p, price: e.target.value }
//                                   : p
//                               )
//                             )
//                           }
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <h3 className="text-lg font-semibold">{product.name}</h3>
//                         <p className="text-sm text-gray-600">{product.description}</p>
//                         <div className="text-lg font-bold text-orange-500">
//                           ₹ {product.price}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                   <div className="flex items-center gap-4">
//                     {editMode === product._id ? (
//                       <button onClick={() => handleSave(product._id, product)}>
//                         <FaSave className="h-5 w-5 text-green-500" />
//                       </button>
//                     ) : (
//                       <button onClick={() => handleEdit(product._id)}>
//                         <FaEdit className="h-5 w-5 text-blue-500" />
//                       </button>
//                     )}
//                     <button onClick={() => handleDelete(product._id)}>
//                       <FaTrashAlt className="h-5 w-5 text-red-500" />
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Profile;



import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt, FaEdit, FaSave } from "react-icons/fa";
import { assets } from "../assets/assets";
import AuthContext from "../context/AuthContext";
import Footer from "../components/Footer";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/products/user-products",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Convert photo paths to full URLs
        const updatedProducts = response.data.map((product) => ({
          ...product,
          photo: product.photo
            ? `http://localhost:5000/${product.photo.replace(/\\/g, "/")}`
            : assets.product_holder,
        }));

        setProducts(updatedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [token]);

  // Handle Edit
  const handleEdit = (id) => {
    setEditMode(id);
  };

  // Handle Save
  const handleSave = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? updatedProduct : product))
      );
      setEditMode(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#454545] p-4 md:p-8">
      <div className="mx-auto max-w-5xl pt-5">
        {/* Profile Section */}
        <div className="bg-emerald-800/90 p-8 text-white rounded-2xl shadow-lg relative">
          <div className="grid gap-32 md:grid-cols-[1fr_300px]">
            <div className="space-y-4">
              <div className="mx-auto -my-16 mb-9 h-24 w-24 overflow-hidden rounded-full border-4 border-emerald-400">
                <img
                  src={user?.profile ? user.profile : assets.profile_holder}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-3 py-2 border rounded-md border-emerald-600 bg-emerald-900/50 text-white"
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>

        {/* Uploaded Products Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-2xl font-bold text-white text-center">
            Uploaded Products
          </h2>

          {products.length === 0 ? (
            <p className="text-white text-center">No products uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-lg"
                >
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    {editMode === product._id ? (
                      <>
                        <input
                          type="text"
                          defaultValue={product.name}
                          className="w-full px-3 py-1 border rounded-md"
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id
                                  ? { ...p, name: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                        <input
                          type="text"
                          defaultValue={product.description}
                          className="w-full px-3 py-1 border rounded-md mt-1"
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id
                                  ? { ...p, description: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                        <input
                          type="number"
                          defaultValue={product.price}
                          className="w-full px-3 py-1 border rounded-md mt-1"
                          onChange={(e) =>
                            setProducts((prev) =>
                              prev.map((p) =>
                                p._id === product._id
                                  ? { ...p, price: e.target.value }
                                  : p
                              )
                            )
                          }
                        />
                      </>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">{product.description}</p>
                        <div className="text-lg font-bold text-orange-500">
                          ₹ {product.price}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    {editMode === product._id ? (
                      <button onClick={() => handleSave(product._id, product)}>
                        <FaSave className="h-5 w-5 text-green-500" />
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(product._id)}>
                        <FaEdit className="h-5 w-5 text-blue-500" />
                      </button>
                    )}
                    <button onClick={() => handleDelete(product._id)}>
                      <FaTrashAlt className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
