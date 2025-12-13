import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import toast from "react-hot-toast";
import { LoaderIcon, Trash2Icon } from "lucide-react";
import api from "../lib/axios";
import RateLimitedUI from "../components/RateLimitedUI";

const WorkoutDetail = ({ id, isRateLimited, modal_id, setWorkouts }) => {
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // const { id } = useParams(); // NOT USING ROUTING ANYMORE

  useEffect(() => {
    // FEAT: IF ID PASSED IS NULL RETURN
    if (!id) return;

    const fetchWorkout = async () => {
      try {
        const res = await api.get(`/workouts/${id}`);
        setWorkout(res.data);
        isRateLimited = false;
      } catch (error) {
        console.log("Error loading workout", error);
        if (error.response.status === 429) {
          isRateLimited = true;
        } else {
          toast.error("failed to load workout.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchWorkout();
  }, [id, isRateLimited]);

  // FEAT: IF ID PASSED IS NULL RETURN
  if (!id || !workout) return null;

  const handleDelete = async () => {
    if (!window.confirm("Delete this workout?")) return;
    try {
      await api.delete(`/workouts/${id}`);
      toast.success("Workout deleted sucessfully");

      // FEAT: Update the list after deletion
      const res = await api.get("/workouts");
      setWorkouts(res.data);
      // FEAT: CLOSE POPUP HERE
      document.getElementById(modal_id).close();
    } catch (error) {
      console.log("Error deleting workout.", error);
      toast.error("Failed to delete workout.");
    }
  };

  const handleSave = async () => {
    if (!workout.title.trim()) {
      toast.error("Please add a title to this workout");
      return;
    }

    // FEAT: ALSO CHECK THE Reps and Load per KG value if proper type.
    // FEAT: Reps or Load must not be empty (DONE)
    if (
      isNaN(workout.reps) ||
      Number(workout.reps) <= 0 ||
      isNaN(workout.load) ||
      Number(workout.load) <= 0
    ) {
      toast.error("Reps or Load must be valid values and not empty.", {
        duration: 4000,
      });
      return;
    }

    setSaving(true);
    try {
      await api.patch(`/workouts/${id}`, workout);
      toast.success("Workout updated");
      // URG: CLOSE THE POPUP, BUT ACTIVATE THE BUTTON FOR SAVING AGAIN.
      // URG: Refresh the Homepage
      const res = await api.get("/workouts");
      setWorkouts(res.data);
      document.getElementById(modal_id).close();
    } catch (error) {
      console.log("Error saving workout.", error);
      toast.error("Failed to update the note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-1">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Workout Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Workout title"
                  className="input input-bordered"
                  value={workout.title}
                  onChange={(e) =>
                    setWorkout({ ...workout, title: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Reps:</span>
                </label>
                <input
                  placeholder="Add Reps to the workout"
                  className="input input-bordered"
                  value={workout.reps}
                  onChange={(e) =>
                    setWorkout({ ...workout, reps: e.target.value })
                  }
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Load(kg):</span>
                </label>
                <input
                  placeholder="Add Reps to the workout"
                  className="input input-bordered"
                  value={workout.load}
                  onChange={(e) =>
                    setWorkout({ ...workout, load: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Save Changes & Close" : "Save Changes & Close"}{" "}
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-error btn-outline"
                >
                  <Trash2Icon className="h-5 w-5" />
                  Delete Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetail;
