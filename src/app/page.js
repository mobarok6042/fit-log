import { Suspense } from "react";
import WorkoutCard from "./components/WorkoutCard";
import Banner from "./components/Banner";

export const metadata = {
  title: "Home",
};

function LibraryHeading() {
  return (
    <header className="mb-6 space-y-1 text-base-content">
      <h2 className="text-3xl font-bold">The Library</h2>
      <p className="text-sm opacity-70">
        Twelve lifts covering every muscle group.
      </p>
    </header>
  );
}

async function WorkoutLibrary() {
  const response = await fetch("https://api.api-store.workers.dev/api/fitlog");
  const workouts = await response.json();

  return (
    <section id="workouts" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-8 lg:px-10">
      <LibraryHeading />
      <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </section>
  );
}

function WorkoutLibraryFallback() {
  return (
    <section
      id="workouts"
      aria-busy="true"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-8 lg:px-10"
    >
      <LibraryHeading />
      <div role="status" className="flex min-h-64 flex-col items-center justify-center gap-3">
        <span className="loading loading-spinner loading-lg text-[#C2F800]" aria-hidden="true" />
        <span className="text-sm opacity-70">Loading workouts...</span>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Banner />
      <Suspense fallback={<WorkoutLibraryFallback />}>
        <WorkoutLibrary />
      </Suspense>
    </main>
  );
}
