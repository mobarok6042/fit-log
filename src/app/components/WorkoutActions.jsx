"use client";

import { useEffect, useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import {
  COLLECTIONS_UPDATED_EVENT,
  readWorkoutCollection,
  toggleWorkoutInCollection,
} from "../lib/workoutCollections";

const WorkoutActions = ({ workout }) => {
  const [isPlanned, setIsPlanned] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      setIsPlanned(
        readWorkoutCollection("plan").some((item) => String(item.id) === String(workout.id)),
      );
      setIsSaved(
        readWorkoutCollection("saved").some((item) => String(item.id) === String(workout.id)),
      );
    };

    updateStatus();
    window.addEventListener(COLLECTIONS_UPDATED_EVENT, updateStatus);
    window.addEventListener("storage", updateStatus);
    return () => {
      window.removeEventListener(COLLECTIONS_UPDATED_EVENT, updateStatus);
      window.removeEventListener("storage", updateStatus);
    };
  }, [workout.id]);

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        aria-pressed={isPlanned}
        onClick={() => {
          const updated = toggleWorkoutInCollection("plan", workout);
          setIsPlanned(updated.some((item) => String(item.id) === String(workout.id)));
        }}
        className="btn bg-[#C2F800] text-black"
      >
        <SlCalender aria-hidden="true" />
        {isPlanned ? "Added to Today's Plan" : "Add To Today's Plan"}
      </button>
      <button
        type="button"
        aria-pressed={isSaved}
        onClick={() => {
          const updated = toggleWorkoutInCollection("saved", workout);
          setIsSaved(updated.some((item) => String(item.id) === String(workout.id)));
        }}
        className="btn"
      >
        <CiBookmark aria-hidden="true" />
        {isSaved ? "Saved for Later" : "Save For Later"}
      </button>
    </div>
  );
};

export default WorkoutActions;