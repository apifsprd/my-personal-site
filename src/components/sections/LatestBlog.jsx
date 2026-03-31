import React from "react";
import moment from "moment";
import "moment/dist/locale/id";
import { Calendar, Tag } from "lucide-react";

const LatestBlog = ({ posts, lang = "en" }) => {
  // Set locale based on current language
  moment.locale(lang === "id" ? "id" : "en");

  return (
    <section
      id="blog"
      className="w-full h-auto flex flex-col gap-6 sm:gap-8 justify-center my-16 sm:my-32 px-4 sm:px-0 scroll-mt-24"
    >
      <header>
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 ">
          {lang === "id" ? "Postingan Terbaru" : "Latest post"}
        </h2>
      </header>

      <div className="flex flex-col gap-8">
        {posts.map((post, index) => (
          <article key={index}>
            <a
              href={`/post/${post.slug}`}
              className="flex flex-col gap-3 sm:flex-row justify-between items-start sm:gap-4 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:border-newblue hover:shadow-lg hover:shadow-newblue/5 hover:-translate-y-1 group"
            >
              <div className="flex flex-col gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-800 group-hover:text-newblue transition-colors">
                  {post.title}
                </h3>

                <footer className="flex flex-row flex-wrap justify-start items-center gap-4 mt-1">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={14} className="text-slate-400" />
                    <time
                      dateTime={post.date}
                      className="text-xs sm:text-sm font-medium"
                    >
                      {moment(post.date).format("MMM YYYY, DD")}
                    </time>
                  </div>

                  {post.category_id && (
                    <div className="flex items-center gap-1.5">
                      <Tag size={14} className="text-newblue/60" />
                      <span className="text-xs sm:text-sm font-semibold text-newblue px-2 py-0.5 bg-newsky/10 rounded-md">
                        {post.category_id}
                      </span>
                    </div>
                  )}
                </footer>
              </div>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestBlog;
