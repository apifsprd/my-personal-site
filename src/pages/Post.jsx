import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Clock, ArrowLeft, User, MoveLeft, Tag } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Layout from "../Layout";
import { MDXProvider } from "@mdx-js/react";

// Import semua posts dengan eager: true
const modules = import.meta.glob("../content/post/*.mdx", { eager: true });
// Import semua posts dengan eager: true
const modules_en = import.meta.glob("../content/post_en/*.mdx", {
  eager: true,
});

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activedLang = localStorage.getItem("lang");
    let selectedModules = activedLang === "id" ? modules : modules_en;
    // Cari post berdasarkan slug\
    let foundPost = null;
    const allPosts = []; // Variable untuk menyimpan semua post

    for (const path in selectedModules) {
      const module = selectedModules[path];

      // Ekstrak slug dari path
      const fileSlug = path.replace("../content/post/", "").replace(".mdx", "");
      const fileSlug_en = path
        .replace("../content/post_en/", "")
        .replace(".mdx", "");

      // Simpan semua post ke dalam array
      const postData = {
        slug: activedLang === "id" ? fileSlug : fileSlug_en,
        Component: module.default,
        frontmatter: module.frontmatter || {},
      };

      // Jika slug cocok

      if (fileSlug === slug || fileSlug_en === slug) {
        foundPost = postData;
      } else {
        allPosts.push(postData);
      }
    }

    // Simpan allPosts ke state jika diperlukan
    setAllPosts(allPosts); // Tambahkan state baru: const [allPosts, setAllPosts] = useState([])

    if (foundPost) {
      setPost(foundPost);
    } else {
      setPost(null);
    }

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [slug]);

  moment.locale("id");

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-slate-600 animate-pulse text-sm">
              {localStorage.getItem("lang") === "id"
                ? "Tunggu sebentar ya..."
                : "Please wait a moment..."}
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post && localStorage.getItem("lang") === "id") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            Artikel tidak ditemukan
          </h1>
          <p className="text-gray-600 mb-6 text-base text-center">
            Artikel dengan slug "{slug}" tidak tersedia.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <MoveLeft size={20} />
            Kembali ke beranda
          </Link>
        </div>
      </Layout>
    );
  } else if (!post && localStorage.getItem("lang") === "en") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center w-full min-h-screen gap-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">
            No Post Found
          </h1>
          <p className="text-gray-600 mb-6 text-base text-center">
            Post with slug "{slug}" not found.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <MoveLeft size={20} />
            Back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const { Component, frontmatter } = post;

  const components = {
    h2: (props) => (
      <h2
        className="text-lg font-bold text-gray-900 my-4 font-merriweather"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-base/7 text-gray-900 mb-6 font-merriweather"
        {...props}
      />
    ),
  };

  return (
    <Layout lang={localStorage.getItem("lang")}>
      <article className="max-w-3xl mx-auto">
        {/* Header Post */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            {frontmatter.title || "Untitled Post"}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User size={22} />
              <p className="text-base">Apif Supriadi</p>
            </div>

            {frontmatter.pubDate && (
              <div className="flex items-center gap-2">
                <Calendar size={22} />
                <p className="text-base">
                  {moment(frontmatter.pubDate).format("ll")}
                </p>
              </div>
            )}
          </div>

          {frontmatter.description && (
            <p className="text-base/7 text-gray-600 mb-6 font-merriweather italic">
              {frontmatter.description}
            </p>
          )}

          {frontmatter.category && frontmatter.category.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {frontmatter.category.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-sky-100 text-sky-600 text-xs rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Image */}
        {frontmatter.image && (
          <div className="mb-8">
            <img
              src={frontmatter.image}
              alt={frontmatter.title || "Untitled Post"}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        {/* Content MDX */}
        <div className="leading-relaxed prose max-w-none mb-16">
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </div>

        <div className="mb-8">
          <h2 className="text-base font-bold text-gray-900 mb-4 font-merriweather">
            {localStorage.getItem("lang") === "id"
              ? "Baca juga Artikel Lainnya"
              : "Read Other Articles"}
          </h2>
          {allPosts.length > 0 && (
            <div className="flex flex-col gap-6">
              {allPosts.map((post) => (
                <Link
                  key={post.slug}
                  to={`/post/${post.slug}`}
                  className="flex flex-col justify-start items-start gap-2 rounded-xl p-4 transition ease-in duration-300 hover:bg-sky-50 hover:-translate-y-1"
                >
                  <h3 className="text-base font-normal text-black font-merriweather">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {moment(post.frontmatter.pubDate).format("ll")}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-center items-center w-full h-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full hover:bg-slate-200 transition duration-300  ease-in-out  "
          >
            <p className="text-sm font-inter font-normal text-slate-800">
              {localStorage.getItem("lang") === "id"
                ? "Kembali ke Beranda"
                : "Back to Home"}
            </p>
          </Link>
        </div>
      </article>
    </Layout>
  );
}
