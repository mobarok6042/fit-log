import React from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  return (
    <div>
      <div className="hero bg-base-200 lg:py-40">
        <div className="hero-content flex-col lg:flex-row-reverse lg:gap-52">
          <Image
            src="/banner.png"
            width={400}
            height={400}
            alt="error fetching file"
          ></Image>
          <div>
            <p className="text-[#C2F800] font-bold text-2xl lg:mb-6">WORKOUT LIBRARY</p>
            <h1 className="text-5xl font-bold lg:mb-6">
              TRAIN WITH INTENT,LOG EVERY SET.
            </h1>
            <p className="py-6">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into todays plan, and watch the weeks work add up.
            </p>
            <Link href="#workouts">
            <button className="btn bg-[#C2F800] text-xl font-bold text-black m-2">Browse Workouts</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
