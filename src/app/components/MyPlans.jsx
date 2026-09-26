"use client";

import MyCard from "./MyCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COLLECTIONS_UPDATED_EVENT,
  readWorkoutCollection,
} from "../lib/workoutCollections";

const MyPlans = ({ initialCollection }) => {
  const [activeCollection, setActiveCollection] = useState(initialCollection);
  const [workouts, setWorkouts] = useState([]);
  const totalMinutes = workouts.reduce((total, workout) => total + Number(workout.duration || 0), 0);
  const totalCalories = workouts.reduce((total, workout) => total + Number(workout.caloriesBurned || 0), 0);

  useEffect(() => {
    const updateWorkouts = () =>
      setWorkouts(readWorkoutCollection(activeCollection));
    updateWorkouts();
    window.addEventListener(COLLECTIONS_UPDATED_EVENT, updateWorkouts);
    window.addEventListener("storage", updateWorkouts);
    return () => {
      window.removeEventListener(COLLECTIONS_UPDATED_EVENT, updateWorkouts);
      window.removeEventListener("storage", updateWorkouts);
    };
  }, [activeCollection]);

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-7xl px-4 py-8 lg:px-10">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">My Plan</h1>
        <p className="mt-1 text-sm opacity-70">
          Cap of five lifts for today.Finish them,then load more.
        </p>
      </header>
      <section aria-label="Workout statistics" className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-base-300 bg-base-200 p-4 sm:p-6">
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-xs font-light opacity-70 sm:text-sm">Workouts</p>
          <p className="text-2xl font-bold">{workouts.length}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-xs font-light opacity-70 sm:text-sm">Minutes</p>
          <p className="text-2xl font-bold">{totalMinutes}</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-xs font-light opacity-70 sm:text-sm">Calories</p>
          <p className="text-2xl font-bold">{totalCalories}</p>
        </div>
      </section>
      <div
        className="join mb-6"
        role="group"
        aria-label="Choose workout collection"
      >
        <button
          type="button"
          aria-pressed={activeCollection === "plan"}
          onClick={() => setActiveCollection("plan")}
          className={`btn join-item ${activeCollection === "plan" ? "bg-[#C2F800] text-black" : ""}`}
        >
          Today&apos;s Plan
        </button>
        <button
          type="button"
          aria-pressed={activeCollection === "saved"}
          onClick={() => setActiveCollection("saved")}
          className={`btn join-item ${activeCollection === "saved" ? "bg-[#C2F800] text-black" : ""}`}
        >
          Saved for Later
        </button>
      </div>
      {workouts.length > 0 ? (
        <div className="flex w-full flex-col gap-3">
          {workouts.map((workout) => (
            <MyCard
              key={workout.id}
              workout={workout}
              collection={activeCollection}
              onChange={() => setWorkouts(readWorkoutCollection(activeCollection))}
            />
          ))}
        </div>
      ) : (
        <div className="border-t border-base-300 py-8">
          <p className="font-semibold">
            {activeCollection === "plan"
              ? "Your plan is empty."
              : "No saved workouts yet."}
          </p>
          <Link
            href="/#workouts"
            className="mt-3 inline-block font-semibold text-[#587400] underline"
          >
            Browse workouts
          </Link>
        </div>
      )}
    </main>
  );
};

export default MyPlans;
