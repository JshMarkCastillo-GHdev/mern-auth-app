import Workout from "../models/workout.js";
import mongoose from "mongoose";

export async function getAllWorkouts(_, res) {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    console.error("Error in getAllWorkouts controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getWorkout(req, res) {
  try {
    // Destruct the id from req
    const { id } = req.params;

    // If the id format is not valid thru mongoose, throw this error 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Workout" });
    }

    const workout = await Workout.findById(id);

    // If the specified workout is not found
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error("Error in getWorkout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createWorkout(req, res) {
  try {
    // Destructure the request first
    const { title, reps, load } = req.body;
    const workout = new Workout({ title, reps, load });

    // Save to database via ASYNC and AWAIT
    const saveWorkout = await workout.save();
    res.status(201).json(saveWorkout);
  } catch (error) {
    console.error("Error in createWorkout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteWorkout(req, res) {
  try {
    // Destruct the id from req
    const { id } = req.params;

    // If the id format is not valid thru mongoose, throw this error 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Workout" });
    }

    const deletedWorkout = await Workout.findByIdAndDelete(id);

    // If the specified delete workout is not found
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(deletedWorkout);
  } catch (error) {
    console.error("Error in deleteWorkout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateWorkout(req, res) {
  try {
    // Destruct the id from req
    const { id } = req.params;
    const { title, reps, load } = req.body;

    // If the id format is not valid thru mongoose, throw this error 404
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Workout" });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(
      id,
      {
        title,
        reps,
        load,
      },
      {
        new: true,
      }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error("Error in updateWorkout controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
