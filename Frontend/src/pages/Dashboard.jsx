/* eslint-disable no-unused-vars */
import React from 'react'
import HeroSection from '../components/HeroSection'
import LatestProductCard from '../components/LatestProductCard'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

const Dashboard = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      <HeroSection/>

      {/* Latest uploaded item */}
      <h1 className="baloo-text mt-14 text-3xl text-white">
        Latest Uploaded item
      </h1>
      <LatestProductCard />
      <h1 className="baloo-text mt-14 text-3xl text-white">All Products</h1>
      <ProductCard />

      {/* Footer */}
      <Footer/>
    </div>
  )
}

export default Dashboard