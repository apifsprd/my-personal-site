import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { Calendar, Clock, ArrowLeft, User, MoveLeft } from "lucide-react";
import moment from "moment";
import "moment/locale/id";
import Layout from "../Layout";
import { MDXProvider } from "@mdx-js/react";

// Import semua posts dengan eager: true
const modules = import.meta.glob("../content/post/*.mdx", { eager: true });

export default function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cari post berdasarkan slug
    let foundPost = null;

    for (const path in modules) {
      const module = modules[path];

      // Ekstrak slug dari path
      const fileSlug = path.replace("../content/post/", "").replace(".mdx", "");

      console.log("Checking:", fileSlug, "against slug:", slug);

      // Jika slug cocok
      if (fileSlug === slug) {
        foundPost = {
          Component: module.default,
          frontmatter: module.frontmatter || {},
        };
        break;
      }
    }

    if (foundPost) {
      console.log("Post found:", foundPost);
      setPost(foundPost);
    } else {
      console.log("Post not found for slug:", slug);
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
              Tunggu sebentar ya...
            </p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!post) {
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
  }

  const { Component, frontmatter } = post;

  const components = {
    h2: (props) => (
      <h2
        className="text-lg font-bold text-gray-800 my-4 font-merriweather"
        {...props}
      />
    ),
    p: (props) => (
      <p
        className="text-base/7 text-gray-700 mb-6 font-merriweather"
        {...props}
      />
    ),
  };

  return (
    <Layout>
      <article className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <MoveLeft size={20} />
          <p className="text-sm">Kembali</p>
        </Link>

        {/* Header Post */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            {frontmatter.title || "Untitled Post"}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <div className="flex items-center gap-2">
              <User size={18} />
              <p className="text-sm">Apif Supriadi</p>
            </div>

            {frontmatter.pubDate && (
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <p className="text-sm">
                  {moment(frontmatter.pubDate).format("ll")}
                </p>
              </div>
            )}

            {frontmatter.readingTime && (
              <div className="flex items-center gap-2">
                <Clock size={18} />
                {frontmatter.readingTime}
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
        <div className="leading-relaxed prose max-w-none">
          <MDXProvider components={components}>
            <Component />
          </MDXProvider>
        </div>

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mt-8"
        >
          <MoveLeft size={20} />
          <p className="text-sm">Kembali</p>
        </Link>
      </article>
    </Layout>
  );
}
