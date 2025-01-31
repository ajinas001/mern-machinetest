import express from "express";
import { verifyToken } from "../middleware/Checkauth.js";
import { loginUser, logoutUser } from "../controller/authController.js";

const authRoutes = express.Router();

// Route for user login
authRoutes.post("/login", loginUser);
authRoutes.post("/logout", logoutUser);

// Protected route for verifying the token
authRoutes.get("/verify", verifyToken, (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user, // User details decoded from token
        message: "Authorized",
    });
});

export default authRoutes;
