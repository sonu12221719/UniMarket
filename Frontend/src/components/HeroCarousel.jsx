/* eslint-disable no-unused-vars */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-2">
      <Slider {...settings}>
        <div>
          <img className="w-full h-80 object-cover rounded-lg" 
               src="https://i.pinimg.com/736x/2a/03/9a/2a039a1f4708ffddd6a15c27e061f0ee.jpg" 
               alt="Slide 1" />
        </div>
        <div>
          <img className="w-full h-80 object-cover rounded-lg" 
               src="https://th.bing.com/th/id/OIP.EACohm-7YxoDgDN8gD4lTgHaEU?rs=1&pid=ImgDetMain" 
               alt="Slide 2" />
        </div>
        <div>
          <img className="w-full h-80 object-cover rounded-lg" 
               src="https://wallpaperaccess.com/full/393735.jpg" 
               alt="Slide 3" />
        </div>
      </Slider>
    </div>
  );
};

export default HeroCarousel;
