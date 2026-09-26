"use client";


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
  const links = (
    <>
      <li>
        <Link href="/workouts" 
        className={pathname === "/workouts" ? "text-[#C2F800] bg-[#1A2312] rounded-2xl font-bold" : ""}
        >
        Workouts</Link>
      </li>
      <li>
        <Link href="/myplans"
         className={pathname === "/myplans" ? "text-[#C2F800] bg-[#1A2312] rounded-2xl font-bold" : ""}
        >
        My Plans</Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
          ></div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-3xl z-1 mt-3 w-52 p-2 shadow"
          >
            {/* links here */}
            {links}
          </ul>
        </div>
        <Link href="/">
          <div className="flex items-center gap-1 sm:gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              width={30}
              height={30}
              className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8"
            />

            <p className="text-xl sm:text-2xl md:text-3xl font-extrabold">
              Fit Log
            </p>
          </div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 rounded-3xl">
          {/* links here */}
          {links}
        </ul>
      </div>
      <div className="navbar-end gap-4">
        <Link href="/myplans">
          <button className="btn">
            Plan <div className="badge badge-sm bg-[#C2F800]">0</div>
          </button>
        </Link>
        <Link href="/myplans">
          <button className="btn">
            Saved <div className="badge badge-sm">0</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
