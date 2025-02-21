const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const messageRoutes = require("./routes/messageRoutes");
const razorpaypaymentRoutes = require("./routes/razorpayPaymentRoutes");
const chatbotRoute = require("./routes/chatbotRoute");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:5173", // Allow frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/payment", razorpaypaymentRoutes);
app.use("/api/chat-bot", chatbotRoute);

// Create HTTP server for Socket.io
const server = http.createServer(app);

// Initialize Socket.io with CORS configuration
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

// WebSocket event handling for real-time messaging
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send_message", (data) => {
    const { sender, receiver, content } = data;
    io.to(receiver).emit("receive_message", { sender, receiver, content });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
