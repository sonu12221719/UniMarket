import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        college: "",
        registration: "",
        email: "",
        password: "",
        confirmPassword: "",
        idCardImg: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, idCardImg: file });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        await axios.post("http://localhost:5000/api/users/register", formDataToSend, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-auto py-3 bg-[#454545]">
            <div className="bg-none border-green-400 border-2 p-8 rounded-lg shadow-lg w-[40%]">
                <h2 className="text-3xl font-bold text-white text-center mb-2 baloo-text">Register</h2>
                <p className="text-sm mb-2 text-white font-medium text-center">Create your account by entering your details.</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
                    <div className="flex gap-4 w-full">
                    <input
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    </div>
                    <input
                        name="college"
                        placeholder="College"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="registration"
                        placeholder="Registration No"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="file"
                        name="idCardImg"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                        className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-green-700 w-full text-white py-2 rounded-lg hover:bg-green-500 transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
