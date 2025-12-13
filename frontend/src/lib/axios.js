import axios from "axios";

// If app is in production, there is no localhost so this will make the URL dynamic
// based on the hosting provider (render, vercel etc.)
const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api";

const api = axios.create({
  baseURL: BASE_URL,
});

// What does this do
// In order to immediately catch 429 Fast, I made a rateLimitHandler
// in order to signal Home.jsx
export const rateLimitHandler = (setIsRateLimited) => {
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response.status === 429) {
        setIsRateLimited(true); // Fire a 429 Rate Limit signal to Home
      }
      return Promise.reject(err);
    }
  );
};

export default api;
