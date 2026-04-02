import React from "react";
import { Github, Instagram, Linkedin } from "lucide-react";

export const SOCIAL_LINKS = [
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

export const PROJECTS = [
  {
    image: "https://tripleaiyou.uiii.ac.id/images/logo.png",
    name: "TripleAiYou (Android & Ios)",
    desc: "Sebuah role-based application (Tenaga Pendidik, Dosen dan Mahasiswa) untuk aktifitas administrasi dan akademik Civitas Akademika Universitas Islam Internasional Indonesia (UIII)",
    desc_en: "A role-based application (Educators, Lecturers, and Students) for administrative and academic activities of the Civitas Academica of the Universitas Islam Internasional Indonesia (UIII)",
    skills: ["React Native", "Expo"],
    link: "https://tripleaiyou.uiii.ac.id/",
  },
  {
    image:
      "https://careercenter.uph.edu/member/employer/logo?s=1709226000.3781&f=667f4ba7c5ba7def31db9150d3ffd335.jpeg",
    name: "PT. Primarajuli Job portal & Recruitment Test",
    desc: "Sebuah platform untuk portal lowongan pekerjaan yang dilengkapi psikotes online untuk PT. Primarajuli dan Evershine Grup",
    desc_en: "A platform for job vacancies equipped with online psychometric tests for PT. Primarajuli and Evershine Group",
    skills: ["React", "ExpressJS", "TailwindCSS"],
    link: "http://evershinetex.biz/home",
  },
  {
    image:
      "https://coffee-shop-by-apifsprd.vercel.app/_next/image?url=%2Fimages%2Flogo-transparent.png&w=1920&q=75",
    name: "Indocafe n resto",
    desc: "Sebuah web app pemesanan makanan lengkap dengan management user, order, dan menu",
    desc_en: "A web app for food ordering complete with user, order, and menu management",
    skills: ["NextJS", "TailwindCSS"],
    link: "https://coffee-shop-by-apifsprd.vercel.app/",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUjNFReUs9YHhY6tRaeXDY5GC-QvtRKdO-ZA&s",
    name: "Konveksipro",
    desc: "Sebuah web app untuk konveksi dengan management product",
    desc_en: "A web app for convection with product management",
    skills: ["ReactJS", "TailwindCSS"],
    link: "https://konveksi-app-phi.vercel.app/",
  },
];

export const SKILLS = [
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

export const JOB_EXPERIENCE = [
  {
    title: "Mobile App Developer",
    company: "Universitas Islam Internasional Indonesia (UIII)",
    company_logo: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Logo-uiii.png",
    period: "Jun 2024 - Sekarang",
    period_en: "Jun 2024 - Present",
    location: "Kota Depok, Indonesia",
    desc: "Mengembangkan 1 multi-role app dan cross-platform dengan menggunakan React Native dengan Expo framework, Mengembangkan 1 web berbasis reactjs, Design UIUX dengan Figma, Berkolaborasi dengan tim Backend untuk integrasi API dan fungsionalitas sistem",
    desc_en: "Developing 1 multi-role app and cross-platform using React Native with Expo framework, Developing 1 web based on reactjs, Design UIUX with Figma, Collaborating with Backend team for API integration and system functionality",
  },
  {
    title: "Web Developer",
    company: "PT. Primarajuli Sukses",
    company_logo: 'https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1-internal.aliyuncs.com/company-logo/b6fe35bf27129a36a9bebcfb459ac780.jpg',
    period: "Feb 2023 - Jun 2024",
    period_en: "Feb 2023 - Jun 2024",
    location: "Tangerang, Indonesia",
    desc: "Membangun 5+ web dengan antarmuka dinamis menggunakan React.js, Merancang dan mengembangkan RESTfulAPI menggunakan NodeJS dan ExpressJS untuk 5+ proyek web, Membantu dukungan teknis IT jika diperlukan",
    desc_en: "Building 5+ web with dynamic interfaces using React.js including employee management, job portal and online psychometric tests, Designing and developing RESTful APIs using NodeJS and ExpressJS for 5+ web projects, Assisting with IT technical support if needed",
  },
  {
    title: "Junior Web Developer",
    company: "PT. Passion Abadi Korpora",
    company_logo: 'https://cdn.pintarnya.com/images/employer/logo_pak_fa_2019_black_1716267603.png',
    period: "Nov 2021 - Mar 2022",
    period_en: "Nov 2021 - Mar 2022",
    location: "Kota Tangerang, Indonesia",
    desc: "Memperbaiki 5+ error dan bug pada aplikasi web berbasis PHP dengan CodeIgniter3, Menambahkan 3+ fitur baru pada aplikasi web berbasis PHP dengan CodeIgniter3",
    desc_en: "Fixing 5+ errors and bugs on PHP-based web applications with CodeIgniter3, Adding 3+ new features to PHP-based web applications with CodeIgniter3",
  }
]

export const STUDY_EXPERIENCE = [
  {
    title: "Frontend Development Bootcamp",
    university: "Dibimbing.id",
    period: "Sep 2025 - Mar 2026",
    location: "Online",
    gpa: ""
  },
  {
    title: "Teknik Informatika",
    university: "STMIK Antar Bangsa",
    period: "Sep 2016 - Nov 2020",
    location: "Kota Tangerang, Indonesia",
    gpa: "3.82"
  }
]