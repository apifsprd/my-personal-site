import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import "./App.css";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import moment from "moment";
import Layout from "./Layout";

const modules = import.meta.glob("./content/post/*.mdx", { eager: true });
const modules_en = import.meta.glob("./content/post_en/*.mdx", {
  eager: true,
});

const headerContent = {
  id: {
    title: "Halo! Saya Apif Supriadi,",
    description:
      "Saya seorang Frontend Developer yang tinggal di Depok, Jawa Barat, saat ini saya bekerja di",
    bio: "Diluar pekerjaan, saya sangat tertarik dengan sepakbola, bagi saya mengembangkan sebuah aplikasi dan sepakbola punya kaitan yang erat yaitu kerjasama",
  },
  en: {
    title: "Hi! I'm Apif Supriadi,",
    description:
      "I'm a Frontend Developer based in Depok, Indonesia, currently working at",
    bio: "Outside of work, I'm really into football. To me, software development and football are pretty similar - they're both all about teamwork",
  },
  currentWork: {
    company: "Universitas Islam Internasional Indonesia (UIII)",
    link: "https://uiii.ac.id/",
  },
};

function App() {
  const [posts, setPosts] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "id");

  useEffect(() => {
    const loadedPosts = [];
    let selectedModules = lang === "id" ? modules : modules_en;
    for (const path in selectedModules) {
      const module = selectedModules[path];
      const frontmatter = module.frontmatter || {};
      const slug_id = path.replace("./content/post/", "").replace(".mdx", "");
      const slug_en = path
        .replace("./content/post_en/", "")
        .replace(".mdx", "");

      loadedPosts.push({
        slug: lang === "id" ? slug_id : slug_en,
        title: frontmatter.title || "Judul Tanpa Frontmatter",
        date: frontmatter.pubDate || "Tanggal Tidak Diketahui",
        category: frontmatter.category,
        category_id: frontmatter.category_id,
        image: frontmatter.image,
        Component: module.default,
      });
    }

    const sorted = loadedPosts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    localStorage.setItem("lang", lang);
    setPosts(sorted);
  }, [lang]);

  return (
    <Layout lang={lang} onSetLang={setLang}>
      {/* Header */}
      <section className="w-full h-auto flex flex-col justify-start items-start gap-4 md:flex-col">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            {lang === "id"
              ? "Catatan diluar jam kerja"
              : "Notes outside working hours"}
          </h1>
        </div>
        <div>
          <p className="text-base text-slate-800">
            {lang === "id"
              ? "Membahas Sepakbola, Humaniora, dan Koding"
              : "Discussing Football, Humanities, and Code"}
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <a
            href="https://www.instagram.com/apifsprd"
            target="_blank"
            className="px-3 py-1 flex justify-center items-center gap-1 bg-slate-100 rounded-lg hover:scale-105 transition duration-300 ease-in-out"
          >
            <p className="text-sm text-slate-900">Instagram</p>
            <ArrowUpRight size={18} className="text-slate-900" />
          </a>
          <a
            href="https://apifsprd-portfolio.vercel.app/"
            target="_blank"
            className="px-3 py-1 flex justify-center items-center gap-1 bg-slate-100 rounded-lg hover:scale-105 transition duration-300 ease-in-out"
          >
            <p className="text-sm text-slate-900">Portfolio</p>
            <ArrowUpRight size={18} className="text-slate-900" />
          </a>
        </div>
      </section>

      <div className="flex flex-col gap-4 bg-slate-100 p-4 rounded-xl">
        <span className="font-inter font-semibold text-black text-sm mb-2 md:text-base">
          {lang === "id" ? "Artikel" : "Post"}
        </span>
        {posts.map((post, index) => (
          <Link
            to={`/post/${post.slug}`}
            key={index}
            className="flex flex-col-reverse justify-between items-start gap-4 bg-white rounded-lg p-2 transition ease-in duration-300 hover:bg-sky-100 hover:-translate-y-1 md:flex-row cursor-pointer lg:p-4"
          >
            <div className="flex flex-col gap-1">
              <span className="text-base font-inter font-semibold text-black lg:text-lg">
                {post.title}
              </span>
              <div className="flex flex-row justify-start items-center gap-2">
                <span className="text-sm font-inter font-normal text-slate-500 lg:text-sm">
                  {moment(new Date(post.date)).format("ll")}
                </span>
                <span className="text-sm font-inter font-normal text-slate-500 lg:text-sm">
                  {"#" + post.category_id}
                </span>
              </div>
            </div>
            {/* <img
              src={post.image}
              alt="post"
              className="w-full h-32 md:w-32 lg:w-44 lg:h-32 rounded-lg object-cover"
            /> */}
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default App;
