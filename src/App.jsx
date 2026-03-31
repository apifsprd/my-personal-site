import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import Hero from "./components/sections/Hero";
import Experience from "./components/sections/Experience";
import LatestBlog from "./components/sections/LatestBlog";
import LatestProject from "./components/sections/LatestProject";
import HireMe from "./components/sections/HireMe";

const modules = import.meta.glob("./content/post/*.mdx", { eager: true });
const modules_en = import.meta.glob("./content/post_en/*.mdx", { eager: true });

function App() {
  const [posts, setPosts] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  useEffect(() => {
    const selectedModules = lang === "id" ? modules : modules_en;
    const pathPrefix = lang === "id" ? "./content/post/" : "./content/post_en/";

    const loadedPosts = Object.entries(selectedModules).map(([path, module]) => {
      const frontmatter = module.frontmatter || {};
      const slug = path.replace(pathPrefix, "").replace(".mdx", "");

      return {
        slug,
        title: frontmatter.title || "Judul Tanpa Frontmatter",
        date: frontmatter.pubDate || "Tanggal Tidak Diketahui",
        category: frontmatter.category,
        category_id: frontmatter.category_id,
        image: frontmatter.image,
        Component: module.default,
      };
    });

    const sorted = loadedPosts.sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );

    localStorage.setItem("lang", lang);
    setPosts(sorted);
  }, [lang]);

  return (
    <Layout lang={lang} onSetLang={setLang}>
      <Hero lang={lang} />
      <Experience lang={lang} />
      <LatestBlog posts={posts} lang={lang} />
      <LatestProject lang={lang} />
      <HireMe lang={lang} />
    </Layout>
  );
}

export default App;
