import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import Chat from "./pages/Chat";
import Payment from "./pages/Payment";
import Chatbot from "./pages/Chatbot";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                {/* <NavbarWithLogin/> */}
                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Protected Routes */}
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/products/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
                    <Route path="/add-product" element={<PrivateRoute><AddProduct /></PrivateRoute>} />
                    <Route path="/edit-product/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />

                    <Route path="/payment" element={<Payment />} />
                </Routes>
                <Chatbot/>
            </Router>
        </AuthProvider>
    );
}

export default App;
