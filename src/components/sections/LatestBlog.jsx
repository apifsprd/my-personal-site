import React from "react";
import moment from "moment";
import "moment/dist/locale/id";
import { Calendar, Tag, MoveRight, ChevronRight } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const LatestBlog = ({ posts, lang = "en" }) => {
  // Set locale based on current language
  moment.locale(lang === "id" ? "id" : "en");

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      id="blog"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="w-full h-auto flex flex-col gap-6 sm:gap-8 justify-center my-16 sm:my-20 px-4 sm:px-0 scroll-mt-24"
    >
      <motion.header
        variants={itemVariants}
        className="flex flex-row justify-between items-center bg-transparent border-none p-0 m-0"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 ">
          {lang === "id" ? "Postingan Terbaru" : "Latest post"}
        </h2>
        <Link
          to="/blog"
          className="group flex items-center gap-2 text-newblue font-bold text-sm sm:text-base hover:text-blue-700 transition-colors"
        >
          {lang === "id" ? "Lihat Semua" : "View All"}
          <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.header>

      <motion.div variants={containerVariants} className="flex flex-col gap-4">
        {posts.slice(0, 3).map((post, index) => (
          <motion.article key={index} variants={itemVariants} className="group">
            <Link
              to={`/post/${post.slug}`}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 transition-all duration-500 hover:border-newblue hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="flex flex-col flex-grow relative z-10">
                <header className="mb-2">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Calendar size={14} className="text-slate-300" />
                      <time className="text-[10px] font-bold uppercase tracking-wider">
                        {moment(post.date).format("MMM DD, YYYY")}
                      </time>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {post.category &&
                        post.category.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-extrabold text-newblue/70 uppercase tracking-widest bg-newsky/5 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-newblue transition-colors leading-tight">
                    {post.title}
                  </h3>
                </header>

                <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                  {post.description ||
                    (lang === "id"
                      ? "Klik untuk membaca selengkapnya tentang artikel ini."
                      : "Click to read more about this article.")}
                </p>
              </div>

              <div className="flex-shrink-0 flex items-center justify-end sm:justify-start">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-newblue group-hover:bg-newblue group-hover:text-white transition-all duration-300">
                  <ChevronRight
                    size={20}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default LatestBlog;
