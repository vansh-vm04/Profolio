import React from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const PastelPortfolio = ({ resume }) => {
  const heading = typeof resume.heading === "string" ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === "string" ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === "string" ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === "string" ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === "string" ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: downloadRef });

  return (
    <div ref={downloadRef} className="w-full relative font-serif text-gray-700 bg-gradient-to-br from-pink-50 via-white to-green-50 min-h-screen p-8">
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded shadow-lg transition"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      {/* Header */}
      <header className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between border-b-2 border-pink-300 pb-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold text-pink-600">
            {heading.firstname} {heading.surname}
          </h1>
          {heading.about && <p className="italic mt-2 text-green-700">{heading.about}</p>}
          <div className="text-sm mt-3 space-y-1">
            {heading.email && <p>Email: {heading.email}</p>}
            {heading.phone && <p>Phone: {heading.phone}</p>}
            {heading.location && (
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-pink-500" />
                {heading.location}
              </p>
            )}
            <div className="flex gap-4 text-lg mt-2 text-pink-600">
              {heading.linkedin && (
                <a href={heading.linkedin} target="_blank" className="hover:text-green-600" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
              {heading.github && (
                <a href={heading.github} target="_blank" className="hover:text-green-600" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {heading.twitter && (
                <a href={heading.twitter} target="_blank" className="hover:text-green-600" aria-label="Twitter">
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>
        {heading.image && (
          <div className="mt-4 md:mt-0 w-28 h-28 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg">
            <img src={heading.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold border-b border-green-300 pb-1 mb-4 text-pink-600">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-pink-200 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                {skill.label || skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold border-b border-green-300 pb-1 mb-4 text-pink-600">Experience</h2>
          <div className="space-y-5">
            {experience.map((exp, idx) => (
              <div key={idx} className="bg-white p-4 rounded border border-pink-200 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-green-700">{exp.jobTitle}</h3>
                  <span className="text-sm text-pink-500">
                    {exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                  </span>
                </div>
                <p>{exp.cname}, {exp.clocation}</p>
                {exp.worklink && (
                  <a href={exp.worklink} target="_blank" className="text-sm text-pink-500 hover:underline">
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
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold border-b border-green-300 pb-1 mb-4 text-pink-600">Projects</h2>
          <div className="space-y-5">
            {projects.map((proj, idx) => (
              <div key={idx} className="bg-white p-4 rounded border border-green-100 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">{proj.Title}</h3>
                <p className="text-sm">{proj.Details}</p>
                {proj.Link && (
                  <a href={proj.Link} target="_blank" className="text-sm text-pink-500 hover:underline">
                    {proj.Link}
                  </a>
                )}
                {proj.Skills?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {proj.Skills.map((s, i) => (
                      <span key={i} className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                        {s}
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
        <section className="max-w-4xl mx-auto mb-10">
          <h2 className="text-2xl font-semibold border-b border-green-300 pb-1 mb-4 text-pink-600">Education</h2>
          <div className="space-y-5">
            {education.map((edu, idx) => (
              <div key={idx} className="bg-white p-4 rounded border border-pink-100 shadow-sm">
                <h3 className="text-lg font-semibold text-green-700">{edu.degree} in {edu.branch}</h3>
                <p>{edu.cname}, {edu.clocation}</p>
                <p className="text-sm text-pink-500">{edu.startyear} - {edu.endyear}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default PastelPortfolio;
