import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, User, MoveLeft } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Layout from "../Layout";
import { MDXProvider } from "@mdx-js/react";

// Use dynamic imports (no eager: true)
const modules = import.meta.glob("../content/post/*.mdx");
const modules_en = import.meta.glob("../content/post_en/*.mdx");

export default function Post() {
  const { slug } = useParams();
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      setError(null);

      const selectedModules = lang === "id" ? modules : modules_en;
      const pathPrefix = lang === "id" ? "../content/post/" : "../content/post_en/";
      const targetPath = `${pathPrefix}${slug}.mdx`;

      try {
        if (selectedModules[targetPath]) {
          const module = await selectedModules[targetPath]();
          setPost({
            Component: module.default,
            frontmatter: module.frontmatter || {},
          });
        } else {
          setError("not_found");
        }

        const others = [];
        for (const path in selectedModules) {
          if (path !== targetPath) {
            const m = await selectedModules[path]();
            others.push({
              slug: path.replace(pathPrefix, "").replace(".mdx", ""),
              frontmatter: m.frontmatter || {},
            });
          }
        }
        setAllPosts(others.slice(0, 3));
      } catch (err) {
        console.error("Error loading post:", err);
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    localStorage.setItem("lang", lang);
  }, [slug, lang]);

  moment.locale(lang === "id" ? "id" : "en");

  if (loading) {
    return (
      <Layout lang={lang} onSetLang={setLang}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-slate-600 animate-pulse text-sm">
              {lang === "id"
                ? "Tunggu sebentar ya..."
                : "Please wait a moment..."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !post) {
    return (
      <Layout lang={lang} onSetLang={setLang}>
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            {lang === "id" ? "Artikel tidak ditemukan" : "No Post Found"}
          </h1>
          <p className="text-gray-600 mb-6 text-base text-center">
            {lang === "id" ? `Artikel dengan slug "${slug}" tidak tersedia.` : `Post with slug "${slug}" not found.`}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <MoveLeft size={20} />
            {lang === "id" ? "Kembali ke beranda" : "Back to home"}
          </Link>
        </div>
      </Layout>
    );
  }

  const { Component, frontmatter } = post;
  const isID = lang === "id";

  const components = {
    h2: (props) => <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-display" {...props} />,
    h3: (props) => <h3 className="text-xl font-bold text-gray-900 mt-6 mb-3 font-display" {...props} />,
    p: (props) => <p className="text-lg leading-relaxed text-gray-700 mb-6 font-sans" {...props} />,
    ul: (props) => <ul className="list-disc list-inside mb-6 space-y-2 ml-4" {...props} />,
    li: (props) => <li className="text-gray-700" {...props} />,
    code: (props) => <code className="bg-gray-100 rounded px-1.5 py-0.5 font-mono text-sm" {...props} />,
  };

  return (
    <Layout lang={lang} onSetLang={setLang}>
      <article className="max-w-3xl mx-auto px-4 py-12 md:py-20">
        <header className="mb-12">
          <nav className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-newblue transition-colors text-sm font-semibold group"
            >
              <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              {isID ? "Kembali ke Beranda" : "Back to Home"}
            </Link>
          </nav>

          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-slate-900 mb-8 leading-tight tracking-tight">
            {frontmatter.title || "Untitled Post"}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-slate-500 mb-10 border-b border-slate-100 pb-10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-newsky/20 flex items-center justify-center text-newblue">
                <User size={16} />
              </div>
              <span className="text-sm font-bold text-slate-700">Apif Supriadi</span>
            </div>

            {frontmatter.pubDate && (
              <div className="flex items-center gap-2.5">
                <Calendar size={18} className="text-slate-400" />
                <time
                  dateTime={frontmatter.pubDate}
                  className="text-sm font-medium"
                >
                  {moment(frontmatter.pubDate).format("LL")}
                </time>
              </div>
            )}
          </div>

          {frontmatter.image && (
            <figure className="mb-12">
              <img
                src={frontmatter.image}
                alt={frontmatter.title || "Untitled Post"}
                className="w-full h-auto rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
              />
              {frontmatter.imageCaption && (
                <figcaption className="text-center text-sm text-slate-400 mt-4 italic">
                  {frontmatter.imageCaption}
                </figcaption>
              )}
            </figure>
          )}

          {frontmatter.description && (
            <div className="mb-10">
              <p className="text-xl leading-relaxed text-slate-600 font-medium italic border-l-4 border-newblue/30 pl-6 py-1">
                {frontmatter.description}
              </p>
            </div>
          )}

          {frontmatter.category && frontmatter.category.length > 0 && (
            <div className="flex flex-wrap gap-2.5">
              {frontmatter.category.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-1.5 bg-slate-50 text-slate-500 border border-slate-100 text-xs font-bold rounded-xl hover:bg-newsky/10 hover:text-newblue hover:border-newsky/20 transition-all cursor-default"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <section className="prose prose-lg max-w-none mb-20 prose-headings:text-slate-900 prose-headings:font-display prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-newblue hover:prose-a:text-blue-700 prose-img:rounded-2xl">
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </section>

        {allPosts.length > 0 && (
          <section className="border-t border-slate-100 pt-16 mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-10 font-display flex items-center gap-3">
              <span className="w-8 h-1 bg-newblue rounded-full"></span>
              {isID ? "Baca juga Artikel Lainnya" : "Read Other Articles"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allPosts.map((otherPost) => (
                <Link
                  key={otherPost.slug}
                  to={`/post/${otherPost.slug}`}
                  className="group flex flex-col p-8 rounded-3xl border border-slate-100 bg-white hover:border-newblue hover:shadow-xl hover:shadow-newblue/5 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-newblue transition-colors leading-snug">
                    {otherPost.frontmatter.title}
                  </h3>
                  <time
                    dateTime={otherPost.frontmatter.pubDate}
                    className="text-xs font-bold text-slate-400 uppercase tracking-wider"
                  >
                    {moment(otherPost.frontmatter.pubDate).format("LL")}
                  </time>
                </Link>
              ))}
            </div>
          </section>
        )}

        <footer className="flex justify-center pt-12 border-t border-slate-100">
          <Link
            to="/"
            className="group inline-flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-slate-300"
          >
            <MoveLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">
              {isID ? "Kembali ke Beranda" : "Back to Home"}
            </span>
          </Link>
        </footer>
      </article>
    </Layout>
  );
}
