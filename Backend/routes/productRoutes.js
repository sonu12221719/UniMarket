const express = require("express");
const { createProduct, getUserProducts, getProductById, getProductsByCollege, getLatestProducts,getAllProducts, updateProduct,deleteProduct,markProductAsPaid } = require("../controllers/productController");
const authMiddleware = require("../middleware/authMiddleware");
const multer = require("multer");

const router = express.Router();

// Multer storage setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// Routes
router.post("/add-product", authMiddleware, upload.fields([{ name: "photo", maxCount: 5 }, { name: "video", maxCount: 1 }]), createProduct);
router.get("/college-products", authMiddleware, getProductsByCollege);
router.get("/all-products", getAllProducts);
router.get("/latest-products", getLatestProducts);
router.get("/user-products", authMiddleware, getUserProducts);
router.get("/:id", authMiddleware, getProductById);
router.put("/:id", authMiddleware, upload.fields([{ name: "photo", maxCount: 5 }, { name: "video", maxCount: 1 }]), updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);
router.put("/mark-paid/:id", authMiddleware, markProductAsPaid);
module.exports = router;
