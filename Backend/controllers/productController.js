const Product = require("../models/ProductModel.js");

exports.createProduct = async (req, res) => {
    try {
        const { name, description,category, price } = req.body;
        const userId = req.user.id; // Extract user ID from token
        const college = req.user.college
        console.log("College:",college);
        
        const photo = req.files["photo"] ? req.files["photo"][0].path : null;
        const video = req.files["video"] ? req.files["video"][0].path : null;

        if (!photo) return res.status(400).json({ message: "Photo is required" });

        const product = new Product({
            user: userId,
            college: college,
            name,
            description,
            category,
            price,
            photo,
            video
        });

        await product.save();
        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserProducts = async (req, res) => {
    try {
        const userId = req.user.id;
        const products = await Product.find({ user: userId });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("user", "firstName lastName email");
        if (!product) return res.status(404).json({ message: "Product not found" });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


exports.getProductsByCollege = async (req, res) => {
    try {
        const { college } = req.user; // Extract college from authenticated user
        console.log("College:", college);
        
        const products = await Product.find({ college }).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLatestProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .sort({ createdAt: -1 }) // ✅ Sort by latest created first
            .limit(5); // ✅ Limit to last 5 products

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { name, description, category, price } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) return res.status(404).json({ message: "Product not found" });
        if (product.user.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

        product.name = name;
        product.description = description;
        product.category = category;
        product.price = price;

        await product.save();
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteProduct= async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) return res.status(404).json({ message: "Product not found" });
  
      if (product.user.toString() !== req.user.id)
        return res.status(403).json({ message: "Unauthorized" });
  
      await product.deleteOne();
      res.json({ message: "Product deleted" });
    } 
    catch (err) {
        console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };


exports.markProductAsPaid = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        if (product.isPaid) return res.status(400).json({ message: "Product already sold" });

        product.isPaid = true;
        await product.save();
        res.status(200).json({ message: "Product sold successfully", product });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
