const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized access. Token missing." });
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract only the token
    if (!token) {
        return res.status(401).json({ message: "Invalid token format." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // ✅ Now `req.user` contains all user data (id, college, etc.)
        console.log("User verified:", req.user);
        
        next();
    } catch (error) {
        console.log("JWT Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please refresh your token." });
        }

        return res.status(403).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
