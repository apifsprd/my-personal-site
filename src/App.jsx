import { Instagram, Linkedin } from "lucide-react";
import "./App.css";
import { Link } from "react-router";
import projects from "./api/projects.json";
import { useEffect, useState } from "react";
import moment from "moment";

const modules = import.meta.glob("./content/post/*.mdx", { eager: true });

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadedPosts = [];
    for (const path in modules) {
      const module = modules[path];
      const frontmatter = module.frontmatter || {};
      const slug = path.replace("./content/post/", "").replace(".mdx", "");

      loadedPosts.push({
        slug: slug,
        title: frontmatter.title || "Judul Tanpa Frontmatter",
        date: frontmatter.pubDate || "Tanggal Tidak Diketahui",
        category: frontmatter.category,
        image: frontmatter.image,
        Component: module.default,
      });
    }

    const sorted = loadedPosts.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setPosts(sorted);
  }, []);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col gap-8 px-4 py-4 sm:px-[20vw] lg:px-[25vw] bg-white">
        {/* Job title */}
        <div className="w-full h-auto flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full" />
            <span className="font-inter font-normal text-black text-xs">
              Mobile App Dev
            </span>
          </div>
          <div className="flex justify-start items-center px-3 py-1 bg-sky-100 rounded-full">
            <span className="font-inter font-normal text-sky-500 text-xs">
              Currently Employed
            </span>
          </div>
        </div>
        {/* Header */}
        <div className="w-full h-auto flex flex-col-reverse justify-center items-center gap-4 md:flex-row">
          <div className="w-full flex flex-col gap-4 justify-center items-center md:justify-start md:items-start">
            <span className="font-inter font-semibold text-black text-xl">
              I'm Apif Supriadi
            </span>
            <span className="font-inter font-normal text-black text-base text-center md:text-left">
              <span className="bg-sky-100">Mobile App Developer</span> from
              Depok, Indonesia and currently employed at{" "}
              <a
                href="https://uiii.ac.id"
                target="_blank"
                className="font-inter bg-yellow-100 text-yellow-600 text-base hover:underline hover:underline-offset-2"
              >
                Universitas Islam Internasional Indonesia (UIII)
              </a>
            </span>
            <div className="flex flex-row justify-center items-center gap-2">
              <a
                href="https://linkedin.com/in/apifsprd"
                className="w-10 h-10 flex justify-center items-center rounded-full bg-sky-200 hover:bg-sky-100"
              >
                <Linkedin size={18} color="#0284C7" />
              </a>
              <a
                href="https://instagram.com/apifsprd"
                className="w-10 h-10 flex justify-center items-center rounded-full bg-sky-200 hover:bg-sky-100"
              >
                <Instagram size={18} color="#0284C7" />
              </a>
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <img
              src="/images/profile/1x1-colored.png"
              alt="Apif Supriadi"
              className="w-32 h-32 rounded-full object-cover "
            />
          </div>
        </div>
        {/* Tabs */}
        {/* <div className="flex flex-row justify-center items-center gap-2">
          <button
            onClick={() => {}}
            className="px-3 py-2 flex flex-row justify-start items-center gap-2 bg-sky-100 rounded-lg"
          >
            <span className="w-1.5 h-1.5 bg-sky-600 rounded-full" />
            <span className="font-inter font-semibold text-sky-600 text-sm">
              Post
            </span>
          </button>
          <button
            onClick={() => {}}
            className="px-3 py-2 flex flex-row justify-start items-center gap-2 bg-gray-100 rounded-lg"
          >
            <span className="hidden w-1.5 h-1.5 bg-gray-600 rounded-full" />
            <span className="font-inter font-semibold text-gray-600 text-sm">
              Project
            </span>
          </button>
        </div> */}
        {/* Post */}
        <div className="flex flex-col gap-2 bg-sky-50 p-4 rounded-xl">
          <span className="font-inter font-normal text-black text-sm mb-2">
            Post
          </span>
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col-reverse justify-start items-start gap-2 bg-white rounded-lg p-2 hover:shadow sm:flex-row"
            >
              <div className="flex flex-col gap-1">
                <div className="flex flex-row justify-between items-center">
                  <span className="text-xs font-inter font-normal text-slate-400 lg:text-sm">
                    {moment(post.date).format("ll")}
                  </span>
                  <span className="text-xs font-inter font-normal text-slate-400 lg:text-sm">
                    {"#" + post.category}
                  </span>
                </div>
                <span className="text-sm font-inter font-semibold text-black lg:text-base">
                  {post.title}
                </span>
              </div>
              <img
                src={post.image}
                alt="Apif Supriadi"
                className="w-full h-24 md:w-[45vw] md:h-[12vh] lg:h-[10vh] xl:w-[30vw] rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
        {/* Project */}
        <div className="flex flex-col gap-2 bg-sky-50 p-4 rounded-xl">
          <span className="font-inter font-normal text-black text-sm mb-2">
            Project
          </span>
          {projects.map((project, index) => (
            <div
              key={index}
              className="flex flex-col justify-start items-start gap-2 bg-white rounded-lg p-2 hover:shadow md:flex-row"
            >
              <img
                src={project.image}
                alt="Apif Supriadi"
                className="w-14 h-14 rounded-lg object-cover"
              />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-inter font-semibold text-black lg:text-sm">
                  {project.name}
                </span>
                <span className="text-xs font-inter font-normal text-slate-600 lg:text-base">
                  {project.stack[0]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="flex justify-center items-center p-4 bg-gray-100">
        <span className="text-xs font-inter font-normal text-slate-600">
          Made with ❤️ by Apif Supriadi
        </span>
      </footer>
    </>
  );
}

export default App;
