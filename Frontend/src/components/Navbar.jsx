import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import AuthContext from "../context/AuthContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Create a ref for the dropdown container
  const dropdownRef = useRef(null);
  const profilePicRef = useRef(null);

  // Toggle dropdown on profile pic click
  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close the dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profilePicRef.current &&
        !profilePicRef.current.contains(event.target)
      ) {
        setDropdownOpen(false); // Close dropdown if clicked outside
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-[#464646;] px-10 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center text-3xl font-bold">
          <span className="text-white">Uni</span>
          <span className="text-[#00FF66]">Market</span>
        </Link>

        {user ? (
          <>
            {/* Search Bar */}
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-xl rounded-lg">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-10 py-2 rounded-lg border-none bg-[#D9D9D9] text-white placeholder-gray-400"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <img src={assets.search_icon} alt="" className="w-5" />
                </span>
              </div>
              <button className="icon-btn">
                <img src={assets.university_logo} alt="university logo" className="h-9" />
              </button>
              <button className="icon-btn">
                <img src={assets.menu_icon} alt="menu" className="h-8"/>
              </button>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-5">
              <Link to='/add-product' className="icon-btn">
                <img src={assets.add_icon} alt="add" className="h-8"/>
              </Link>
              <Link to='/chat' className="icon-btn">
                <img src={assets.chat_icon_with_msg} alt="notification" className="h-8"/>
              </Link>

              {/* Notifications with dot */}
              <div className="relative">
                <button className="icon-btn">
                  <img src={assets.notification_icon_with_msg} alt="notification" className="h-8" />
                </button>
              </div>

              {/* Profile Picture */}
              <div className="relative" ref={profilePicRef}>
                <img
                  // src={user.profilePhoto} // Assuming user has a profile photo
                  src={assets.profile}
                  alt="Profile"
                  className="h-10 w-10 rounded-full cursor-pointer"
                  onClick={handleDropdownToggle} // Toggle dropdown on profile pic click
                />
                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-20 right-0 bg-white text-black shadow-lg rounded-md mt-2 w-48 p-2 space-y-2"
                  >
                    <Link
                      to="/profile"
                      onClick={handleDropdownToggle}
                      className="block text-black hover:bg-gray-100 p-2 rounded"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/dashboard"
                      onClick={handleDropdownToggle}
                      className="block text-black hover:bg-gray-100 p-2 rounded"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/add-product"
                      onClick={handleDropdownToggle}
                      className="block text-black hover:bg-gray-100 p-2 rounded"
                    >
                      Add Product
                    </Link>
                    <button
                      onClick={logout}
                      className="block text-black w-full text-left hover:bg-gray-100 p-2 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white hover:text-[#00FF66] transition-colors"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-[#00FF66] transition-colors"
              >
                About
              </Link>
              <Link
                to="/terms"
                className="text-white hover:text-[#00FF66] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-[#00FF66] transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 baloo-text bg-white text-zinc-800 rounded-full hover:bg-gray-100 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 baloo-text bg-[#00FF66] text-zinc-800 rounded-full hover:bg-[#00E65C] transition-colors"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
