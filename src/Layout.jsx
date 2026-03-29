import { Languages } from "lucide-react";
import React, { useState } from "react";

function Layout({ lang = "en", onSetLang, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MENUS = [
    { name: "Beranda", name_en: "Home", link: "" },
    { name: "Blog", name_en: "Blog", link: "#blog" },
    { name: "Karya", name_en: "Projects", link: "#project" },
    // { name: "Hubungi Saya", name_en: "Contact", link: "#contact" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col bg-white">
        <div className="w-full h-2 bg-gradient-to-r from-newsky to-newblue"></div>
        <div className="flex-grow max-w-5xl mx-auto w-full bg-white ">
          <header className="flex flex-col gap-4 justify-center h-24">
            <nav className="flex flex-row justify-between items-center px-4 py-2">
              <div className="flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold">Apif's Site</h1>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                {/* Desktop */}
                <ul className="flex-row gap-8 hidden md:flex">
                  {MENUS.map((menu) => (
                    <li key={menu.link}>
                      <a
                        href={menu.link}
                        className="text-md font-medium tracking-wide hover:text-newblue  focus:text-newblue transition duration-300 ease-in-out focus:outline-none"
                      >
                        {lang === "id" ? menu.name : menu.name_en}
                      </a>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden"
                >
                  {isMenuOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {/* <button
                className="flex flex-row justify-center items-center text-sm text-black gap-2 rounded-full border border-gray-200 px-4 py-1 hover:border-newblue  transition duration-300 ease-in-out  cursor-pointer"
                onClick={() => onSetLang(lang === "id" ? "en" : "id")}
              >
                <Languages className="w-4 h-4" />
                {lang === "id" ? "EN" : "ID"}
              </button> */}
            </nav>
            {/* Mobile */}
            <ul
              className={`flex-col gap-4 md:hidden ${isMenuOpen ? "flex" : "hidden"} bg-white p-4 border border-gray-200 rounded-xl shadow-md absolute top-18 right-4 z-50 w-2/3`}
            >
              {MENUS.map((menu) => (
                <li key={menu.link}>
                  <a
                    href={menu.link}
                    className="text-md font-medium tracking-wide hover:text-newblue  focus:text-newblue transition duration-300 ease-in-out focus:outline-none"
                  >
                    {lang === "id" ? menu.name : menu.name_en}
                  </a>
                </li>
              ))}
            </ul>
          </header>
          <main>{children}</main>
          <footer className="flex flex-col gap-4 justify-center items-center h-14 mt-32">
            <p className="text-center py-4 text-sm text-black">
              Code with ❤️ by Apif Supriadi from Indonesia
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

export default Layout;
