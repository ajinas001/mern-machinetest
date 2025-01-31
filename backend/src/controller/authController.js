import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";  

// User Login Handler
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,

            maxAge: 3600 * 1000,  // 1 hour

        });

        return res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

export const logoutUser = (req, res) => {
    res.clearCookie("token", { httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
};

export default loginUser;
