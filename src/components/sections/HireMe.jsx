import React from "react";
import { Mail, Send, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HireMe = ({ lang = "en" }) => {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full py-20 px-4 sm:px-6 lg:px-0"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="max-w-5xl mx-auto rounded-[2rem] sm:rounded-[3rem] bg-slate-900 overflow-hidden relative group shadow-2xl shadow-slate-900/20"
      >
        {/* Decorative Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 right-0 w-64 h-64 bg-newblue/20 rounded-full blur-[80px] -mr-32 -mt-32 group-hover:bg-newblue/30 transition-colors duration-700"
        ></motion.div>
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 left-0 w-64 h-64 bg-newsky/10 rounded-full blur-[80px] -ml-32 -mb-32 group-hover:bg-newsky/20 transition-colors duration-700"
        ></motion.div>

        <div className="relative z-10 p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col gap-4 text-center lg:text-left max-w-2xl"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              {lang === "id" ? "Tertarik untuk bekerja sama?" : "Interested in working together?"}
            </h2>
            <p className="text-slate-400 text-lg sm:text-xl font-medium leading-relaxed">
              {lang === "id"
                ? "Saya terbuka untuk posisi Full-time, Freelance, atau Kolaborasi proyek. Mari ciptakan sesuatu yang luar biasa!"
                : "I'm available for Full-time roles, Freelance gigs, or Project collaborations. Let's build something amazing!"}
            </p>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto"
          >
            <div className="flex flex-col items-center sm:items-start bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 hover:border-newblue/50 transition-colors">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
                Direct Email
              </span>
              <motion.a
                whileHover={{ scale: 1.05, color: "#0ea5e9" }}
                href="mailto:apifsupriadi27@gmail.com"
                className="text-white font-semibold transition-colors underline underline-offset-4 decoration-newblue/30"
              >
                apifsupriadi27@gmail.com
              </motion.a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HireMe;
