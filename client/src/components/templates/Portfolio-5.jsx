import React, { useRef } from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

const MinimalistWhitePortfolio = ({ resume }) => {
  const heading = typeof resume.heading === "string" ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === "string" ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === "string" ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === "string" ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === "string" ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();
  const handlePrint = useReactToPrint({ contentRef:downloadRef });

  return (
    <div ref={downloadRef} className="w-full relative bg-white text-gray-900 font-sans min-h-screen p-16 max-w-5xl mx-auto">
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-6 right-6 flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      {/* Header */}
      <header className="mb-16 flex flex-col md:flex-row items-center justify-between border-b border-gray-300 pb-8">
        <div>
          {(heading.firstname || heading.surname) && (
            <h1 className="text-6xl font-extrabold tracking-wide leading-tight">
              {heading.firstname} {heading.surname}
            </h1>
          )}
          {heading.about && <p className="mt-3 text-lg font-light max-w-lg">{heading.about}</p>}
        </div>

        {heading.image && (
          <div className="mt-6 md:mt-0 w-28 h-28 rounded-full overflow-hidden border-2 border-gray-300 shadow">
            <img src={heading.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Contact */}
      <section className="flex flex-wrap gap-8 text-gray-600 mb-20 text-sm">
        {heading.email && <div>Email: {heading.email}</div>}
        {heading.phone && <div>Phone: {heading.phone}</div>}
        {heading.location && (
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt /> {heading.location}
          </div>
        )}
        <div className="flex gap-6 text-lg text-gray-700">
          {heading.linkedin && (
            <a href={heading.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-gray-900">
              <FaLinkedin />
            </a>
          )}
          {heading.github && (
            <a href={heading.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-gray-900">
              <FaGithub />
            </a>
          )}
          {heading.twitter && (
            <a href={heading.twitter} target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-gray-900">
              <FaTwitter />
            </a>
          )}
        </div>
      </section>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-6">Skills</h2>
          <ul className="flex flex-wrap gap-4 list-none p-0 m-0">
            {skills.map((skill, idx) => (
              <li
                key={idx}
                className="bg-gray-100 rounded-full px-4 py-1 font-medium text-gray-700 cursor-default select-none"
              >
                {skill.label || skill}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-6">Experience</h2>
          <div className="space-y-8">
            {experience.map((exp, idx) => (
              <article key={idx} className="pb-4 border-b border-gray-200">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                  <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
                  <time className="text-sm text-gray-500 mt-1 md:mt-0">
                    {exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                  </time>
                </header>
                <p className="text-gray-700 font-light">
                  {exp.cname}, {exp.clocation}
                </p>
                {exp.worklink && (
                  <a href={exp.worklink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                    {exp.worklink}
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-6">Projects</h2>
          <div className="space-y-8">
            {projects.map((proj, idx) => (
              <article key={idx} className="pb-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold">{proj.Title}</h3>
                <p className="text-gray-700 font-light">{proj.Details}</p>
                {proj.Link && (
                  <a href={proj.Link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                    {proj.Link}
                  </a>
                )}
                {proj.Skills?.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-2 text-gray-600 text-sm">
                    {proj.Skills.map((skill, i) => (
                      <li
                        key={i}
                        className="bg-gray-200 px-3 py-1 rounded-full cursor-default select-none"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold border-b border-gray-300 pb-2 mb-6">Education</h2>
          <div className="space-y-8">
            {education.map((edu, idx) => (
              <article key={idx} className="pb-4 border-b border-gray-200">
                <h3 className="text-xl font-semibold">
                  {edu.degree} in {edu.branch}
                </h3>
                <p className="font-light text-gray-700">
                  {edu.cname}, {edu.clocation}
                </p>
                <time className="text-gray-500">{edu.startyear} - {edu.endyear}</time>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default MinimalistWhitePortfolio;
