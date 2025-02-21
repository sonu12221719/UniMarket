const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post("/register", upload.single("idCardImg"), registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
