"use client";


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBookmark, FiList, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const pathname = usePathname();
  const [hash, setHash] = React.useState("");

  React.useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  const links = (
    <>
      <li>
        <Link href="/#workouts" 
        className={pathname === "/workouts" || (pathname === "/" && hash === "#workouts") ? "text-[#C2F800] bg-[#1A2312] rounded-2xl font-bold" : "rounded-2xl"}
        >
        Workouts</Link>
      </li>
      <li>
        <Link href="/myplans"
         className={pathname === "/myplans" ? "text-[#C2F800] bg-[#1A2312] rounded-2xl font-bold" : "rounded-2xl"}
        >
        My Plans</Link>
      </li>
    </>
  );

  return (
    <div className="navbar sticky top-0 z-50 gap-1 bg-base-100 px-2 shadow-sm sm:gap-2 sm:px-4 lg:px-10">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            aria-label="Open navigation menu"
            className="btn btn-ghost btn-sm px-2 lg:hidden"
          >
            <FiMenu aria-hidden="true" size={20} />
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-3xl z-1 mt-3 w-52 p-2 gap-4 shadow"
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
      <div className="navbar-end gap-1 sm:gap-3">
        <Link href="/myplans" aria-label="Plan" title="Plan" className="btn btn-ghost btn-sm gap-1 px-2 sm:px-3">
          <FiList aria-hidden="true" size={17} />
          <span className="hidden sm:inline">Plan</span>
          <span className="badge badge-xs bg-[#C2F800]">0</span>
        </Link>
        <Link href="/myplans" aria-label="Saved" title="Saved" className="btn btn-ghost btn-sm gap-1 px-2 sm:px-3">
          <FiBookmark aria-hidden="true" size={17} />
          <span className="hidden sm:inline">Saved</span>
          <span className="badge badge-xs">0</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
