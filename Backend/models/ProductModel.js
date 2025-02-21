const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true }, // Reference to user
    college: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category:{type:String,required:true},
    price: { type: Number, required: true },
    photo: { type: String, required: true }, // Image URL or path
    video: { type: String, required: false }, // Video URL or path (optional)
    isPaid: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
