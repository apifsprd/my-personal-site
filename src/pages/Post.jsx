import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Calendar, User, MoveLeft, AlertCircle } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Layout from "../Layout";
import { MDXProvider } from "@mdx-js/react";

// Use dynamic imports (no eager: true)
const modules = import.meta.glob("../content/post/*.mdx");
const modules_en = import.meta.glob("../content/post_en/*.mdx");

export default function Post() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);

      const pathPrefix = lang === "id" ? "../content/post/" : "../content/post_en/";
      const otherPrefix = lang === "id" ? "../content/post_en/" : "../content/post/";
      const targetPath = `${pathPrefix}${slug}.mdx`;
      const selectedModules = lang === "id" ? modules : modules_en;
      const otherModules = lang === "id" ? modules_en : modules;

      try {
        // 1. Coba muat post dengan slug saat ini di bahasa yang dipilih
        if (selectedModules[targetPath]) {
          const module = await selectedModules[targetPath]();
          setPost({
            Component: module.default,
            frontmatter: module.frontmatter || {},
          });
        } else {
          // 2. Jika tidak ada, mungkin user baru saja ganti bahasa
          // Cari apakah slug ini ada di bahasa LAIN
          const otherPath = `${otherPrefix}${slug}.mdx`;
          if (otherModules[otherPath]) {
            const otherModule = await otherModules[otherPath]();
            const otherFM = otherModule.frontmatter || {};

            if (otherFM.translationId) {
              // Cari post di SELECTED language yang punya translationId sama
              let foundTranslatedSlug = null;
              for (const path in selectedModules) {
                const m = await selectedModules[path]();
                if (m.frontmatter?.translationId === otherFM.translationId) {
                  foundTranslatedSlug = path.replace(pathPrefix, "").replace(".mdx", "");
                  break;
                }
              }

              if (foundTranslatedSlug) {
                navigate(`/post/${foundTranslatedSlug}`, { replace: true });
                return;
              }
            }
          }
          setError("not_found");
        }

        // Muat artikel lainnya untuk rekomendasi
        const others = [];
        const entries = Object.entries(selectedModules);
        for (const [path, load] of entries) {
          if (path !== targetPath && others.length < 3) {
            const m = await load();
            others.push({
              slug: path.replace(pathPrefix, "").replace(".mdx", ""),
              frontmatter: m.frontmatter || {},
            });
          }
        }
        setAllPosts(others);
      } catch (err) {
        console.error("Error loading post:", err);
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    localStorage.setItem("lang", lang);
  }, [slug, lang, navigate]);

  moment.locale(lang === "id" ? "id" : "en");

  if (loading) {
    return (
      <Layout lang={lang} onSetLang={setLang}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-newsky border-t-newblue rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium text-sm">
              {lang === "id" ? "Memuat artikel..." : "Loading article..."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout lang={lang} onSetLang={setLang}>
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] gap-6 px-4">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-2">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 text-center">
            {lang === "id" ? "Artikel Tidak Ditemukan" : "Post Not Found"}
          </h1>
          <p className="text-slate-500 text-base text-center max-w-md">
            {lang === "id"
              ? `Maaf, artikel dengan identitas "${slug}" tidak dapat ditemukan dalam bahasa ini.`
              : `Sorry, we couldn't find the post with the identifier "${slug}" in this language.`}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
          >
            <MoveLeft size={20} />
            {lang === "id" ? "Kembali ke Beranda" : "Back to Home"}
          </Link>
        </div>
      </Layout>
    );
  }

  const { Component, frontmatter } = post;
  const isID = lang === "id";

  const components = {
    h2: (props) => (
      <h2 className="text-2xl font-bold text-slate-900 mt-12 mb-6 font-display" {...props} />
    ),
    h3: (props) => (
      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 font-display" {...props} />
    ),
    p: (props) => (
      <p className="text-lg leading-relaxed text-slate-600 mb-6 font-sans" {...props} />
    ),
    ul: (props) => <ul className="list-disc list-inside mb-8 space-y-3 ml-4" {...props} />,
    li: (props) => <li className="text-slate-600 text-lg" {...props} />,
    code: (props) => (
      <code className="bg-slate-50 text-newblue rounded-lg px-2 py-1 font-mono text-sm border border-slate-100" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="border-l-4 border-newblue/20 bg-newsky/5 p-6 italic text-slate-700 rounded-r-2xl mb-8" {...props} />
    ),
  };

  return (
    <Layout lang={lang} onSetLang={setLang}>
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-20 animate-in fade-in duration-700">
        <header className="mb-12">
          <nav className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-400 hover:text-newblue transition-colors text-sm font-bold group"
            >
              <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {isID ? "Kembali ke Beranda" : "Back to Home"}
            </Link>
          </nav>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
            {frontmatter.title || "Untitled Post"}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-10 border-b border-slate-100 pb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-newsky/20 flex items-center justify-center text-newblue border border-newsky/30">
                <User size={18} />
              </div>
              <span className="text-sm font-bold text-slate-700">Apif Supriadi</span>
            </div>

            {frontmatter.pubDate && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 border border-slate-100">
                  <Calendar size={18} />
                </div>
                <time dateTime={frontmatter.pubDate} className="text-sm font-bold text-slate-600">
                  {moment(frontmatter.pubDate).format("LL")}
                </time>
              </div>
            )}
          </div>

          {frontmatter.image && (
            <figure className="mb-12 relative">
              <div className="absolute inset-0 bg-newblue/10 blur-[100px] -z-10 rounded-full scale-75"></div>
              <img
                src={frontmatter.image}
                alt={frontmatter.title || "Untitled Post"}
                className="w-full h-auto rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white"
              />
              {frontmatter.imageCaption && (
                <figcaption className="text-center text-sm text-slate-400 mt-6 font-medium italic">
                  {frontmatter.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {frontmatter.description && (
            <div className="mb-12">
              <p className="text-xl leading-relaxed text-slate-500 font-medium italic border-l-4 border-newblue/20 pl-8 py-2">
                {frontmatter.description}
              </p>
            </div>
          )}

          {frontmatter.category && frontmatter.category.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {frontmatter.category.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-2 bg-white text-slate-500 border border-slate-100 text-xs font-bold rounded-2xl hover:bg-newsky/10 hover:text-newblue hover:border-newsky/20 transition-all cursor-default shadow-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <section className="prose prose-lg max-w-none mb-20 prose-headings:text-slate-900 prose-headings:font-display prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-newblue hover:prose-a:text-blue-700 prose-strong:text-slate-900 prose-img:rounded-3xl prose-code:text-newblue prose-code:bg-slate-50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md">
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </section>

        {allPosts.length > 0 && (
          <section className="border-t border-slate-100 pt-16 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 font-display flex items-center gap-3">
              <span className="w-8 h-2 bg-newblue rounded-full"></span>
              {isID ? "Baca juga Artikel Lainnya" : "Read Other Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allPosts.map((otherPost) => (
                <Link
                  key={otherPost.slug}
                  to={`/post/${otherPost.slug}`}
                  className="group flex flex-col p-8 rounded-[2rem] border border-slate-100 bg-white hover:border-newblue hover:shadow-2xl hover:shadow-newblue/10 transition-all duration-500"
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-4 group-hover:text-newblue transition-colors leading-snug">
                    {otherPost.frontmatter.title}
                  </h3>
                  <div className="mt-auto flex items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    <time
                      dateTime={otherPost.frontmatter.pubDate}
                      className="text-xs font-bold text-slate-400 uppercase tracking-widest"
                    >
                      {moment(otherPost.frontmatter.pubDate).format("LL")}
                    </time>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="flex justify-center pt-12 border-t border-slate-100">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-12 py-4 bg-slate-900 text-white rounded-[1.5rem] hover:bg-slate-800 transition-all duration-300 shadow-2xl shadow-slate-200 hover:shadow-slate-300"
          >
            <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">{isID ? "Kembali ke Beranda" : "Back to Home"}</span>
          </Link>
        </footer>
      </article>
    </Layout>
  );
}
