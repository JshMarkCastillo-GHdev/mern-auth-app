import express from "express";
import dotenv from "dotenv";
// Cross site CORS
import cors from "cors";

// Local imports
import workoutRoutes from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

// Dotenv
dotenv.config();

// create the express app
const app = express();
const serverPort = process.env.PORT || 5001;

// Read JSON Response
app.use(express.json());

// Allow backend fetch during development
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Setup Routes and add Middleware(rateLimiting)
app.use("/api/workouts", ratelimiter, workoutRoutes);

// app listen for request, BUT check database first
connectDB().then(() => {
  app.listen(serverPort, () => {
    console.log("Server listening on port:", serverPort);
  });
});
