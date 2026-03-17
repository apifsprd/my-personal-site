import { Languages } from "lucide-react";
import React, { useState } from "react";

function Layout({ lang, onSetLang, children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MENUS = [
    { name: "Profil", name_en: "Profile", link: "#profile" },
    { name: "Kemampuan", name_en: "Skill", link: "#skills" },
    { name: "Karya", name_en: "Projects", link: "#projects" },
    { name: "Blog", name_en: "Blog", link: "#blog" },
    { name: "Hubungi Saya", name_en: "Contact", link: "#contact" },
  ];

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-50">
          <div className="bg-white/70 border border-slate-100 rounded-full px-6 py-3 flex items-center justify-between">
            {/* Logo / Brand */}
            <span className="font-sans text-lg font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              @apifsprd
            </span>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6 text-sm font-medium">
              {MENUS.map((item) => (
                <a
                  key={item.link}
                  href={item.link}
                  className="text-slate-600 hover:text-sky-600 transition-all duration-300 capitalize relative group"
                >
                  {item.name}
                  {/* Efek garis bawah saat hover */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button className="p-2 text-slate-700 hover:bg-slate-100 rounded-full transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-grow max-w-5xl mx-auto px-6 pt-24 md:pt-24 w-full">
          {children}
        </main>

        {/* Footer */}
        <footer className="text-center py-4 text-[10px] uppercase tracking-widest opacity-40 border-t border-second/10">
          Code with &hearts; by Apif Supriadi
        </footer>
      </div>
    </>
  );
}

export default Layout;
