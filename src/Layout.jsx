import { Languages, Menu, X } from "lucide-react";
import React, { useState } from "react";

function Layout({ lang = "en", onSetLang, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MENUS = [
    { name: "Beranda", name_en: "Home", link: "/" },
    { name: "Pengalaman", name_en: "Experience", link: "/#experience" },
    { name: "Blog", name_en: "Blog", link: "/#blog" },
    { name: "Karya", name_en: "Projects", link: "/#project" },
  ];

  const currentLang = lang || localStorage.getItem("lang") || "en";

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <div className="w-full h-2 bg-gradient-to-r from-newsky to-newblue"></div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <nav className="max-w-5xl mx-auto px-4 h-20 flex justify-between items-center text-black">
          <a href="/" className="group flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight group-hover:text-newblue transition-colors">
              Apif Supriadi
            </h1>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {MENUS.map((menu) => (
                <li key={menu.link}>
                  <a
                    href={menu.link}
                    className="text-sm font-medium hover:text-newblue transition duration-300"
                  >
                    {currentLang === "id" ? menu.name : menu.name_en}
                  </a>
                </li>
              ))}
            </ul>

            <div className="h-6 w-px bg-gray-200"></div>

            <button
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 hover:border-newblue hover:bg-newsky/5 transition duration-300"
              onClick={() => onSetLang(currentLang === "id" ? "en" : "id")}
            >
              <Languages size={16} className="text-gray-600" />
              <span className="text-xs font-bold uppercase">{currentLang === "id" ? "ID" : "EN"}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <button
              className="p-2 rounded-lg border border-gray-200"
              onClick={() => onSetLang(currentLang === "id" ? "en" : "id")}
            >
              <Languages size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Nav Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl animate-in slide-in-from-top duration-300">
            <ul className="flex flex-col p-4 gap-2">
              {MENUS.map((menu) => (
                <li key={menu.link}>
                  <a
                    href={menu.link}
                    onClick={() => setIsMenuOpen(false)}
                    className="block p-4 text-base font-medium hover:bg-gray-50 rounded-xl transition duration-200"
                  >
                    {currentLang === "id" ? menu.name : menu.name_en}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-0 sm:px-4">
        {children}
      </main>

      <footer className="border-t border-gray-50 bg-gray-100 mt-32">
        <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col items-center gap-4">
          <p className="text-sm font-medium text-gray-500">
            © {new Date().getFullYear()} Apif Supriadi. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 text-center">
            Built with React, Vite & Tailwind CSS. Hosted on Vercel. Code with Gemini
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
