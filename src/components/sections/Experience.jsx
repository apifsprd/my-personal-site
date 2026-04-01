import React, { useState } from "react";
import { JOB_EXPERIENCE, STUDY_EXPERIENCE } from "../../data/constants";
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";

const Experience = ({ lang = "en" }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeStudyIdx, setActiveStudyIdx] = useState(null);

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const toggleStudyAccordion = (idx) => {
    setActiveStudyIdx(activeStudyIdx === idx ? null : idx);
  };

  return (
    <section id="experience" className="w-full py-20 px-4 sm:px-0 bg-white">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {lang === "id" ? "Pengalaman Kerja" : "Professional Journey"}
          </h2>

        </div>

        <div className="flex flex-col gap-4">
          {JOB_EXPERIENCE.map((job, index) => {
            const isOpen = activeIdx === index;
            const description = lang === "id" ? job.desc : job.desc_en;
            const points = description ? description.split(",").map(p => p.trim()) : [];
            return (
              <div
                key={index}
                className={`group border rounded-2xl transition-all duration-500 overflow-hidden ${isOpen
                  ? "border-newblue bg-slate-50/50"
                  : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
              >
                {/* Header / Trigger */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 focus:outline-none cursor-pointer"
                >
                  {/* Company Logo Wrapper */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border p-2 flex-shrink-0 transition-all duration-500 ${isOpen ? "border-newblue/30 scale-110" : "border-slate-100 group-hover:scale-105"
                    }`}>
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + job.company }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-newblue font-bold text-base select-none">
                          {job.company}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-colors ${isOpen ? "bg-newblue text-white border-newblue" : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}>
                          {lang === "id" ? job.period : job.period_en}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <MapPin size={16} className="text-slate-300" />
                      <span>{job.location}</span>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <div className={`mt-2 sm:mt-0 p-2.5 rounded-xl transition-all duration-300 ${isOpen ? "rotate-180 bg-newblue text-white " : "bg-slate-50 text-slate-400"
                    }`}>
                    <ChevronDown size={22} />
                  </div>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] pb-4 px-4 sm:px-5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pt-2 border-t border-slate-100">
                    <ul className="space-y-2 mt-3">
                      {points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                          <div className="mt-1.5 w-1 h-1 rounded-full bg-newblue flex-shrink-0" />
                          <span className="text-xs sm:text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Study Experience Section */}
        <div className="flex flex-col gap-2 mt-20 mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {lang === "id" ? "Pendidikan" : "Education"}
          </h2>
        </div>

        <div className="flex flex-col gap-4">
          {STUDY_EXPERIENCE.map((study, index) => {
            const isOpen = activeStudyIdx === index;
            return (
              <div
                key={index}
                className={`group border rounded-2xl transition-all duration-500 overflow-hidden ${isOpen
                  ? "border-newblue bg-slate-50/50"
                  : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
              >
                {/* Header / Trigger */}
                <button
                  onClick={() => toggleStudyAccordion(index)}
                  className="w-full text-left p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-5 focus:outline-none cursor-pointer"
                >
                  {/* Icon Wrapper */}
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border p-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 ${isOpen ? "border-newblue/30 scale-110" : "border-slate-100 group-hover:scale-105"
                    }`}>
                    <GraduationCap size={24} className="text-newblue" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="flex flex-col gap-1 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-tight">
                        {study.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                        <span className="text-newblue font-bold text-base select-none">
                          {study.university}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-colors ${isOpen ? "bg-newblue text-white border-newblue" : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}>
                          {study.period}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                      <MapPin size={16} className="text-slate-300" />
                      <span>{study.location}</span>
                    </div>
                  </div>

                  {/* Toggle Icon */}
                  <div className={`mt-2 sm:mt-0 p-2.5 rounded-xl transition-all duration-300 ${isOpen ? "rotate-180 bg-newblue text-white " : "bg-slate-50 text-slate-400"
                    }`}>
                    <ChevronDown size={22} />
                  </div>
                </button>

                {/* Content */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] pb-4 px-4 sm:px-5 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pt-2 border-t border-slate-100">
                    <div className="mt-3 flex flex-col gap-2">
                      {study.gpa && (
                        <div className="flex items-center gap-3 text-slate-600">
                          <div className="w-1 h-1 rounded-full bg-newblue flex-shrink-0" />
                          <span className="text-xs sm:text-sm font-semibold">GPA: {study.gpa}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-slate-600">
                        <div className="w-1 h-1 rounded-full bg-newblue flex-shrink-0" />
                        <span className="text-xs sm:text-sm">
                          {lang === "id" ? `Menyelesaikan program studi ${study.title} di ${study.university}` : `Completed ${study.title} program at ${study.university}`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section >
  );
};

export default Experience;
