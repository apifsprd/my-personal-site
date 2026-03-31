import React, { useState } from "react";
import { JOB_EXPERIENCE } from "../../data/constants";
import { Briefcase, MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const Experience = ({ lang = "en" }) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  return (
    <section id="experience" className="w-full py-20 px-0 bg-white">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col gap-2 mb-12">
          <h2 className="text-xl sm:text-2xl font-semibold">
            {lang === "id" ? "Pengalaman Kerja" : "Professional Journey"}
          </h2>

        </div>

        <div className="flex flex-col gap-5">
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
                  className="w-full text-left p-6 sm:p-7 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-7 focus:outline-none cursor-pointer"
                >
                  {/* Company Logo Wrapper */}
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border p-3 flex-shrink-0 transition-all duration-500 ${isOpen ? "border-newblue/30 scale-110" : "border-slate-100 group-hover:scale-105"
                    }`}>
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-full h-full object-contain"
                      onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + job.company }}
                    />
                  </div>

                  {/* Text Content */}
                  <div className="flex-grow flex flex-col items-center sm:items-start text-center sm:text-left pt-1">
                    <div className="flex flex-col gap-2 mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                        <span className="text-newblue font-bold text-lg select-none">
                          {job.company}
                        </span>
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors ${isOpen ? "bg-newblue text-white border-newblue" : "bg-slate-50 text-slate-500 border-slate-100"
                          }`}>
                          {lang === "id" ? job.period : job.period_en}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
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
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] pb-6 px-5 sm:px-6 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="pt-2 border-t border-slate-100">
                    <ul className="space-y-3 mt-4">
                      {points.map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-3 text-slate-600 leading-relaxed">
                          <div className="mt-2 w-1.5 h-1.5 rounded-full bg-newblue flex-shrink-0" />
                          <span className="text-sm sm:text-base">{point}</span>
                        </li>
                      ))}
                    </ul>
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
