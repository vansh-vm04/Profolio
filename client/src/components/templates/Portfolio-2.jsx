import React, { useRef } from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

const Template2 = ({ resume }) => {
  const heading = typeof resume.heading === "string" ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === "string" ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === "string" ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === "string" ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === "string" ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();
  const handlePrint = useReactToPrint({ contentRef:downloadRef });

  return (
    <div ref={downloadRef} className="w-full bg-gray-900 text-gray-300 min-h-screen px-8 py-12 font-sans">
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-5 right-5 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      <header className="max-w-4xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <div>
          <h1 className="text-5xl font-bold tracking-wide">
            {heading.firstname} {heading.surname}
          </h1>
          {heading.about && <p className="italic mt-2 text-blue-400">{heading.about}</p>}
          <div className="mt-3 space-y-1 text-sm">
            {heading.email && <p>{heading.email}</p>}
            {heading.phone && <p>{heading.phone}</p>}
            {heading.location && (
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> {heading.location}
              </p>
            )}
          </div>
          <div className="flex gap-4 mt-4 text-xl text-blue-500">
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
          <div className="mt-8 md:mt-0 md:ml-8 w-28 h-28 rounded-full overflow-hidden border-4 border-blue-500">
            <img src={heading.image} alt="Profile" className="object-cover w-full h-full" />
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {skills?.length > 0 && (
          <section>
            <h2 className="border-b border-blue-600 pb-1 mb-4 text-xl font-semibold text-blue-400">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-blue-700 px-4 py-1 rounded-full text-sm font-semibold tracking-wide hover:bg-blue-600 cursor-default"
                >
                  {skill.label || skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience?.length > 0 && (
          <section>
            <h2 className="border-b border-blue-600 pb-1 mb-6 text-xl font-semibold text-blue-400">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <article
                  key={i}
                  className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-blue-300">{exp.jobTitle}</h3>
                    <time className="text-sm text-gray-400">
                      {exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                    </time>
                  </div>
                  <p className="text-gray-400">
                    {exp.cname}, {exp.clocation}
                  </p>
                  {exp.worklink && (
                    <a
                      href={exp.worklink}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline text-sm"
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
            <h2 className="border-b border-blue-600 pb-1 mb-6 text-xl font-semibold text-blue-400">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj, i) => (
                <article
                  key={i}
                  className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-blue-300">{proj.Title}</h3>
                  <p className="text-gray-400">{proj.Details}</p>
                  {proj.Link && (
                    <a
                      href={proj.Link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400 hover:underline text-sm"
                    >
                      {proj.Link}
                    </a>
                  )}
                  {proj.Skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-white">
                      {proj.Skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-700 px-2 py-0.5 rounded-full cursor-default"
                        >
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
            <h2 className="border-b border-blue-600 pb-1 mb-6 text-xl font-semibold text-blue-400">Education</h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <article
                  key={i}
                  className="bg-gray-800 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-blue-300">
                    {edu.degree} in {edu.branch}
                  </h3>
                  <p className="text-gray-400">
                    {edu.cname}, {edu.clocation}
                  </p>
                  <p className="text-gray-500 text-sm">
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

export default Template2;
