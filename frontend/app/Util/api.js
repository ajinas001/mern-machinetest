import axios from "axios";

// Define base URL from environment variable
const API_BASE_URL ="http://localhost:5000";

// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, 
//   headers: {
//     "Content-Type": "application/json",
//   },
});

export default api;
