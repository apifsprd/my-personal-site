import React from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import Button from "../ui/Button";
import { PROJECTS } from "../../data/constants";
import { motion } from "framer-motion";

const LatestProject = ({ lang = "en" }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="project"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full h-auto flex flex-col gap-6 sm:gap-8 justify-center my-16 sm:my-32 px-4 sm:px-0 scroll-mt-24"
    >
      <motion.header variants={itemVariants} className="flex flex-col gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {lang === "id" ? "Proyek Terbaru" : "Featured Projects"}
        </h2>
      </motion.header>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10"
      >
        {PROJECTS.map((project, index) => (
          <motion.article
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="group relative flex flex-col gap-5 p-6 sm:p-8 bg-white border border-slate-100 rounded-3xl transition-all duration-500 hover:border-newblue overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-newsky/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-newsky/10 transition-colors"></div>

            <div className="flex items-center gap-5">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="w-16 h-16 rounded-2xl bg-white border border-slate-50 p-2.5 transition-all duration-500"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://ui-avatars.com/api/?name=" + project.name;
                  }}
                />
              </motion.div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-tight group-hover:text-newblue transition-colors">
                {project.name}
              </h3>
            </div>

            <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed line-clamp-3">
              {lang === "id" ? project.desc : project.desc_en}
            </p>

            <div className="flex flex-row flex-wrap gap-2.5 mt-2">
              {project.skills.map((tag, idx) => (
                <motion.span
                  key={idx}
                  whileHover={{ y: -2 }}
                  className="px-4 py-1.5 text-xs sm:text-sm font-bold text-slate-500 bg-slate-50 border border-slate-100 rounded-xl group-hover:border-newsky/30 group-hover:text-newblue transition-all"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-newblue font-bold group/link relative"
              >
                <span className="relative z-10">
                  {lang === "id" ? "Lihat Detail" : "View Project"}
                </span>
                <ExternalLink
                  size={18}
                  className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform"
                />
                <div className="absolute bottom-0 left-0 w-full h-1 bg-newsky/20 transition-all group-hover/link:h-3 -z-0"></div>
              </a>

              <div className="flex items-center gap-3">
                <div className="hidden group-hover:flex items-center gap-1.5 text-slate-400 text-xs font-bold">
                  <span>LIVE DEMO</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default LatestProject;
