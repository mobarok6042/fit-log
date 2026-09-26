export const COLLECTIONS_UPDATED_EVENT = "fitlog:collections-updated";

const storageKeys = {
  plan: "fitlog:today-plan",
  saved: "fitlog:saved-workouts",
};

export function readWorkoutCollection(collection) {
  if (typeof window === "undefined") return [];

  try {
    const workouts = JSON.parse(localStorage.getItem(storageKeys[collection]) ?? "[]");
    return Array.isArray(workouts) ? workouts : [];
  } catch {
    return [];
  }
}

export function toggleWorkoutInCollection(collection, workout) {
  const current = readWorkoutCollection(collection);
  const alreadyAdded = current.some((item) => String(item.id) === String(workout.id));
  const updated = alreadyAdded
    ? current.filter((item) => String(item.id) !== String(workout.id))
    : [...current, workout];

  localStorage.setItem(storageKeys[collection], JSON.stringify(updated));
  window.dispatchEvent(new Event(COLLECTIONS_UPDATED_EVENT));
  return updated;
}

function saveWorkoutCollection(collection, workouts) {
  localStorage.setItem(storageKeys[collection], JSON.stringify(workouts));
  window.dispatchEvent(new Event(COLLECTIONS_UPDATED_EVENT));
  return workouts;
}

export function removeWorkoutFromCollection(collection, workoutId) {
  const workouts = readWorkoutCollection(collection).filter(
    (item) => String(item.id) !== String(workoutId),
  );
  return saveWorkoutCollection(collection, workouts);
}

export function setWorkoutCompletion(workoutId, completed) {
  const workouts = readWorkoutCollection("plan").map((item) =>
    String(item.id) === String(workoutId) ? { ...item, completed } : item,
  );
  return saveWorkoutCollection("plan", workouts);
}