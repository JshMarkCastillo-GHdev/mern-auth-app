import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const WorkoutCard = ({ workout, setWorkouts }) => {
  // Delete function
  const handleDelete = async (e, id) => {
    e.preventDefault(); // prevent the navigation behaviour
    if (!window.confirm("Delete this workout?")) return;
    try {
      await api.delete(`/workouts/${id}`);
      setWorkouts((prev) => prev.filter((workout) => workout._id !== id));
      toast.success("Workout deleted successfully.");
    } catch (error) {
      console.log("Error in handleDelete.", error);
      toast.error("Failed to delete workout");
    }
  };
  return (
    <Link
      to={`/workouts/${workout._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
  border-4 border-solid border-[#e2a808]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{workout.title}</h3>
        <p className="text-base-content/70 line-clamp-3">
          <b>Reps:</b> {workout.reps}
        </p>
        <p className="text-base-content/70 line-clamp-3">
          <b>Load:</b> {workout.load} (kg)
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(new Date(workout.createdAt))}
          </span>
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-xs text-white">
              <PenSquareIcon className="size-4" />
            </button>
            <button
              className="btn btn-ghost btn-xs text-red-700"
              onClick={(e) => handleDelete(e, workout._id)}
            >
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
