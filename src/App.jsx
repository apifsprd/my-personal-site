import { ArrowUpRight, Github, Instagram, Linkedin } from "lucide-react";
import "./App.css";
import { useEffect, useState } from "react";
import Layout from "./Layout";

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
];

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
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    localStorage.setItem("lang", lang);
    setPosts(sorted);
  }, [lang]);

  return (
    <Layout lang={lang} onSetLang={setLang}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Header - Responsive */}
        <section
          id="home"
          className="w-full min-h-[400px] sm:min-h-[500px] my-8 sm:my-16 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-center scroll-mt-24"
        >
          <div className="w-full md:w-[40%] flex justify-center order-1 md:order-1">
            <img
              src="/images/profile/1x1.png"
              alt="Profile"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-[50%] flex flex-col gap-3 sm:gap-4 order-2 md:order-2 text-center md:text-left">
            <p className="text-base font-normal text-slate-900">
              Halo! <span className="text-2xl">👋</span>
            </p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              Saya Apif Supriadi,
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 leading-relaxed">
              Saya seorang Frontend Web dan Mobile App Developer yang menyukai
              sepakbola
            </h2>
            <div className="flex flex-row flex-wrap justify-center md:justify-start items-center gap-3 sm:gap-4 mt-4">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={index}
                  target="_blank"
                  href="#"
                  className="py-2 px-3 sm:px-4 rounded-full bg-sky-100 flex flex-row items-center gap-2 hover:bg-sky-300 transition-colors duration-500 cursor-pointer"
                >
                  <span>{link.icon}</span>
                  <p className="text-xs sm:text-sm font-normal text-slate-900">
                    {link.name}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* About - Responsive */}
        <section
          id="about"
          className="w-full min-h-[300px] sm:min-h-[400px] my-8 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-start scroll-mt-24"
        >
          <div className="w-full md:w-[50%] flex flex-col gap-3 sm:gap-4 order-2 md:order-1">
            <p className="text-base font-normal text-slate-900">Tentang</p>
            <h5 className="text-lg sm:text-xl font-semibold text-slate-900">
              Saya berpengalaman 2+ tahun dalam pengembangan web dan mobile app
              berbasis Javascript
            </h5>
            <p className="text-sm sm:text-base font-normal text-slate-900 leading-relaxed">
              Saya sangat antusias dalam menciptakan kode berkualitas tinggi
              yang mengikuti praktik terbaik dan standar industri. Saya selalu
              mencari tantangan baru dan peluang untuk berkembang sebagai
              seorang pengembang. Diluar pekerjaan, saya sangat tertarik dengan
              sepakbola, bagi saya mengembangkan sebuah aplikasi dan sepakbola
              punya kaitan yang kuat. seperti kerjasama tim dan komunikasi yang
              baik
            </p>
          </div>
          <div className="w-full md:w-[40%] flex justify-center md:justify-end order-1 md:order-2">
            <img
              src="/images/profile/google.jpeg"
              alt="@ google HQ"
              className="w-64 h-64 sm:w-72 sm:h-72 object-cover rounded-lg shadow-md cursor-pointer hover:scale-105 transition-all duration-300"
            />
          </div>
        </section>

        {/* Skills - Responsive */}
        <section
          id="skills"
          className="w-full min-h-[400px] sm:min-h-[500px] my-8 flex flex-col gap-4 sm:gap-6 justify-start items-start scroll-mt-24"
        >
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            <h5 className="text-lg sm:text-xl font-semibold text-slate-900">
              Kemampuan Teknis
            </h5>
            <p className="text-sm sm:text-base font-normal text-slate-900 leading-relaxed">
              Ringkasan lengkap tentang keterampilan teknis dan pengalaman saya
              dalam pengembangan aplikasi web dan seluler.
            </p>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 justify-start items-start p-3 sm:p-4 h-auto border border-slate-200 rounded-xl"
              >
                <div className="flex flex-col gap-2">
                  <p className="text-base font-semibold text-slate-900">
                    {lang === "id" ? skill.name_id : skill.name_en}
                  </p>
                </div>
                <div className="w-full grid grid-cols-2 gap-3 sm:gap-4">
                  {skill.lists.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-1.5 sm:gap-2 items-center bg-sky-100 px-3 sm:px-4 py-3 rounded-xl hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                    >
                      <img
                        src={item.logo}
                        alt={`${item.name}-logo`}
                        className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                      />
                      <p className="text-xs sm:text-sm text-center">
                        {item.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects - Responsive */}
        <section
          id="projects"
          className="w-full min-h-[400px] sm:min-h-[500px] my-8 flex flex-col gap-4 sm:gap-6 justify-start items-start scroll-mt-24"
        >
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            <h5 className="text-lg sm:text-xl font-semibold text-slate-900">
              Proyek
            </h5>
            <p className="text-sm sm:text-base font-normal text-slate-900 leading-relaxed">
              Berikut ini adalah beberapa proyek yang telah atau sedang saya
              kembangkan.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {PROJECTS.map((project, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 sm:gap-4 justify-start items-start p-3 sm:p-4 border border-slate-300 rounded-lg hover:scale-105 transition duration-300 ease-in-out"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-cover"
                />
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">
                  {project.name}
                </h3>
                <p className="text-sm sm:text-base font-normal text-slate-900 leading-relaxed">
                  {project.desc}
                </p>
                <div className="flex flex-row flex-wrap gap-2 justify-start items-center">
                  {project.skills.map((tag, index) => (
                    <div
                      key={index}
                      className="px-3 sm:px-4 py-1 flex justify-center items-center bg-slate-100 rounded-full"
                    >
                      <p className="text-xs sm:text-sm font-normal text-slate-900">
                        {tag}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-row flex-wrap justify-end mt-auto w-full">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-row items-center gap-1 p-2"
                  >
                    <p className="text-sm sm:text-base text-sky-500 underline underline-offset-4 hover:no-underline">
                      Lihat Detail
                    </p>
                    <ArrowUpRight className="w-4 h-4 text-sky-500" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Blog - Responsive */}
        <section
          id="blog"
          className="flex flex-col gap-4 rounded-xl scroll-mt-24"
        >
          <span className="font-semibold text-black text-sm sm:text-base mb-2">
            Blog
          </span>
          {posts.map((post, index) => (
            <a
              href={`/post/${post.slug}`}
              key={index}
              className="flex flex-col gap-3 sm:flex-row justify-between items-start sm:gap-4 bg-white border border-gray-200 rounded-lg p-3 sm:p-4 transition ease-in duration-300 hover:bg-sky-100 hover:-translate-y-1 cursor-pointer"
            >
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="text-base sm:text-lg font-semibold text-black">
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
        </section>

        <section
          id="contact"
          className="w-full h-auto my-8 flex flex-col gap-4 sm:gap-6 justify-start items-start scroll-mt-24"
        >
          <div className="bg-sky-100 rounded-xl w-full h-auto p-8 flex flex-col gap-4 justify-start items-start">
            <h1 className="text-lg sm:text-xl font-semibold text-slate-900">
              Saya siap berkolaborasi!
            </h1>
            <p className="text-sm sm:text-base font-normal text-slate-900">
              Saya sedang membuka kesempatan untuk proyek baru. Mari diskusikan
              bagaimana saya dapat membatu visi Anda menjadi kenyataan melalui
              solusi teknologi yang tepat.
            </p>
            <a
              href="mailto:apifsupriadi27@gmail.com"
              target="_blank"
              className="px-4 py-4 bg-sky-600 text-white rounded-xl hover:bg-sky-500 transition ease-in duration-300"
            >
              Hubungi via Email
            </a>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default App;
