import Image from "next/image";
import React from "react";


const Footer = () => {
  return (
    <div>
      <footer className="footer sm:footer-horizontal bg-base-300 text-base-content px-8 py-4">
        <aside className="flex flex-col sm:flex-row justify-between items-center w-full gap-3">
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

          <p className="text-center">
            © {new Date().getFullYear()} Fit Log -- Workout Library. Train Hard,
            Log Honest.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
