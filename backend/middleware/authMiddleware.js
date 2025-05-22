const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
        // Extract token
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request object (excluding password)
        req.user = await User.findById(decoded.user.id).select("-password");

        next();
        } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

// Midddle Ware to check if the user is admin

const admin = (req , res , next) => {
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(403).json({message : "Not authorized as an admin"});
    }
};

module.exports = { protect , admin};
