import React from "react";
import WorkoutCard from "../components/WorkoutCard";

const WorkoutsPage = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const workouts = await res.json();

  return (
    <div>
      <div className="mx-auto mb-5 w-full px-4 pt-8 lg:px-10">
        <p className="text-3xl font-bold text-[#171717]">The Library</p>

        <p className="text-sm font-light text-gray-600">
          Twelve lifts covering every muscle group.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:px-10 justify-center">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout}></WorkoutCard>
        ))}
      </div>
    </div>
  );
};

export default WorkoutsPage;
