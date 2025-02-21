const axios = require("axios");
const Product = require("../models/ProductModel.js");

// Flipkart & Amazon API URLs
const FLIPKART_API = "YOUR_FLIPKART_API_URL";
const AMAZON_API = "YOUR_AMAZON_API_URL";

// Compare Product Prices
const compareProduct = async (req, res) => {
  const { query } = req.body;

  try {
    // Fetch Unimarket product
    const unimarketProduct = await Product.findOne({ name: new RegExp(query, "i") });

    // Fetch Flipkart product
    const flipkartResponse = await axios.get(`${FLIPKART_API}?query=${query}`);
    const flipkartProduct = flipkartResponse.data.products?.[0];

    // Fetch Amazon product
    const amazonResponse = await axios.get(`${AMAZON_API}?query=${query}`);
    const amazonProduct = amazonResponse.data.products?.[0];

    res.json({
      unimarket: unimarketProduct || "Not found",
      flipkart: flipkartProduct || "Not found",
      amazon: amazonProduct || "Not found",
    });
  } catch (error) {
    res.status(500).json({ error: "Error fetching product data" });
  }
};

module.exports = { compareProduct };
