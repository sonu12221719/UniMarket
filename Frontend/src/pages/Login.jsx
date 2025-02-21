import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user,login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center h-auto py-20 bg-[#454545]">
      <div className="bg-none border-green-400 border-2 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold text-white text-center mb-2 baloo-text">Login</h2>
        <p className="text-sm mb-2 text-white font-medium text-center">Enter your credentials to access your account</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button type="submit" className="bg-green-700 w-full text-white py-2 rounded-lg hover:bg-green-500 transition">
            Login
          </button>
        </form>
        <Link to='/forget-password' className="text-blue-400 font-light mt-3">Forget password?</Link>
      </div>
    </div>
  );
};

export default Login;
