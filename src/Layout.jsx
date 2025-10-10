import { Languages } from "lucide-react";
import React from "react";

function Layout({ lang, onSetLang, children }) {
  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 py-4 sm:px-[20vw] lg:px-[30vw] bg-white">
        <div className="w-full h-auto flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <img
              src="https://flagcdn.com/w20/id.png"
              srcset="https://flagcdn.com/w40/id.png 2x"
              width="24"
              alt="Indonesia Flag"
              className="border border-yellow-500"
            />
            <img
              src="https://flagcdn.com/w20/ps.png"
              srcset="https://flagcdn.com/w40/ps.png 2x"
              width="30"
              alt="Indonesia Flag"
              className="border border-yellow-500"
            />
            <a
              href="/"
              className="font-inter font-semibold text-black text-sm md:text-base lg:text-lg hover:bg-yellow-100 transition ease-linear duration-300"
            >
              @apifsprd
            </a>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSetLang(lang === "id" ? "en" : "id")}
              className="w-16 p-2 flex gap-1 justify-center items-center rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              <Languages size={18} />
              <span className="font-inter font-semibold text-sm uppercase">
                {lang}
              </span>
            </button>
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
