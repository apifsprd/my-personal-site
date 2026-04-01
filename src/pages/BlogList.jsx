import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router";
import { Calendar, Tag, Search, SortAsc, SortDesc, MoveLeft, Clock, ChevronRight } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Layout from "../Layout";

const modules = import.meta.glob("../content/post/*.mdx", { eager: true });
const modules_en = import.meta.glob("../content/post_en/*.mdx", { eager: true });

const BlogList = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // "newest" | "oldest"
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    const selectedModules = lang === "id" ? modules : modules_en;
    const pathPrefix = lang === "id" ? "../content/post/" : "../content/post_en/";

    const loadedPosts = Object.entries(selectedModules).map(([path, module]) => {
      const frontmatter = module.frontmatter || {};
      const slug = path.replace(pathPrefix, "").replace(".mdx", "");

      return {
        slug,
        title: frontmatter.title || "Untitled",
        date: frontmatter.pubDate || "",
        tags: frontmatter.category || [],
        description: frontmatter.description || "",
        image: frontmatter.image,
      };
    });

    setPosts(loadedPosts);
    localStorage.setItem("lang", lang);
  }, [lang]);

  moment.locale(lang === "id" ? "id" : "en");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    posts.forEach((post) => {
      post.tags.forEach((tag) => tags.add(tag));
    });
    return ["All", ...Array.from(tags)];
  }, [posts]);

  // Filter and Sort posts
  const filteredPosts = useMemo(() => {
    return posts
      .filter((post) => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
        return matchesSearch && matchesTag;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortBy === "newest" ? dateB - dateA : dateA - dateB;
      });
  }, [posts, searchQuery, selectedTag, sortBy]);

  const isID = lang === "id";

  return (
    <Layout lang={lang} onSetLang={setLang}>
      <div className="max-w-5xl mx-auto px-4 py-20">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {isID ? "Semua Artikel" : "All Articles"}
          </h1>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-4 items-start md:items-center">
          {/* Search Input */}
          <div className="relative flex-grow w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-newblue transition-colors" size={20} />
            <input
              type="text"
              placeholder={isID ? "Cari judul artikel..." : "Search articles by title..."}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-newblue/20 focus:border-newblue transition-all  group-hover:border-slate-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Select */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{isID ? "Urutkan:" : "Sort:"}</span>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setSortBy("newest")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "newest" ? "bg-white text-newblue " : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                <SortDesc size={16} />
                {isID ? "Terbaru" : "Newest"}
              </button>
              <button
                onClick={() => setSortBy("oldest")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${sortBy === "oldest" ? "bg-white text-newblue " : "text-slate-500 hover:text-slate-700"
                  }`}
              >
                <SortAsc size={16} />
                {isID ? "Terlama" : "Oldest"}
              </button>
            </div>
          </div>
        </div>

        {/* Tags Filter */}
        <div className="mb-16">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2.5 rounded-2xl text-sm font-bold transition-all border ${selectedTag === tag
                  ? "bg-newblue text-white border-newblue shadow-lg shadow-newblue/20"
                  : "bg-white text-slate-500 border-slate-200 hover:border-newblue hover:text-newblue"
                  }`}
              >
                {tag === "All" ? (isID ? "Semua Tag" : "All Tags") : `#${tag}`}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col gap-4">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link
                  to={`/post/${post.slug}`}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 bg-white border border-slate-100 rounded-3xl p-5 sm:p-6 transition-all duration-500 hover:border-newblue  hover:-translate-y-1 relative overflow-hidden"
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
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[9px] font-extrabold text-newblue/70 uppercase tracking-widest bg-newsky/5 px-2 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-newblue transition-colors leading-tight">
                        {post.title}
                      </h2>
                    </header>

                    <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex-shrink-0 flex items-center justify-end sm:justify-start">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-newblue group-hover:bg-newblue group-hover:text-white transition-all duration-300">
                      <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {isID ? "Artikel tidak ditemukan" : "No articles found"}
              </h3>
              <p className="text-slate-500">
                {isID
                  ? "Coba gunakan kata kunci lain atau hapus filter yang diterapkan."
                  : "Try using different keywords or clearing your filters."}
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("All");
                }}
                className="mt-8 px-8 py-3 bg-newblue text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-newblue/30 transition-all active:scale-95"
              >
                {isID ? "Reset Filter" : "Reset Filters"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default BlogList;
