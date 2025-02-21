const express = require("express");
const { compareProduct } = require("../controllers/chatbotController");

const router = express.Router();

router.post("/compare", compareProduct);

module.exports = router;
