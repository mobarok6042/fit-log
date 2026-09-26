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
  const [sortBy, setSortBy] = useState("default");
  const activeWorkouts = workouts.filter(
    (workout) => activeCollection !== "plan" || !workout.completed,
  );
  const totalMinutes = activeWorkouts.reduce((total, workout) => total + Number(workout.duration || 0), 0);
  const totalCalories = activeWorkouts.reduce((total, workout) => total + Number(workout.caloriesBurned || 0), 0);
  const displayedWorkouts = [...activeWorkouts].sort((first, second) => {
      switch (sortBy) {
        case "duration-asc":
          return Number(first.duration || 0) - Number(second.duration || 0);
        case "duration-desc":
          return Number(second.duration || 0) - Number(first.duration || 0);
        case "calories-asc":
          return Number(first.caloriesBurned || 0) - Number(second.caloriesBurned || 0);
        case "calories-desc":
          return Number(second.caloriesBurned || 0) - Number(first.caloriesBurned || 0);
        case "rating-desc":
          return Number(second.rating || 0) - Number(first.rating || 0);
        case "rating-asc":
          return Number(first.rating || 0) - Number(second.rating || 0);
        default:
          return 0;
      }
    });

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
      <section className="mx-auto mb-6 grid w-full grid-cols-3 items-center rounded-2xl border border-base-300 bg-base-200 p-4 sm:p-6">
        <div className="flex min-w-0 flex-col items-center gap-2 px-1">
          <p className="text-center text-xs font-light opacity-70 sm:text-sm">Workouts</p>
          <p className="text-2xl font-bold">{activeWorkouts.length}</p>
        </div>
        <div className="flex min-w-0 flex-col items-center gap-2 px-1">
          <p className="text-center text-xs font-light opacity-70 sm:text-sm">Minutes</p>
          <p className="text-2xl font-bold">{totalMinutes}</p>
        </div>
        <div className="flex min-w-0 flex-col items-center gap-2 px-1">
          <p className="text-center text-xs font-light opacity-70 sm:text-sm">Calories</p>
          <p className="text-2xl font-bold">{totalCalories}</p>
        </div>
      </section>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="join" role="group" aria-label="Choose workout collection">
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
        <label className="flex items-center gap-2">
          <span className="text-sm opacity-70">Sort by</span>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="select select-bordered select-sm w-full sm:w-56"
            aria-label="Sort workouts"
          >
            <option value="default">Default order</option>
            <option value="duration-asc">Duration: shortest first</option>
            <option value="duration-desc">Duration: longest first</option>
            <option value="calories-desc">Calories: highest first</option>
            <option value="calories-asc">Calories: lowest first</option>
            <option value="rating-desc">Rating: highest first</option>
            <option value="rating-asc">Rating: lowest first</option>
          </select>
        </label>
      </div>
      {displayedWorkouts.length > 0 ? (
        <div className="flex w-full flex-col gap-3">
          {displayedWorkouts.map((workout) => (
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
