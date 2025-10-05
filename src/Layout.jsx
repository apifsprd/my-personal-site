import React from "react";

function Layout({ children }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 py-4 sm:px-[20vw] lg:px-[30vw] bg-white">
        <div className="w-full h-auto flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="w-1.5 h-1.5 bg-sky-600 rounded-full" />
            <a
              href="/"
              className="font-inter font-semibold text-black text-xs md:text-base lg:text-lg hover:bg-yellow-100"
            >
              @apifsprd
            </a>
          </div>
        </div>
        {children}
      </div>
      <footer className="flex justify-center items-center p-4 mt-14 bg-slate-100">
        <span className="text-xs font-inter font-normal text-slate-500 lg:text-sm">
          &copy; 2025 Apif Supriadi
        </span>
      </footer>
    </>
  );
}

export default Layout;
