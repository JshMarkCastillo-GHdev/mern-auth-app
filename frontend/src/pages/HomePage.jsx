import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import api from "../lib/axios";
import RateLimitedUI from "../components/RateLimitedUI";
import WorkoutsNotFound from "../components/WorkoutsNotFound";
import WorkoutCard from "../components/workoutCard";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await api.get("/workouts");
        setWorkouts(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.error("Error Fetching workouts", error);
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load workouts");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="min-h-screen font-poppins">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">
            Loading Workouts...
          </div>
        )}
        {workouts.length === 0 && !isRateLimited && <WorkoutsNotFound />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workouts.length > 0 && !isRateLimited && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map((workout) => (
                <WorkoutCard
                  key={workout._id}
                  workout={workout}
                  setWorkouts={setWorkouts}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
