import React, { useRef } from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";

const CyberNeonPortfolio = ({ resume }) => {
  const heading = typeof resume.heading === "string" ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === "string" ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === "string" ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === "string" ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === "string" ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();
  const handlePrint = useReactToPrint({ contentRef: downloadRef });

  return (
    <div
      ref={downloadRef}
      className="w-full relative font-mono bg-black text-green-400 min-h-screen p-12 max-w-5xl mx-auto"
    >
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 text-black px-5 py-2 rounded-lg shadow-lg hover:bg-green-400 transition"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      {/* Header */}
      <header className="mb-12 border-b border-green-500 pb-8">
        <div className="flex justify-between items-center">
          <div>
            {(heading.firstname || heading.surname) && (
              <h1 className="text-5xl font-bold">
                {heading.firstname} {heading.surname}
              </h1>
            )}
            {heading.about && <p className="mt-2 text-lg text-green-300 max-w-md">{heading.about}</p>}
          </div>

          {heading.image && (
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 shadow-lg">
              <img src={heading.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </header>

      {/* Contact */}
      <section className="mb-12 text-sm text-green-300">
        <div className="flex flex-wrap gap-8">
          {heading.email && <span>Email: {heading.email}</span>}
          {heading.phone && <span>Phone: {heading.phone}</span>}
          {heading.location && (
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt /> {heading.location}
            </span>
          )}
        </div>
        <div className="flex gap-6 mt-2 text-lg">
          {heading.linkedin && <a href={heading.linkedin} target="_blank" className="hover:text-white"><FaLinkedin /></a>}
          {heading.github && <a href={heading.github} target="_blank" className="hover:text-white"><FaGithub /></a>}
          {heading.twitter && <a href={heading.twitter} target="_blank" className="hover:text-white"><FaTwitter /></a>}
        </div>
      </section>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold border-b border-green-500 pb-2 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-green-900 px-4 py-1 rounded-full text-sm">
                {skill.label || skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold border-b border-green-500 pb-2 mb-4">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div key={idx} className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold">{exp.jobTitle}</h3>
                <p className="text-green-300 text-sm">{exp.cname}, {exp.clocation}</p>
                <p className="text-sm">{exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}</p>
                {exp.worklink && <a href={exp.worklink} className="text-green-400 hover:underline text-sm">{exp.worklink}</a>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold border-b border-green-500 pb-2 mb-4">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold">{proj.Title}</h3>
                <p className="text-green-300 text-sm">{proj.Details}</p>
                {proj.Link && <a href={proj.Link} className="text-green-400 hover:underline text-sm">{proj.Link}</a>}
                <div className="flex flex-wrap gap-2 mt-1">
                  {proj.Skills?.map((s, i) => (
                    <span key={i} className="bg-green-900 px-2 py-0.5 rounded-full text-xs">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold border-b border-green-500 pb-2 mb-4">Education</h2>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className="border-l-4 border-green-500 pl-4">
                <h3 className="text-xl font-semibold">{edu.degree} in {edu.branch}</h3>
                <p className="text-green-300 text-sm">{edu.cname}, {edu.clocation}</p>
                <p className="text-sm">{edu.startyear} - {edu.endyear}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CyberNeonPortfolio;

