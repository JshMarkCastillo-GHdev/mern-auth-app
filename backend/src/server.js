import express from "express";
import dotenv from "dotenv";

// Local imports
import workoutRoutes from "./routes/routes.js";
import { connectDB } from "./config/db.js";

// Dotenv
dotenv.config();

// create the express app
const app = express();
const serverPort = process.env.PORT || 5001;

// Add middleware and setup routers
app.use(express.json());

// Setup Routes
app.use("/api/workouts", workoutRoutes);

// app listen for request, BUT check database first
connectDB().then(() => {
  app.listen(serverPort, () => {
    console.log("Server listening on port:", serverPort);
  });
});
