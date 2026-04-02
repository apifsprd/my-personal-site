import React, { useState } from "react";
import { JOB_EXPERIENCE, STUDY_EXPERIENCE } from "../../data/constants";
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Experience = ({ lang = "en" }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeStudyIdx, setActiveStudyIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const toggleStudyAccordion = (idx) => {
    setActiveStudyIdx(activeStudyIdx === idx ? null : idx);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.section
      id="experience"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full py-20 px-4 sm:px-0 bg-white"
    >
      <div className="max-w-full mx-auto">
        <motion.div variants={itemVariants} className="flex flex-col gap-2 mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {lang === "id" ? "Pengalaman Kerja" : "Professional Journey"}
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} className="flex flex-col gap-4">
          {JOB_EXPERIENCE.map((job, index) => {
            const isOpen = activeIdx === index;
            const description = lang === "id" ? job.desc : job.desc_en;
            const points = description ? description.split(",").map((p) => p.trim()) : [];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group border rounded-2xl transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "border-newblue bg-slate-50/50"
                    : "border-slate-100 hover:border-slate-200 bg-white"
                }`}
              >
                {/* Header / Trigger */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 focus:outline-none cursor-pointer"
                >
                  {/* Company Logo Wrapper */}
                  <motion.div
                    animate={isOpen ? { borderColor: "rgba(14, 165, 233, 0.3)", scale: 1.1 } : {}}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border p-2 flex-shrink-0 transition-all duration-500 ${
                      isOpen ? "border-newblue/30" : "border-slate-100 group-hover:scale-105"
                    }`}
                  >
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "https://ui-avatars.com/api/?name=" + job.company;
                      }}
                    />
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-newblue font-bold text-base select-none">
                          {job.company}
                        </span>
                        <motion.span
                          animate={isOpen ? { backgroundColor: "#0ea5e9", color: "#fff" } : {}}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-colors ${
                            isOpen
                              ? "border-newblue"
                              : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}
                        >
                          {lang === "id" ? job.period : job.period_en}
                        </motion.span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <MapPin size={16} className="text-slate-300" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className={`mt-2 sm:mt-0 p-2.5 rounded-xl transition-all duration-300 ${
                      isOpen ? "bg-newblue text-white " : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <ChevronDown size={22} />
                  </motion.div>
                </button>

                {/* Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 pt-2 border-t border-slate-100">
                        <ul className="space-y-2 mt-3">
                          {points.map((point, pIdx) => (
                            <motion.li
                              key={pIdx}
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: pIdx * 0.1 }}
                              className="flex items-start gap-3 text-slate-600 leading-relaxed"
                            >
                              <div className="mt-1.5 w-1 h-1 rounded-full bg-newblue flex-shrink-0" />
                              <span className="text-xs sm:text-sm">{point}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Study Experience Section */}
        <motion.div variants={itemVariants} className="flex flex-col gap-2 mt-20 mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {lang === "id" ? "Pendidikan" : "Education"}
          </h2>
        </motion.div>

        <motion.div variants={containerVariants} className="flex flex-col gap-4">
          {STUDY_EXPERIENCE.map((study, index) => {
            const isOpen = activeStudyIdx === index;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group border rounded-2xl transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "border-newblue bg-slate-50/50"
                    : "border-slate-100 hover:border-slate-200 bg-white"
                }`}
              >
                {/* Header / Trigger */}
                <button
                  onClick={() => toggleStudyAccordion(index)}
                  className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 focus:outline-none cursor-pointer"
                >
                  {/* Icon Wrapper */}
                  <motion.div
                    animate={isOpen ? { borderColor: "rgba(14, 165, 233, 0.3)", scale: 1.1 } : {}}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border p-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                      isOpen ? "border-newblue/30" : "border-slate-100 group-hover:scale-105"
                    }`}
                  >
                    <GraduationCap size={24} className="text-newblue" />
                  </motion.div>

                  {/* Text Content */}
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {study.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-newblue font-bold text-base select-none">
                          {study.university}
                        </span>
                        <motion.span
                          animate={isOpen ? { backgroundColor: "#0ea5e9", color: "#fff" } : {}}
                          className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-colors ${
                            isOpen
                              ? "border-newblue"
                              : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}
                        >
                          {study.period}
                        </motion.span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <MapPin size={16} className="text-slate-300" />
                      <span>{study.location}</span>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className={`mt-2 sm:mt-0 p-2.5 rounded-xl transition-all duration-300 ${
                      isOpen ? "bg-newblue text-white " : "bg-slate-50 text-slate-400"
                    }`}
                  >
                    <ChevronDown size={22} />
                  </motion.div>
                </button>

                {/* Content */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 border-t border-slate-100 px-4 sm:px-5 pb-4">
                        <div className="mt-3 flex flex-col gap-2">
                          {study.gpa && (
                            <motion.div
                              initial={{ x: -10, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              className="flex items-center gap-3 text-slate-600"
                            >
                              <div className="w-1 h-1 rounded-full bg-newblue flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-semibold">
                                GPA: {study.gpa}
                              </span>
                            </motion.div>
                          )}
                          <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="flex items-center gap-3 text-slate-600"
                          >
                            <div className="w-1 h-1 rounded-full bg-newblue flex-shrink-0" />
                            <span className="text-xs sm:text-sm">
                              {lang === "id"
                                ? `Menyelesaikan program studi ${study.title} di ${study.university}`
                                : `Completed ${study.title} program at ${study.university}`}
                            </span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Experience;
