import React from "react";
import { FaMapMarkerAlt, FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const AuroraGlassPortfolio = ({ resume }) => {
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
      className="w-full relative font-[Inter] text-white min-h-screen p-8"
      style={{
        background:
          "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        backdropFilter: "blur(10px)",
      }}
    >
      <button
        onClick={handlePrint}
        className="no-print fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow-lg transition"
      >
        <FaDownload />
        <span>Save PDF</span>
      </button>

      {/* Header */}
      <header className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between border-b border-cyan-400 pb-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-cyan-300 tracking-wide drop-shadow-lg">
            {heading.firstname} {heading.surname}
          </h1>
          {heading.about && (
            <p className="mt-2 text-lg italic text-cyan-100">{heading.about}</p>
          )}
          <div className="text-sm mt-4 space-y-1 text-cyan-100">
            {heading.email && <p>Email: {heading.email}</p>}
            {heading.phone && <p>Phone: {heading.phone}</p>}
            {heading.location && (
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-cyan-400" />
                {heading.location}
              </p>
            )}
            <div className="flex gap-4 text-xl mt-2 text-cyan-300">
              {heading.linkedin && (
                <a href={heading.linkedin} target="_blank" className="hover:text-cyan-100" aria-label="LinkedIn">
                  <FaLinkedin />
                </a>
              )}
              {heading.github && (
                <a href={heading.github} target="_blank" className="hover:text-cyan-100" aria-label="GitHub">
                  <FaGithub />
                </a>
              )}
              {heading.twitter && (
                <a href={heading.twitter} target="_blank" className="hover:text-cyan-100" aria-label="Twitter">
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>
        </div>
        {heading.image && (
          <div className="mt-6 md:mt-0 w-32 h-32 rounded-full overflow-hidden border-4 border-cyan-400 shadow-xl">
            <img src={heading.image} alt="Profile" className="w-full h-full object-cover" />
          </div>
        )}
      </header>

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold border-b border-cyan-400 pb-2 mb-4 text-cyan-200">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-white/10 backdrop-blur-sm text-cyan-200 px-3 py-1 rounded-full text-sm font-medium border border-cyan-300 shadow"
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
          <h2 className="text-2xl font-semibold border-b border-cyan-400 pb-2 mb-4 text-cyan-200">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-cyan-300 shadow-md"
              >
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-semibold text-cyan-100">{exp.jobTitle}</h3>
                  <span className="text-sm text-cyan-400">
                    {exp.smonth} {exp.syear} - {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                  </span>
                </div>
                <p>{exp.cname}, {exp.clocation}</p>
                {exp.worklink && (
                  <a href={exp.worklink} target="_blank" className="text-sm text-cyan-200 hover:underline">
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
          <h2 className="text-2xl font-semibold border-b border-cyan-400 pb-2 mb-4 text-cyan-200">Projects</h2>
          <div className="space-y-6">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-cyan-300 shadow-md"
              >
                <h3 className="text-lg font-semibold text-cyan-100">{proj.Title}</h3>
                <p className="text-sm text-cyan-100">{proj.Details}</p>
                {proj.Link && (
                  <a href={proj.Link} target="_blank" className="text-sm text-cyan-200 hover:underline">
                    {proj.Link}
                  </a>
                )}
                {proj.Skills?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2 text-sm">
                    {proj.Skills.map((s, i) => (
                      <span key={i} className="bg-cyan-900 text-cyan-200 px-2 py-0.5 rounded-full">
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
        <section className="max-w-5xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold border-b border-cyan-400 pb-2 mb-4 text-cyan-200">Education</h2>
          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-cyan-300 shadow-md"
              >
                <h3 className="text-lg font-semibold text-cyan-100">{edu.degree} in {edu.branch}</h3>
                <p>{edu.cname}, {edu.clocation}</p>
                <p className="text-sm text-cyan-400">{edu.startyear} - {edu.endyear}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default AuroraGlassPortfolio;
