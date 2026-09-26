import Image from "next/image";
import React from "react";
import { GoClock } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaFire } from "react-icons/fa";


const WorkoutCard = ({ workout }) => {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    difficulty,
    duration,
    caloriesBurned,
    sets,
    reps,
    rating,
    description,
    instructions,
  } = workout;
  return (
    <div className="card h-full w-full bg-base-100 shadow-sm">
      <figure className="aspect-video overflow-hidden">
        <Image
          src={image}
          alt="error fetching photo"
          width={640}
          height={360}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-full w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              muscle={muscle}
              className="badge bg-[#C2F800] text-gray-800"
            >
              {muscleGroups}
            </span>
          ))}
        </div>
        <h2 className="card-title">{name}</h2>
        <p>{equipment}</p>
        <div className="card-actions  justify-between px-6">
          <div className="text-sm font-light flex items-center">
            <GoClock />
            {duration}
          </div>
          <div className="text-sm font-light flex items-center">
            <FaFire />
            {caloriesBurned}
          </div>
          <div className="text-sm font-light flex items-center">
            <FaRegStar />
            {rating}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
