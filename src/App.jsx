import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import ButtonBase from "./components/ui/Button";
import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import Button from "./components/ui/Button";

const modules = import.meta.glob("./content/post/*.mdx", { eager: true });
const modules_en = import.meta.glob("./content/post_en/*.mdx", {
  eager: true,
});

const SOCIAL_LINKS = [
  {
    name: "Linkedin",
    link: "https://www.linkedin.com/in/apifsprd/",
    icon: <Linkedin size={18} />,
  },
  {
    name: "Github",
    link: "https://github.com/apifsprd",
    icon: <Github size={18} />,
  },
  {
    name: "Instagram",
    link: "https://www.instagram.com/apifsprd/",
    icon: <Instagram size={18} />,
  },
];

const PROJECTS = [
  {
    image: "https://tripleaiyou.uiii.ac.id/images/logo.png",
    name: "TripleAiYou (Android & Ios)",
    desc: "Sebuah role-based application (Tenaga Pendidik, Dosen dan Mahasiswa) untuk aktifitas administrasi dan akademik Civitas Akademika Universitas Islam Internasional Indonesia (UIII)",
    skills: ["React Native", "Expo"],
    link: "https://tripleaiyou.uiii.ac.id/",
  },
  {
    image:
      "https://careercenter.uph.edu/member/employer/logo?s=1709226000.3781&f=667f4ba7c5ba7def31db9150d3ffd335.jpeg",
    name: "PT. Primarajuli Job portal & Recruitment Test",
    desc: "Sebuah platform untuk portal lowongan pekerjaan yang dilengkapi psikotes online untuk PT. Primarajuli dan Evershine Grup",
    skills: ["React", "ExpressJS", "TailwindCSS"],
    link: "http://evershinetex.biz/home",
  },
  {
    image:
      "https://coffee-shop-by-apifsprd.vercel.app/_next/image?url=%2Fimages%2Flogo-transparent.png&w=1920&q=75",
    name: "Indocafe n resto",
    desc: "Sebuah web app pemesanan makanan lengkap dengan management user, order, dan menu",
    skills: ["NextJS", "TailwindCSS"],
    link: "https://coffee-shop-by-apifsprd.vercel.app/",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUjNFReUs9YHhY6tRaeXDY5GC-QvtRKdO-ZA&s",
    name: "Konveksipro",
    desc: "Sebuah web app untuk konveksi dengan management product",
    skills: ["ReactJS", "TailwindCSS"],
    link: "https://konveksi-app-phi.vercel.app/",
  },
];

function App() {
  const [posts, setPosts] = useState([]);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

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
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    localStorage.setItem("lang", lang);
    setPosts(sorted);
  }, [lang]);

  return (
    <Layout>
      <section
        id="hero"
        className="w-full h-[80vh] sm:h-[90vh] flex flex-col gap-8 justify-center px-4 sm:px-0"
      >
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
            Hi!
          </h1>
          <div className="flex flex-row gap-2 sm:gap-4 justify-start items-center overflow-clip flex-wrap">
            <h2 className="text-3xl  lg:text-5xl font-semibold whitespace-nowrap">
              I'm
            </h2>
            <img
              src="/images/profile/1x1.png"
              alt="apifsprd photo"
              className="w-20 sm:w-20 lg:w-24 h-20 sm:h-20 lg:h-24 rounded-full border-2 sm:border-4 border-newsky flex-shrink-0"
            />
            <h2 className="text-3xl  lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-newsky to-newblue whitespace-nowrap">
              Apif Supriadi
            </h2>
            <div className="h-1 w-4 sm:w-6 lg:w-8 bg-black flex-shrink-0"></div>
            <h2 className="text-3xl  lg:text-5xl font-semibold whitespace-nowrap">
              Mobile App Dev
            </h2>
          </div>
        </div>
        <div className="flex flex-col max-w-3xl">
          <p className="text-lg lg:text-xl leading-relaxed text-black font-medium">
            I'm a Web Developer turned Mobile App Developer. I enjoy work in the
            Javascript ecosystem. I also love exploring new technologies and
            learning new things. beside that, I'm a <span>&#9917;</span>{" "}
            football fan.
          </p>
        </div>
        <div className="flex flex-col w-full sm:w-40">
          <Button title="Read my blog" size="md" />
        </div>
        <div className="flex flex-row gap-4 max-w-3xl">
          {SOCIAL_LINKS.map((link, index) => (
            <Button
              key={index}
              variant="link"
              href={link.link}
              iconLeft={link.icon}
              title={link.name}
              size="sm"
            />
          ))}
        </div>
      </section>
      <section
        id="blog"
        className="w-full h-auto flex flex-col gap-6 sm:gap-8 justify-center my-16 sm:my-32 px-4 sm:px-0 scroll-mt-24"
      >
        <h2 className="text-xl sm:text-2xl font-semibold">Latest post</h2>
        <div className="flex flex-col gap-4">
          {posts.map((post, index) => (
            <a
              href={`/post/${post.slug}`}
              key={index}
              className="flex flex-col gap-3 sm:flex-row justify-between items-start sm:gap-4 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 transition ease-in duration-300 hover:border-newblue hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="text-base sm:text-base lg:text-lg font-semibold text-black">
                  {post.title}
                </span>
                <div className="flex flex-row justify-start items-center gap-2">
                  <span className="text-xs sm:text-sm font-normal text-slate-500">
                    {new Date(post.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-xs sm:text-sm font-normal text-slate-500">
                    {"#" + post.category_id}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      <section
        id="project"
        className="w-full h-auto flex flex-col gap-6 sm:gap-8 justify-center my-16 sm:my-32 px-4 sm:px-0 scroll-mt-24"
      >
        <h2 className="text-xl sm:text-2xl font-semibold">Latest project</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {PROJECTS.map((project, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 sm:gap-4 justify-start items-start p-3 sm:p-4 border border-gray-200 rounded-lg hover:scale-105 hover:border-newblue transition duration-300 ease-in-out"
            >
              <img
                src={project.image}
                alt={project.name}
                className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 object-cover"
              />
              <h3 className="text-base sm:text-base lg:text-lg font-semibold text-slate-900">
                {project.name}
              </h3>
              <p className="text-sm sm:text-base font-normal text-slate-900 leading-relaxed">
                {project.desc}
              </p>
              <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
                {project.skills.map((tag, index) => (
                  <div
                    key={index}
                    className="px-3 sm:px-4 py-1 flex justify-center items-center bg-gray-100 rounded-full"
                  >
                    <p className="text-xs sm:text-sm font-normal text-slate-900">
                      {tag}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-row flex-wrap justify-end mt-auto w-full">
                <Button
                  title="See more"
                  variant="link"
                  href={project.link}
                  size="md"
                  iconRight={<ArrowUpRight size={16} />}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default App;
