/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem("token");
    
        if (token) {
            axios.get("http://localhost:5000/api/users/profile", {  // Change to correct route
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(res => setUser(res.data))
            .catch(err => {
                console.error("Token Verification Error:", err);
                localStorage.removeItem("token"); // Remove invalid token
            });
        }
    }, []);
    

    const login = async (email, password) => {
        const { data } = await axios.post("http://localhost:5000/api/users/login", { email, password });
        localStorage.setItem("token", data.token);
        console.log(data.user);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
