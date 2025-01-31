import api  from "./api";

export const saveDistributionData = async (distributedData) => {
    try {
        const response = await api.post("/distribution/save", { distributedData }); // Adjust the endpoint as needed
        if (response.data) {
            console.log("Save Distribution Success:", response.data);
            return { success: true, data: response.data};
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("Save Distribution Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Failed to save distribution data";
    }
};

export const fetch = async () => {
    try {
        const response = await api.get("/distribution/fetch"); // Adjust the endpoint as needed
        if (response.data) {
            console.log("fetch Distribution Success:", response.data);
            return { success: true, data: response.data };
        } else {
            throw new Error("Invalid response from server");
        }
    } catch (error) {
        console.error("fetch Distribution Error:", error.response?.data || error.message);
        throw error.response?.data?.message || "Failed to fetch distribution data";
    }
};

