import Image from "next/image";
import Link from "next/link";
import { FiCheck, FiExternalLink, FiX } from "react-icons/fi";
import {
    removeWorkoutFromCollection,
} from "../lib/workoutCollections";
import { GoClock } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaFire } from "react-icons/fa";
import { toast } from "react-toastify";

const MyCard = ({ workout, collection, onChange }) => {
    const isPlan = collection === "plan";

    const removeWorkout = () => {
        removeWorkoutFromCollection(collection, workout.id);
        toast.info(`Removed ${workout.name} from ${isPlan ? "today's plan" : "saved workouts"}`);
        onChange();
    };

    const markCompleted = () => {
        removeWorkoutFromCollection("plan", workout.id);
        toast.success(`${workout.name} marked as done`);
        onChange();
    };

    return (
        <article className="grid w-full grid-cols-[5rem_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-base-300 bg-base-100 p-3 shadow-sm sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:gap-5 sm:p-4">
            <Link
                href={`/workouts/${workout.id}`}
                aria-label={`View details for ${workout.name}`}
                className="relative block shrink-0 overflow-hidden rounded-md"
                style={{
                    width: "clamp(5rem, 18vw, 9rem)",
                    height: "clamp(6rem, 22vw, 8rem)",
                }}
            >
                <Image
                    src={workout.image}
                    alt={`${workout.name} workout`}
                    fill
                    sizes="(max-width: 640px) 5rem, 9rem"
                    className="object-cover"
                />
            </Link>
            <div className="min-w-0 space-y-1">
                <h2 className="truncate text-base font-bold sm:text-xl">{workout.name}</h2>
                <p className="truncate text-sm opacity-70">{workout.equipment}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
                    <div className="flex flex-row items-center"> <GoClock className="text-[#C2F800]" /> <span> {workout.duration} min</span></div>
                    <div className="flex flex-row items-center"><FaFire  className="text-[#C2F800]"/><span>{workout.caloriesBurned} kcal</span></div>
                    <div className="flex flex-row items-center"><FaRegStar  className="text-[#C2F800]"/><span>{workout.rating}</span></div>
                </div>
                        {isPlan && workout.completed && (
                            <span className="text-xs font-semibold text-green-700">Completed</span>
                        )}
            </div>
            <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
                <Link
                    href={`/workouts/${workout.id}`}
                    aria-label={`View details for ${workout.name}`}
                    title="View details"
                    className="btn btn-ghost btn-sm btn-square"
                >
                    <FiExternalLink aria-hidden="true" size={18} />
                </Link>
                {isPlan && (
                    <button
                        type="button"
                            aria-label="Mark as done"
                            title="Mark as done"
                            onClick={markCompleted}
                            className="btn btn-ghost btn-sm btn-square"
                    >
                        <FiCheck aria-hidden="true" size={18} />
                    </button>
                )}
                <button
                    type="button"
                    aria-label={`Remove ${workout.name}`}
                    title="Remove"
                    onClick={removeWorkout}
                    className="btn btn-ghost btn-sm btn-square text-error"
                >
                    <FiX aria-hidden="true" size={18} />
                </button>
            </div>
        </article>
    );
};

export default MyCard;