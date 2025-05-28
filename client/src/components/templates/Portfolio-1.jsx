import React from "react";
import { useSelector } from "react-redux";

const PortfolioTemplate1 = () => {
  const resume = useSelector((state) => state.resume);

  const heading = resume.heading && typeof resume.heading === 'string' ? JSON.parse(resume.heading) : resume.heading;
  const education = resume.education && typeof resume.education === 'string' ? JSON.parse(resume.education) : resume.education;
  const experience = resume.experience && typeof resume.experience === 'string' ? JSON.parse(resume.experience) : resume.experience;
  const projects = resume.projects && typeof resume.projects === 'string' ? JSON.parse(resume.projects) : resume.projects;
  const skills = resume.skills && typeof resume.skills === 'string' ? JSON.parse(resume.skills) : resume.skills;

  return (
    <div className="max-w-[900px] mx-auto px-6 md:px-12 py-12 font-sans text-[12px] text-[#1b1b1b]">
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-12">
        {/* Left Column */}
        <aside className="space-y-10">
          {/* Header */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {heading.firstname} {heading.surname}
            </h1>
            {heading.about && (
              <p className="text-[11px] mt-2 leading-snug text-[#4f4f4f]">
                {heading.about}
              </p>
            )}
          </div>

          {/* Contact */}
          <div className="space-y-1 text-[11px] text-[#333] leading-tight">
            {heading.email && <p>{heading.email}</p>}
            {heading.phone && <p>{heading.phone}</p>}
            {heading.location && <p>{heading.location}</p>}
            {heading.linkedin && <p><a href={heading.linkedin} className="text-blue-600">linkedin</a></p>}
            {heading.github && <p><a href={heading.github} className="text-blue-600">github</a></p>}
            {heading.twitter && <p><a href={heading.twitter} className="text-blue-600">twitter</a></p>}
          </div>

          {/* Skills */}
          {skills?.length > 0 && (
            <div>
              <h2 className="uppercase text-[10px] font-semibold tracking-[0.15em] text-[#999] mb-2">Skills</h2>
              <ul className="space-y-1 text-[11px] text-[#111]">
                {skills.map((skill, index) => (
                  <li key={index}>{skill.label || skill}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Right Column */}
        <main className="flex flex-col gap-y-10">
          {/* Experience */}
          {experience?.length > 0 && (
            <section>
              <h2 className="uppercase text-[10px] font-semibold tracking-[0.15em] text-[#999] mb-2">Experience</h2>
              <div className="space-y-6">
                {experience.map((exp, index) => (
                  <div key={index}>
                    <div className="flex flex-col md:flex-row justify-between md:items-baseline">
                      <h3 className="font-semibold text-[12px] leading-snug">{exp.jobTitle}</h3>
                      <span className="text-[11px] text-[#777]">
                        {exp.smonth} {exp.syear} - {exp.Working ? 'Present' : `${exp.emonth} ${exp.eyear}`}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#444] leading-snug">{exp.cname}, {exp.clocation}</p>
                    {exp.worklink && <a className="text-[11px] text-blue-600" href={exp.worklink} target="_blank">{exp.worklink}</a>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <section>
              <h2 className="uppercase text-[10px] font-semibold tracking-[0.15em] text-[#999] mb-2">Projects</h2>
              <div className="space-y-6">
                {projects.map((proj, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-[12px] text-[#1a1a1a]">{proj.Title}</h3>
                    <p className="text-[11px] text-[#444] leading-snug">{proj.Details}</p>
                    {proj.Link && <a className="text-[11px] text-blue-600" href={proj.Link} target="_blank">{proj.Link}</a>}
                    {proj.Skills?.length > 0 && (
                      <ul className="mt-1 flex flex-wrap gap-2 text-[10px] text-[#555]">
                        {proj.Skills.map((s, i) => (
                          <li key={i} className="bg-[#f2f2f2] px-2 py-0.5 rounded-full">{s}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <section>
              <h2 className="uppercase text-[10px] font-semibold tracking-[0.15em] text-[#999] mb-2">Education</h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index}>
                    <h3 className="font-semibold text-[12px] leading-snug">{edu.degree} in {edu.branch}</h3>
                    <p className="text-[11px] text-[#444] leading-snug">{edu.cname}, {edu.clocation}</p>
                    <p className="text-[11px] text-[#777]">{edu.startyear} - {edu.endyear}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default PortfolioTemplate1;