import api from "./api";

// Fetch Users function
export const fetchUsers = async () => {
    try {
        const response = await api.get("/users/fetch"); // Adjust the endpoint as needed
        if (response.data) {
            console.log("Fetch Users Success:", response.data);
            return { success: true, data: response.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Fetch Users Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Failed to fetch users";
    }
};
export const addUser = async ({ mobile, name, email, password }) => {
    try {
        const response = await api.post("/users/add", { mobile, name, email, password }); // Adjust the endpoint as needed
        if (response.data) {
            console.log("Add User Success:", response.data);
            return { success: true, data: response.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Add User Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Failed to add user";
    }
};

// Edit User function
export const editUser = async ({selectedAgent }) => {
    try {
        const response = await api.put('/users/edit/', {selectedAgent }); // Adjust the endpoint as needed
        if (response.data) {
            console.log("Edit User Success:", response.data);
            return { success: true, data: response.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Edit User Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Failed to edit user";
    }
};

export const deleteUser = async (email) => {
    try {
        const response = await api.post('/users/delete', { data: { email } }); // Use email in the request body for deletion
        if (response.data) {
            console.log("Delete User Success:", response.data);
            return { success: true, data: response.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Delete User Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Failed to delete user";
    }
};

export const uploadfiles = async (data) => {
    try {
        const response = await api.post('/users/upload', data, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (response.data) {
            console.log("File upload success:", response.data);
            return { success: true, message: response.data.message,data:response.data.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("File upload error:", error.response?.data || error.message);
        return { success: false, message: error.response?.data?.message || "Upload failed" };
    }
};
