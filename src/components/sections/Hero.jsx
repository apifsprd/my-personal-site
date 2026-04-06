import React from "react";
import Button from "../ui/Button";
import { SOCIAL_LINKS, SKILLS } from "../../data/constants";
import { motion } from "framer-motion";

const Hero = ({ lang = "en" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[82vh] sm:h-[90vh] flex flex-col px-4 sm:px-6 lg:px-0 overflow-hidden"
    >
      {/* Main Content Wrapper - Centered in remaining space */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex-grow flex flex-col justify-center gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto w-full"
      >
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 flex items-center gap-3"
          >
            Hi! <span className="animate-wave origin-[70%_70%] inline-block">👋</span>
          </motion.h1>
          <motion.div
            variants={itemVariants}
            className="flex flex-row gap-2 sm:gap-4 justify-start items-center overflow-visible flex-wrap"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 whitespace-nowrap">
              I'm
            </h2>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative"
            >
              <img
                src="/images/profile/1x1.png"
                alt="Apif Supriadi"
                className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-2 sm:border-4 border-newsky flex-shrink-0 object-cover shadow-xl"
                loading="eager"
              />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-newsky to-newblue whitespace-nowrap px-1">
              Apif Supriadi
            </h2>
            <div className="hidden sm:block h-1 w-6 md:w-8 lg:w-12 bg-slate-900 flex-shrink-0 rounded-lg"></div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-800 whitespace-nowrap">
              Mobile App Developer
            </h2>
          </motion.div>
        </div>

        {lang === "en" ? (
          <motion.div variants={itemVariants} className="flex flex-col max-w-2xl lg:max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-700 font-medium">
              I'm a Web Developer turned{" "}
              <span className="text-newblue font-bold">Mobile App Developer</span> with 2+ year experience.
              I enjoy working in the JavaScript ecosystem, exploring new technologies,
              and learning new things. Beside that, I'm a <span>&#9917;</span>{" "}
              football fan.
            </p>
          </motion.div>
        ) : (
          <motion.div variants={itemVariants} className="flex flex-col max-w-2xl lg:max-w-3xl">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-slate-700 font-medium">
              Saya adalah seorang Web Developer yang beralih menjadi{" "}
              <span className="text-newblue font-bold">Mobile App Developer</span> dengan pengalaman 2+ tahun.
              Saya menikmati bekerja di ekosistem JavaScript, mengeksplorasi teknologi baru,
              dan mempelajari hal baru. Selain itu, saya adalah penggemar sepak bola <span>&#9917;</span>.
            </p>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mt-2"
        >
          <div className="w-full sm:w-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#blog"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-newblue text-white font-bold rounded-xl shadow-lg shadow-newblue/20 hover:bg-blue-600 transition-all duration-300 w-full sm:w-auto"
            >
              {lang === "id" ? "Baca Blog Saya" : "Read my blog"}
            </motion.a>
          </div>
          <div className="flex flex-row gap-4">
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={index}
                whileHover={{ y: -4, color: "#0ea5e9" }}
                whileTap={{ scale: 0.9 }}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-full bg-slate-50 text-slate-600 hover:bg-newsky/10 transition-all duration-300 border border-slate-100 shadow-sm"
                aria-label={link.name}
              >
                {React.cloneElement(link.icon, { size: 22 })}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Skills Ticker - Pinned to bottom - Optimized for visibility */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="w-full mt-auto py-6 sm:py-8 border-t border-slate-50 bg-white/80 backdrop-blur-sm"
      >
        <div className="overflow-hidden relative flex items-center">
          <div className="flex animate-marquee whitespace-nowrap gap-12 sm:gap-20 h-full items-center">
            {/* Double the list for seamless marquee */}
            {[...SKILLS.flatMap((cat) => cat.lists), ...SKILLS.flatMap((cat) => cat.lists)].map(
              (skill, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-8 h-8 flex justify-center items-center p-1.5 rounded-xl bg-white border border-slate-100 group-hover:scale-110 group-hover:border-newsky transition-all duration-300">
                    <img
                      src={skill.logo}
                      alt={skill.name}
                      className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <span className="hidden text-sm sm:text-base font-bold text-newblue">
                      {skill.name[0]}
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-bold uppercase text-slate-400 group-hover:text-slate-900 transition-colors duration-300">
                    {skill.name}
                  </span>
                </motion.div>
              )
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
