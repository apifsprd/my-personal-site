import { Languages } from "lucide-react";
import React, { useState } from "react";

function Layout({ lang, onSetLang, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <main className="w-full min-h-screen flex flex-col gap-8 px-4 py-4 sm:px-8 md:px-16 lg:px-[20vw] xl:px-[25vw] bg-white">
        <section className="w-full h-auto flex flex-row justify-between items-center pt-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img
                src="/images/profile/vetorized-1x1.png"
                alt="Profile"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-cover rounded-lg border border-slate-100 shadow-md"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-row justify-start items-center gap-0 py-3 px-8 rounded-full bg-white shadow-md">
            <ul className="flex flex-row justify-start items-center gap-6">
              <li>
                <a
                  href="#"
                  className="font-semibold text-sm xl:text-base text-sky-500 hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Beranda" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-sm xl:text-base text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Tentang" : "About"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-sm xl:text-base text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Kemampuan" : "Skill"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-sm xl:text-base text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Proyek" : "Project"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-sm xl:text-base text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="font-semibold text-sm xl:text-base text-black hover:text-sky-500 transition-all duration-300 cursor-pointer"
                >
                  {lang === "id" ? "Kontak" : "Contact"}
                </a>
              </li>
            </ul>
          </nav>

          {/* Mobile/Tablet Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            {/* <button
              onClick={() => onSetLang(lang === "id" ? "en" : "id")}
              className="w-14 sm:w-16 p-2 flex gap-1 justify-center items-center rounded-full bg-white shadow-md hover:bg-sky-200 transition-colors duration-300 cursor-pointer"
            >
              <Languages size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-inter font-semibold text-xs sm:text-sm uppercase">
                {lang}
              </span>
            </button> */}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-full bg-white shadow-md hover:bg-sky-200 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </section>

        {/* Mobile/Tablet Navigation Menu */}
        {isMenuOpen && (
          <nav
            className={`lg:hidden absolute top-28 left-0 w-full bg-white shadow-lg rounded-lg p-4 transition-all ease-in-out duration-500 ${
              isMenuOpen
                ? "opacity-100 translate-y-0 visible"
                : "opacity-0 -translate-y-4 invisible"
            }`}
          >
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 font-semibold text-sky-500 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  {lang === "id" ? "Beranda" : "Home"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 font-semibold text-black hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  {lang === "id" ? "Tentang" : "About"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 font-semibold text-black hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  {lang === "id" ? "Kemampuan" : "Skill"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 font-semibold text-black hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  {lang === "id" ? "Proyek" : "Project"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 font-semibold text-black hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 font-semibold text-black hover:text-sky-500 hover:bg-sky-50 rounded-lg transition-all duration-300"
                >
                  {lang === "id" ? "Kontak" : "Contact"}
                </a>
              </li>
            </ul>
          </nav>
        )}

        {children}
      </main>

      <footer className="flex justify-center items-center p-4 mt-14 bg-sky-200">
        <span className="text-xs font-inter font-normal text-slate-900 sm:text-sm lg:text-base">
          &copy; {new Date().getFullYear()} Apif Supriadi
        </span>
      </footer>
    </>
  );
}

export default Layout;
