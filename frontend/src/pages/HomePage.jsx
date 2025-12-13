import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import api, { rateLimitHandler } from "../lib/axios";
import RateLimitedUI from "../components/RateLimitedUI";
import WorkoutsNotFound from "../components/WorkoutsNotFound";
import WorkoutCard from "../components/workoutCard";
import WorkoutForm from "../components/WorkoutForm";
import Popup from "../components/Popup";
import WorkoutDetail from "../components/WorkoutDetail";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Popup handlers
  const [selectedWorkoutId, setSelectedWorkoutId] = useState(null);
  const [isWorkoutDetailOpen, setIsWorkoutDetailOpen] = useState(false);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const res = await api.get("/workouts");
        setWorkouts(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error Fetching workouts");
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
    rateLimitHandler(setIsRateLimited);
  }, []);

  const openWorkoutDetails = (id) => {
    setSelectedWorkoutId(id);
    setIsWorkoutDetailOpen(true);
    document.getElementById("modal_detail").showModal();

    // console.log("Workout ID: ", id);
    // console.log("Workout Open?: ", isWorkoutDetailOpen);
  };

  const closeWorkoutDetails = () => {
    setSelectedWorkoutId(null);
    setIsWorkoutDetailOpen(false);
  };

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

        {workouts.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                setWorkouts={setWorkouts}
                onOpen={openWorkoutDetails}
              />
            ))}
          </div>
        )}
      </div>

      <Popup modal_id="modal_form">
        {isRateLimited ? (
          <RateLimitedUI />
        ) : (
          <WorkoutForm modal_id="modal_form" setWorkouts={setWorkouts} />
        )}
      </Popup>

      <Popup modal_id="modal_detail" onClose={closeWorkoutDetails}>
        {isRateLimited ? (
          <RateLimitedUI />
        ) : (
          isWorkoutDetailOpen &&
          selectedWorkoutId && (
            <WorkoutDetail
              id={selectedWorkoutId}
              isRateLimited={isRateLimited}
              modal_id="modal_detail"
              setWorkouts={setWorkouts}
            />
          )
        )}
      </Popup>
    </div>
  );
};

export default HomePage;
