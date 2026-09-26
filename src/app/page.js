import WorkoutCard from "./components/WorkoutCard";
import Banner from "./components/Banner";

export const metadata = {
  title: "Home",
};

export default async function Home() {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const workouts = await response.json();

  return (
    <div className="">
      <main className="">
        <Banner />
        <section id="workouts" className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-8 lg:px-10">
          <header className="mb-6 space-y-1 text-base-content">
            <h2 className="text-3xl font-bold">The Library</h2>
            <p className="text-sm opacity-70">
              Twelve lifts covering every muscle group.
            </p>
          </header>
          <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
