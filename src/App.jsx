import { Instagram, Linkedin } from "lucide-react";
import "./App.css";
import { Link } from "react-router";
import projects from "./api/projects.json";
import quote from "./api/qoute.json";
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
      <div className="w-full h-auto flex flex-col-reverse justify-center items-center gap-4 md:flex-row">
        <div className="w-full flex flex-col gap-4 justify-center items-center md:justify-start md:items-start">
          <span className="font-inter font-semibold text-black text-xl lg:text-2xl">
            {lang === "id" ? headerContent.id.title : headerContent.en.title}
          </span>
          <span className="font-inter font-normal text-black text-base text-center md:text-left lg:text-lg">
            {lang === "id"
              ? headerContent.id.description
              : headerContent.en.description}{" "}
            <a
              href={headerContent.currentWork.link}
              target="_blank"
              className="font-inter bg-yellow-100 text-yellow-600 text-base hover:underline hover:underline-offset-2 lg:text-lg"
            >
              {headerContent.currentWork.company}
            </a>
          </span>
          <div className="flex flex-row justify-start items-center gap-2">
            <p className="font-inter font-normal text-black text-base text-center lg:text-left">
              {lang === "id" ? headerContent.id.bio : headerContent.en.bio}
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-2">
            <a
              href="https://linkedin.com/in/apifsprd"
              className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-100 hover:bg-slate-50"
            >
              <Linkedin size={18} color="#0284C7" />
            </a>
            <a
              href="https://instagram.com/apifsprd"
              className="w-10 h-10 flex justify-center items-center rounded-full bg-slate-100 hover:bg-slate-50"
            >
              <Instagram size={18} color="#0284C7" />
            </a>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <img
            src="/images/profile/1x1.png"
            alt="Apif Supriadi"
            className="w-32 h-32 rounded-full object-cover lg:w-48 lg:h-48 "
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 bg-slate-100 p-4 rounded-xl">
        <span className="font-inter font-semibold text-black text-sm mb-2 md:text-base">
          {lang === "id" ? "Artikel Terbaru" : "Latest Post"}
        </span>
        {posts.map((post, index) => (
          <Link
            to={`/post/${post.slug}`}
            key={index}
            className="flex flex-col-reverse justify-between items-start gap-4 bg-white rounded-lg p-2 hover:ring-4 hover:ring-sky-200 md:flex-row cursor-pointer lg:p-4"
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
      {/* Project */}
      <div className="flex flex-col gap-4 bg-slate-100 p-4 rounded-xl">
        <span className="font-inter font-semibold text-black text-base mb-2">
          {lang === "id" ? "Proyek Terbaru" : "Latest Project"}
        </span>
        {projects.map((project, index) => (
          <a
            href={project.link}
            key={index}
            target="_blank"
            className="flex flex-col justify-start items-start gap-2 bg-white rounded-lg p-2 hover:ring-4 hover:ring-sky-200 md:flex-row cursor-pointer"
          >
            <img
              src={project.image}
              alt="project_image"
              className="w-14 h-14 lg:w-24 lg:h-24 rounded-lg object-cover"
            />
            <div className="flex flex-col gap-2">
              <span className="text-sm font-inter font-semibold text-black lg:text-lg">
                {project.name}
              </span>
              <span className="text-xs font-inter font-normal text-black lg:text-base">
                {lang === "id" ? project.description : project.description_en}
              </span>
              <span className="text-xs font-inter font-normal text-slate-600 lg:text-sm">
                <span className="text-sky-600"> {project.stack[0]}</span>
              </span>
            </div>
          </a>
        ))}
      </div>
    </Layout>
  );
}

export default App;
