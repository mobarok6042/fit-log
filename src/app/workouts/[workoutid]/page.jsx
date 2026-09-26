import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import WorkoutActions from "../../components/WorkoutActions";

export async function generateMetadata({ params }) {
  const { workoutid } = await params;

  try {
    const response = await fetch(
      `https://api.abcz.workers.dev/api/fitlog/${workoutid}`,
    );
    if (!response.ok) return { title: "Workout Details" };

    const workout = await response.json();
    return { title: workout.name };
  } catch {
    return { title: "Workout Details" };
  }
}

const WorkoutDetailPage = async ({ params }) => {
  const { workoutid } = await params;
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${workoutid}`,
  );

  if (!response.ok) {
    notFound();
  }

  const workout = await response.json();
  return (
    <main className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 py-6 md:gap-8 md:px-6 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.15fr_0.85fr] lg:items-stretch lg:gap-10 lg:px-8">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[16/10] lg:aspect-auto lg:min-h-[calc(100vh-4rem)]">
        <Image
          src={workout.image}
          alt={`${workout.name} workout`}
          fill
          sizes="(max-width: 1500px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
      <div className="flex min-w-0 w-full flex-col gap-4  p-4 md:gap-5 md:p-6">
        <p className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">{workout.name}</p>
        <p className="font-light">{workout.description}</p>
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span key={muscle} className="badge bg-[#C2F800] text-gray-800">
              {muscle}
            </span>
          ))}
        </div>
        <div className="rounded-2xl bg-base-200 p-5 text-base-content">
          <table className="table w-full table-fixed text-base-content">
            <tbody>
              <tr>
                <td className="w-1/2 break-words py-3 px-4">Equipment</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.equipment}</td>
              </tr>

              <tr>
                <td className="w-1/2 break-words py-3 px-4">Difficulty</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.difficulty}</td>
              </tr>

              <tr>
                <td className="w-1/2 break-words py-3 px-4">Set</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.sets}</td>
              </tr>

              <tr>
                <td className="w-1/2 break-words py-3 px-4">Reps</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.reps}</td>
              </tr>

              <tr>
                <td className="w-1/2 break-words py-3 px-4">Duration</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.duration}</td>
              </tr>

              <tr>
                <td className="w-1/2 break-words py-3 px-4">Calories</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.caloriesBurned}</td>
              </tr>

              <tr>
                <td className="w-1/2 break-words py-3 px-4">Rating</td>
                <td className="w-1/2 break-words py-3 px-4">{workout.rating}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap gap-3">
          <p className="text-2xl font-bold">INSTRUCTIONS</p>
          {workout.instructions.map((instruction, index) => (
            <div
              key={instruction}
              className="flex gap-1 p-2 text-gray-400 text-sm"
            >
              <span>{index + 1}</span>.<span>{instruction}</span>
            </div>
          ))}
        </div>
        <WorkoutActions workout={workout} />
      </div>
    </main>
  );
};

export default WorkoutDetailPage;
