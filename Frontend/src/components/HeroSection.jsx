import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const HeroSection = () => {
  return (
    <>
      <div className="w-full flex flex-col items-start text-left relative">
        <div className="text-white z-10 absolute top-10 left-10">
          {/* First animated line */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold drop-shadow-lg">
            <TypeAnimation
              sequence={["Shop Smart", 1500, ""]}
              speed={50}
              repeat={Infinity}
            />
          </h1>

          {/* Second animated line with colored word */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold drop-shadow-lg">
            <TypeAnimation
              sequence={["Save ", 1000]} // Only animates "Save "
              speed={50}
              repeat={Infinity}
              cursor={false} // Hides cursor so it doesn't appear between animations
            />
            <span className="text-[#00FF66]">More!</span>{" "}
            {/* Static colored text */}
          </h1>

          <p className="max-w-[45%] font-normal text-xl leading-5 mt-2 opacity-75">
            Get the best second-hand products at unbeatable prices. Join Uni
            <span className="text-[#00FF66]">Market</span> today!
          </p>
          <p className="max-w-[45%] font-thin mt-2 leading-4 opacity-50">
            Unimarket is your go-to platform for buying and selling second-hand
            products within your campus. Find great deals, connect with
            students, and save money effortlessly! Whether you&apos;re looking
            for books, gadgets, furniture, or essentials, Unimarket makes it
            easy to trade within your college community. Say goodbye to
            expensive purchases and hello to smart savings!
          </p>
          <div className="mt-5 flex justify-between gap-5 max-w-[45%]">
            <Link
              to="/ProductCard#all_products"
              className="px-6 py-4 text-xl text-center w-full bg-white text-zinc-800 rounded-full hover:bg-gray-100 transition-colors baloo-text"
            >
              Start Shopping
            </Link>
            <Link
              to="/add-product"
              className="px-6 py-4 text-xl text-center w-full bg-[#00FF66] text-zinc-800 rounded-full hover:bg-gray-100 transition-colors baloo-text"
            >
              Sell Now
            </Link>
          </div>
        </div>
        <img
          src={assets.hero_image}
          alt="Hero"
          className="w-full h-auto object-cover max-h-[500px] md:max-h-[600px] lg:max-h-[700px]"
        />
      </div>
    </>
  );
};

export default HeroSection;
