import { useState } from "react";
import api from "../lib/axios";
import toast from "react-hot-toast";

const WorkoutForm = ({ modal_id, setWorkouts }) => {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(reps);
    console.log(load);

    // Values must not be empty
    if (!title.trim() || !reps.trim() || !load.trim()) {
      toast.error("All fields are required", { duration: 1000 });
      return;
    }

    // Values must be a number and not negative
    if (isNaN(reps) || Number(reps) <= 0 || isNaN(load) || Number(load) <= 0) {
      toast.error("Reps or Load must be valid values", { duration: 4000 });
      return;
    }
    setLoading(true);

    try {
      await api.post("/workouts", {
        title,
        reps,
        load,
      });
      // Since there are changes, call the list again
      const res = await api.get("/workouts");
      toast.success(`Workout ${title} created!`, { duration: 1000 });

      // if request is success
      // Set all forms to blank again.
      setTitle("");
      setReps("");
      setLoad("");

      // Refresh the list && Close the Modal Popup
      setWorkouts(res.data);
      document.getElementById(modal_id).close();
    } catch (error) {
      console.log("Error creating workout");
      if (error.response.status === 429) {
        toast.error("You are doing that action too fast.", {
          duration: 4000,
          icon: "⚠",
        });
      } else {
        toast.error("Failed to create workout.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-1">
      <div className="container mx-auto px-4 ">
        <div className="max-w-2xl mx-auto">
          <div className="card b-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Workout</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Workout Title:</span>
                  </label>
                  <input
                    autoFocus
                    type="text"
                    placeholder="Add a Workout Name"
                    className="input input-bordered"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Reps:</span>
                  </label>
                  <input
                    placeholder="Add Reps to the workout"
                    className="input input-bordered"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Load (in kg):</span>
                  </label>
                  <input
                    placeholder="Add Loads to the workout"
                    className="input input-bordered"
                    value={load}
                    onChange={(e) => setLoad(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating..." : "Create Workout"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutForm;
