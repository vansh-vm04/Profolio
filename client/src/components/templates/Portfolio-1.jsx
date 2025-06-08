import React from "react";
import { FaMapMarkerAlt,FaDownload, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { useRef } from "react";
import {useReactToPrint} from 'react-to-print'

const ColorfulPortfolio = ({resume}) => {
  const heading = typeof resume.heading === 'string' ? JSON.parse(resume.heading) : resume.heading;
  const education = typeof resume.education === 'string' ? JSON.parse(resume.education) : resume.education;
  const experience = typeof resume.experience === 'string' ? JSON.parse(resume.experience) : resume.experience;
  const projects = typeof resume.projects === 'string' ? JSON.parse(resume.projects) : resume.projects;
  const skills = typeof resume.skills === 'string' ? JSON.parse(resume.skills) : resume.skills;

  const downloadRef = useRef();

  const handlePrint = useReactToPrint({contentRef:downloadRef});

  return (
    <div ref={downloadRef} className={`w-full relative`}>
      <button
        onClick={handlePrint}
        className="no-print gap-2 items-center flex fixed bottom-4 text-xs right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg transition"
      >
        <FaDownload /><span>Save PDF</span>
      </button>

    <div className={`bg-gradient-to-tr w-full from-indigo-100 via-purple-50 to-white min-h-screen px-6 py-12 md:px-64 font-[Raleway] text-gray-800`}>
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex-1">
            {(heading.firstname || heading.surname) && (
              <h1 className="text-4xl md:text-5xl font-extrabold text-purple-700 transition-transform hover:scale-105">
                {heading.firstname} {heading.surname}
              </h1>
            )}
            {heading.about && <p className="mt-2 text-lg text-gray-600 italic transition-opacity hover:opacity-90">{heading.about}</p>}
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              {heading.email && <p>{heading.email}</p>}
              {heading.phone && <p>{heading.phone}</p>}
              {heading.location && (
                <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-purple-700" />{heading.location}</p>
              )}
              <div className="flex justify-center md:justify-start gap-4 mt-2 text-indigo-600 text-lg">
                {heading.linkedin && <a href={heading.linkedin} target="_blank" className="hover:text-purple-600" aria-label="LinkedIn"><FaLinkedin /></a>}
                {heading.github && <a href={heading.github} target="_blank" className="hover:text-purple-600" aria-label="GitHub"><FaGithub /></a>}
                {heading.twitter && <a href={heading.twitter} target="_blank" className="hover:text-purple-600" aria-label="Twitter"><FaTwitter /></a>}
              </div>
            </div>
          </div>

          {heading.image && (
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-purple-200 shadow-md transition-transform hover:scale-105">
              <img
                src={heading.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-12">
        {/* Skills */}
        {skills?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-800 border-l-4 border-purple-400 pl-3 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span key={index} className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium transition transform hover:scale-105">
                  {skill.label || skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-800 border-l-4 border-purple-400 pl-3 mb-3">Experience</h2>
            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-5 transition-transform hover:scale-[1.01]">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-1">
                    <h3 className="text-lg font-semibold text-indigo-700">{exp.jobTitle}</h3>
                    <span className="text-sm text-gray-500">
                      {exp.smonth} {exp.syear} - {exp.Working ? 'Present' : `${exp.emonth} ${exp.eyear}`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{exp.cname}, {exp.clocation}</p>
                  {exp.worklink && <a className="text-sm text-indigo-600 hover:underline" href={exp.worklink} target="_blank">{exp.worklink}</a>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-purple-800 border-l-4 border-purple-400 pl-3 mb-3">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-5 transition-transform hover:scale-[1.01]">
                  <h3 className="text-lg font-semibold text-indigo-700">{proj.Title}</h3>
                  <p className="text-sm text-gray-600">{proj.Details}</p>
                  {proj.Link && <a className="text-sm text-indigo-600 hover:underline" href={proj.Link} target="_blank">{proj.Link}</a>}
                  {proj.Skills?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2 text-sm text-purple-700">
                      {proj.Skills.map((s, i) => (
                        <span key={i} className="bg-purple-100 px-2 py-0.5 rounded-full hover:bg-purple-200">{s}</span>
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
          <section>
            <h2 className="text-xl font-bold text-purple-800 border-l-4 border-purple-400 pl-3 mb-3">Education</h2>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-5 transition-transform hover:scale-[1.01]">
                  <h3 className="text-lg font-semibold text-indigo-700">{edu.degree} in {edu.branch}</h3>
                  <p className="text-sm text-gray-600">{edu.cname}, {edu.clocation}</p>
                  <p className="text-sm text-gray-500">{edu.startyear} - {edu.endyear}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
    </div>
  );
};

export default ColorfulPortfolio;
