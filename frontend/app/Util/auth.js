import api from "./api";

// Login function
export const login = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });
        if (response.data) {
            console.log("Login Success:", response.data);
            return { success: true, data: response.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Login failed";
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
