const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    college: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true,
        unique: true
    },
    idCardImg: {
        type: String,
    }, // Store image path
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
