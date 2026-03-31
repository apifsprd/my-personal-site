import React from "react";
import { Mail, Send, ArrowRight } from "lucide-react";

const HireMe = ({ lang = "en" }) => {
  return (
    <section id="contact" className="w-full py-20 px-4 sm:px-6 lg:px-0">
      <div className="max-w-5xl mx-auto rounded-[2rem] sm:rounded-[3rem] bg-slate-900 overflow-hidden relative group">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-newblue/20 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-newblue/30 transition-colors duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-newsky/10 rounded-full blur-[80px] -ml-32 -mb-32 group-hover:bg-newsky/20 transition-colors duration-700"></div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {lang === "id"
                ? "Tertarik untuk bekerja sama?"
                : "Interested in working together?"}
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed">
              {lang === "id"
                ? "Saya terbuka untuk posisi Full-time, Freelance, atau Kolaborasi proyek. Mari ciptakan sesuatu yang luar biasa!"
                : "I'm available for Full-time roles, Freelance gigs, or Project collaborations. Let's build something amazing!"}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Direct Email</span>
              <a
                href="mailto:apifsupriadi27@gmail.com"
                className="text-white font-semibold hover:text-newblue transition-colors underline underline-offset-4 decoration-newblue/30"
              >
                apifsupriadi27@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HireMe;
