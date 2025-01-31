
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import Admin from "../models/Admin.js";


// User Login
const loginUser = async (req, res) => {
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
        res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

export default loginUser
