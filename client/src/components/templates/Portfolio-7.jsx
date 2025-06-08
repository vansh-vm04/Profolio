import React, { useRef } from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

const SleekBlackPortfolio = ({ resume }) => {
  const heading = typeof resume.heading === "string" ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === "string" ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === "string" ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === "string" ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === "string" ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: downloadRef });

  return (
    <div ref={downloadRef} className="w-full relative bg-black text-white font-sans min-h-screen p-8">
      <button
        onClick={handlePrint}
        className="no-print fixed z-50 bottom-4 right-4 flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-black px-4 py-2 rounded shadow-lg transition"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      {/* Header */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between border-b border-cyan-400 pb-6 mb-10">
        <div>
          {(heading.firstname || heading.surname) && (
            <h1 className="text-5xl font-bold text-cyan-400">
              {heading.firstname} {heading.surname}
            </h1>
          )}
          {heading.about && <p className="italic text-gray-400 mt-2 max-w-md">{heading.about}</p>}
        </div>

        {heading.image && (
          <div className="mt-4 md:mt-0 w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-500 shadow-md">
            <img src={heading.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Contact */}
      <section className="max-w-5xl mx-auto flex flex-wrap gap-6 mb-12 justify-center md:justify-start text-cyan-300 text-sm">
        {heading.email && <div>Email: {heading.email}</div>}
        {heading.phone && <div>Phone: {heading.phone}</div>}
        {heading.location && (
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt /> {heading.location}
          </div>
        )}
        <div className="flex gap-4 text-lg">
          {heading.linkedin && (
            <a href={heading.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600">
              <FaLinkedin />
            </a>
          )}
          {heading.github && (
            <a href={heading.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600">
              <FaGithub />
            </a>
          )}
          {heading.twitter && (
            <a href={heading.twitter} target="_blank" rel="noreferrer" className="hover:text-cyan-600">
              <FaTwitter />
            </a>
          )}
        </div>
      </section>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 border-b border-cyan-600 pb-2 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-cyan-700 text-white rounded px-3 py-1 text-sm font-semibold"
              >
                {skill.label || skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 border-b border-cyan-600 pb-2 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-gray-900 p-5 rounded-lg border border-cyan-800">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold text-cyan-300">{exp.jobTitle}</h3>
                  <span className="text-sm text-gray-400">
                    {exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                  </span>
                </div>
                <p className="text-gray-400">{exp.cname}, {exp.clocation}</p>
                {exp.worklink && (
                  <a href={exp.worklink} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline text-sm">
                    {exp.worklink}
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 border-b border-cyan-600 pb-2 mb-4">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-gray-900 p-5 rounded-lg border border-cyan-800">
                <h3 className="text-xl font-semibold text-cyan-300">{proj.Title}</h3>
                <p className="text-sm text-gray-400">{proj.Details}</p>
                {proj.Link && (
                  <a href={proj.Link} target="_blank" rel="noreferrer" className="text-cyan-300 hover:underline text-sm">
                    {proj.Link}
                  </a>
                )}
                {proj.Skills?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 text-cyan-400 text-sm">
                    {proj.Skills.map((skill, i) => (
                      <span key={i} className="bg-cyan-950 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-cyan-400 border-b border-cyan-600 pb-2 mb-4">Education</h2>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-gray-900 p-5 rounded-lg border border-cyan-800">
                <h3 className="text-xl font-semibold text-cyan-300">
                  {edu.degree} in {edu.branch}
                </h3>
                <p className="text-sm text-gray-400">{edu.cname}, {edu.clocation}</p>
                <p className="text-sm text-cyan-500">
                  {edu.startyear} - {edu.endyear}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default SleekBlackPortfolio;
