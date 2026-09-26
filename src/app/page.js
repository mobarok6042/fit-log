import WorkoutCard from "./components/WorkoutCard";
import Banner from "./components/Banner";

export default async function Home() {
  const response = await fetch("https://api.abcz.workers.dev/api/fitlog");
  const workouts = await response.json();

  return (
    <div className="">
      <main className="">
        <Banner />
        <section className="mx-auto grid grid-cols-1 justify-center gap-4 px-4 py-8 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </section>
      </main>
    </div>
  );
}
