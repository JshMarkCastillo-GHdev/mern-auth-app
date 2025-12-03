import axios from "axios";

// If app is in production, there is no localhost so this will make the URL dynamic
// based on the hosting provider (render, vercel etc.)
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
