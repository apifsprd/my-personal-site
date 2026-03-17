import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import {
  ArrowRight,
  ArrowRightToLine,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";

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

const SKILLS = [
  {
    name_id: "Bahasa Pemrograman",
    name_en: "Programming Language",
    lists: [
      {
        name: "Javascript",
        logo: "/images/logo/js.png",
      },
      {
        name: "Typescript",
        logo: "/images/logo/ts.png",
      },
    ],
  },
  {
    name_id: "Framework",
    name_en: "Framework",
    lists: [
      {
        name: "React",
        logo: "/images/logo/react.png",
      },
      {
        name: "React Native",
        logo: "/images/logo/react.png",
      },
      {
        name: "Tailwind CSS",
        logo: "/images/logo/tailwindcss.png",
      },
      {
        name: "ExpressJS",
        logo: "/images/logo/expressjs.png",
      },
      {
        name: "Expo",
        logo: "/images/logo/expo.png",
      },
      {
        name: "NextJS",
        logo: "/images/logo/nextjs.png",
      },
    ],
  },
  {
    name_id: "Peralatan",
    name_en: "Tools",
    lists: [
      {
        name: "Git",
        logo: "/images/logo/git.png",
      },
      {
        name: "Figma",
        logo: "/images/logo/figma.png",
      },
    ],
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
    name: "Coffee Shop App",
    desc: "Aplikasi pemesanan untuk cafe berbasis web dengan antarmuka modern yang responsif, mengutamakan kecepatan akses dan pengalaman pengguna yang mulus.",
    skills: ["NextJS", "TailwindCSS"],
    link: "https://coffee-shop-by-apifsprd.vercel.app/",
  },
];

const App = () => {
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
        category_id: frontmatter.category_id,
        image: frontmatter.image,
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <section
          id="about"
          className="w-full min-h-[90vh] flex flex-col-reverse md:flex-row justify-center items-center text-center md:text-start gap-10 md:gap-16 py-12 md:py-20"
        >
          <div className="flex flex-1 flex-col gap-4 items-center md:items-start">
            <p className="font-sans text-black font-semibold text-xl md:text-3xl">
              Halo, Saya
            </p>
            <h1 className="font-sans text-4xl sm:text-5xl font-bold md:text-6xl mb-2 leading-tight text-black">
              Apif Supriadi
            </h1>
            <p className="max-w-2xl text-base md:text-lg leading-relaxed text-slate-600">
              Saya seorang{" "}
              <span className="text-sky-600 font-medium">
                Software Engineer
              </span>{" "}
              yang antusias dalam membangun aplikasi scalable. Memiliki
              pengalaman 2+ tahun dalam mengembangkan Web atau Mobile berbasis
              Javascript seperti React, React Native dan Node.js.
            </p>

            <div className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={index}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={link.link || "#"}
                  className="py-2 px-4 rounded-full bg-white border border-sky-100 flex flex-row items-center gap-2 hover:border-sky-300  transition-all duration-300"
                >
                  <span className="text-sky-600">{link.icon}</span>
                  <p className="text-xs sm:text-sm font-medium text-slate-700">
                    {link.name}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-1 justify-center items-center">
            <div className="relative">
              <img
                src="/images/profile/1x1.png"
                alt="Profile"
                className="relative w-40 h-40 sm:w-56 sm:h-56 md:w-80 md:h-80 object-cover border-4 border-second rounded-full p-4"
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-16 md:py-24">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Keahlian</h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-full mx-auto md:mx-0"></div>
            <p className="mt-4 text-slate-600 max-w-xl mx-auto md:mx-0">
              Daftar teknologi yang saya gunakan untuk membangun solusi digital
              yang efisien.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map((category, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-slate-100  hover:border-sky-200 transition-all"
              >
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 justify-center md:justify-start">
                  <span className="w-2 h-2 rounded-full bg-sky-600"></span>
                  {category.name_id}
                </h3>
                <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                  {category.lists.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex flex-col items-center group"
                    >
                      <div className="w-14 h-14 p-3 rounded-xl bg-slate-50 group-hover:bg-sky-50 transition-colors flex items-center justify-center">
                        <img
                          src={skill.logo}
                          alt={skill.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <span className="mt-2 text-[10px] font-semibold text-slate-500 uppercase tracking-tight">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Proyek Pilihan
            </h2>
            <div className="h-1.5 w-20 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-full mx-auto md:mx-0"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-sky-200 transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden bg-slate-50">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills.map((s, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold px-2 py-1 bg-sky-50 text-sky-700 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    className="w-full text-center py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-sky-600 transition-colors"
                  >
                    Lihat Proyek
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-16 md:py-24">
          <h2 className="text-3xl font-bold mb-8">Tulisan Terbaru</h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <a
                href={`/post/${post.slug}`}
                key={index}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white border border-slate-100 rounded-2xl hover:border-sky-300  transition-all"
              >
                <div>
                  <h3 className="text-lg font-bold group-hover:text-sky-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span>
                      {new Date(post.date).toLocaleDateString("id-ID", {
                        dateStyle: "medium",
                      })}
                    </span>
                    <span className="text-sky-500 font-bold text-xs uppercase px-2 py-0.5 bg-sky-50 rounded">
                      {post.category_id}
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 text-sky-600 font-semibold flex items-center gap-1 text-sm">
                  <span className="group-hover:translate-x-1 transition-transform">
                    <ArrowRight />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-center lg:text-left overflow-hidden relative">
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                  Ayo buat sesuatu yang{" "}
                  <span className="text-sky-400">luar biasa.</span>
                </h2>
                <p className="text-slate-400 text-lg">
                  Siap untuk kolaborasi? Hubungi saya untuk diskusi lebih
                  lanjut.
                </p>
              </div>
              <a
                href="mailto:apifsupriadi27@gmail.com"
                className="w-full sm:w-auto px-10 py-5 bg-sky-600 text-white font-bold rounded-2xl hover:bg-sky-500 transition-all shadow-lg shadow-sky-900/20"
              >
                Email
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default App;
