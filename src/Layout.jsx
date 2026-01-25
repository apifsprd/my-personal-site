import { Languages } from "lucide-react";
import React from "react";

function Layout({ lang, onSetLang, children }) {
  return (
    <>
      <main className="w-full min-h-screen flex flex-col gap-8 px-4 py-4 sm:px-[20vw] lg:px-[25vw] bg-white">
        <section className="w-full h-auto flex flex-row justify-between items-center pt-4">
          <div>
            <a href="/">
              <img
                src="/images/profile/vetorized-1x1.png"
                alt=""
                className="w-14 h-14 object-cover rounded-lg border border-slate-100 shadow-md"
              />
            </a>
          </div>
          <nav className="flex flex-row justify-start items-center gap-0 py-3 px-8 rounded-full bg-white shadow-md">
            <ul className="flex flex-row justify-start items-center gap-6">
              <li>
                <a
                  href="#"
                  className="font-semibold text-sky-500 hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Beranda" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Tentang" : "About"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Kemampuan" : "Skill"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Proyek" : "Project"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Kontak" : "Contact"}
                </a>
              </li>
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSetLang(lang === "id" ? "en" : "id")}
              className="w-16 p-2 flex gap-1 justify-center items-center rounded-full bg-white shadow-md  hover:bg-sky-200 transition-colors duration-300 cursor-pointer"
            >
              <Languages size={18} />
              <span className="font-inter font-semibold text-sm uppercase">
                {lang}
              </span>
            </button>
          </div>
        </section>
        {children}
      </main>
      <footer className="flex justify-center items-center p-4 mt-14 bg-sky-200">
        <span className="text-xs font-inter font-normal text-slate-900 lg:text-sm">
          &copy; {new Date().getFullYear()} Apif Supriadi
        </span>
      </footer>
    </>
  );
}

export default Layout;
