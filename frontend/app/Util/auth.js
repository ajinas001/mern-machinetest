// import Cookies from "js-cookie";
import api from "./api"; // Your API setup for Axios requests

// Login function
export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });

        if (response.data) {
            console.log("Login Successful:", response.data);
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        return { success: false, message: "Invalid credentials" };
    }
};

// Token verification
export const verifyToken = async () => {
    try {
        const response = await api.get("/auth/verify", { withCredentials: true })
        if (response.status === 200) {
            console.log("Token is valid");
            return { success: true, data: response.data };
        }
    } catch (error) {
        console.error("Token verification error:", error.response?.data || error.message);
        return { success: false, message: "Token invalid or expired" };
    }
};
// Logout function
export const logout = async () => {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        console.error("Logout error:", error);
    }
};

// Get Current User
export const getCurrentUser = async () => {
    try {
        const response = await api.get("/auth/me");
        return response.data;
    } catch (error) {
        return null;
    }
};
