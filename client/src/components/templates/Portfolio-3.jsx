import React, { useRef } from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

const Template3 = ({ resume }) => {
  const heading = typeof resume.heading === "string" ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === "string" ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === "string" ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === "string" ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === "string" ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();
  const handlePrint = useReactToPrint({ contentRef:downloadRef});

  return (
    <div ref={downloadRef} className=" w-full min-h-screen bg-white text-gray-800 px-10 py-14 font-serif">
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-6 right-6 flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-3 rounded-full shadow-md font-semibold"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      <header className="max-w-5xl mx-auto mb-16 border-b-4 border-teal-600 pb-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8">
          <div>
            <h1 className="text-5xl font-bold tracking-tight">{heading.firstname} {heading.surname}</h1>
            {heading.about && <p className="italic text-gray-600 mt-3">{heading.about}</p>}

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              {heading.email && <p>{heading.email}</p>}
              {heading.phone && <p>{heading.phone}</p>}
              {heading.location && (
                <p className="flex items-center gap-2 text-gray-600">
                  <FaMapMarkerAlt className="text-teal-600" /> {heading.location}
                </p>
              )}
            </div>

            <div className="flex gap-6 mt-5 text-teal-600 text-2xl">
              {heading.linkedin && (
                <a href={heading.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
              {heading.github && (
                <a href={heading.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {heading.twitter && (
                <a href={heading.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>

          {heading.image && (
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-teal-600">
              <img src={heading.image} alt="Profile" className="object-cover w-full h-full" />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto space-y-14">
        {skills?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold border-l-8 border-teal-600 pl-3 mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-teal-100 text-teal-800 px-4 py-1 rounded-md font-medium cursor-default hover:bg-teal-200 transition"
                >
                  {skill.label || skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold border-l-8 border-teal-600 pl-3 mb-8">Experience</h2>
            <div className="space-y-7">
              {experience.map((exp, i) => (
                <article key={i} className="p-6 bg-teal-50 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-teal-700">{exp.jobTitle}</h3>
                    <time className="text-sm text-gray-500">
                      {exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                    </time>
                  </div>
                  <p className="text-gray-700">
                    {exp.cname}, {exp.clocation}
                  </p>
                  {exp.worklink && (
                    <a
                      href={exp.worklink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 hover:underline text-sm"
                    >
                      {exp.worklink}
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {projects?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold border-l-8 border-teal-600 pl-3 mb-8">Projects</h2>
            <div className="space-y-7">
              {projects.map((proj, i) => (
                <article key={i} className="p-6 bg-teal-50 rounded-lg shadow hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-teal-700">{proj.Title}</h3>
                  <p className="text-gray-700">{proj.Details}</p>
                  {proj.Link && (
                    <a
                      href={proj.Link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-teal-600 hover:underline text-sm"
                    >
                      {proj.Link}
                    </a>
                  )}
                  {proj.Skills?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3 text-teal-600 text-sm">
                      {proj.Skills.map((s, idx) => (
                        <span key={idx} className="bg-teal-200 px-3 py-1 rounded-md cursor-default">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {education?.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold border-l-8 border-teal-600 pl-3 mb-8">Education</h2>
            <div className="space-y-7">
              {education.map((edu, i) => (
                <article
                  key={i}
                  className="p-6 bg-teal-50 rounded-lg shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold text-teal-700">
                    {edu.degree} in {edu.branch}
                  </h3>
                  <p className="text-gray-700">
                    {edu.cname}, {edu.clocation}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {edu.startyear} - {edu.endyear}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Template3;
