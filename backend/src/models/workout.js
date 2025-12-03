import mongoose from "mongoose";

// 1- create a schema
// 2- create a model based off that schema

const workoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const Workout = mongoose.model("Workout", workoutSchema);

export default Workout;
