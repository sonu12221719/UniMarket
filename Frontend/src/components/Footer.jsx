// import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="h-[30vh] flex items-center gap-10 bg-black w-full mt-10">
      {/* Logo */}
      <Link
        to="/"
        className="h-full flex items-center ml-32 text-2xl font-bold"
      >
        <span className="text-white">Uni</span>
        <span className="text-[#00FF66]">Market</span>
      </Link>
      <div className="h-32 bg-slate-400 w-1 rounded-full"></div>
      <div className="flex gap-96 w-full">
        <div>
          <div className="flex gap-3">
            <h1 className="text-white font-semibold">About</h1>
            <h1 className="text-white font-semibold">Terms</h1>
            <h1 className="text-white font-semibold">Support</h1>
          </div>
          <p className="text-white text-sm mt-2 opacity-80">
            &copy; 2021 UniMarket. All rights reserved.
          </p>
        </div>
        <div>
          <h1 className="text-white font-semibold">Connect with us</h1>
          <div className="flex gap-3 mt-3">
            <button className="icon-btn">
              <img
                src={assets.instagram}
                alt="instagram"
                className="h-6 opacity-90"
              />
            </button>
            <button className="icon-btn">
              <img
                src={assets.whatsapp}
                alt="whatsapp"
                className="h-6 opacity-90"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
