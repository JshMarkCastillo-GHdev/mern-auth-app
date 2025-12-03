import express from "express";

import {
  getAllWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout,
} from "../controllers/workoutController.js";

// Create routers
const workoutRoutes = express.Router();

workoutRoutes.get("/", getAllWorkouts);
workoutRoutes.get("/:id", getWorkout);
workoutRoutes.post("/", createWorkout);
workoutRoutes.delete("/:id", deleteWorkout);
workoutRoutes.patch("/:id", updateWorkout);

export default workoutRoutes;
