import Link from "next/link";
import { FiArrowLeft, FiHome } from "react-icons/fi";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-5xl items-center px-6 py-16">
      <section className="max-w-2xl border-l-4 border-[#C2F800] py-2 pl-6 sm:pl-10">
        <p className="mb-3 text-sm font-bold uppercase text-[#587400]">Error 404</p>
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          This page isn&apos;t in the log.
        </h1>
        <p className="mt-4 max-w-xl text-base opacity-70 sm:text-lg">
          The address may be incorrect, or the page may have moved. Head back to
          the workout library to keep going.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="btn bg-[#C2F800] text-black">
            <FiHome aria-hidden="true" />
            Home
          </Link>
          <Link href="/#workouts" className="btn btn-ghost">
            <FiArrowLeft aria-hidden="true" />
            Browse workouts
          </Link>
        </div>
      </section>
    </main>
  );
}