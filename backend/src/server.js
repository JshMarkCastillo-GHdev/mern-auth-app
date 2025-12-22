import express from "express";
import dotenv from "dotenv";
// Cross site CORS
import cors from "cors";

// Deployment to RENDER
import path from "path";

// Local imports
import workoutRoutes from "./routes/routes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "./middleware/rateLimiter.js";

// Dotenv
dotenv.config();

// create the express app
const app = express();
const serverPort = process.env.PORT || 5001;

// Deployment to RENDEr
const __dirname = path.resolve();

// Read JSON Response
app.use(express.json());

// Allow backend fetch during development
if (process.env.NODE_ENV !== "production") {
  // Activate CORS if we are in Dev Mode
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}

// Setup Routes and add Middleware(rateLimiting)
app.use("/api/workouts", ratelimiter, workoutRoutes);

// app listen for request, BUT check database first
connectDB().then(() => {
  app.listen(serverPort, () => {
    console.log("Server listening on port:", serverPort);
  });
});
