import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, clearProjects,removeProjects } from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import { skillOptions } from "../../constants/data";
import Select from "react-select";
import { ArrowLeft } from "lucide-react";
import { Trash2, Edit } from "lucide-react";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.resume.projects);
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const handleClear = () => {
    dispatch(clearProjects());
  };

  const handleDelete = async (index) => {
    dispatch(removeProjects(index));
  };

  const handleEdit = async (index) => {
    const project = projects[index];
    setProjectTitle(project.Title);
    setProjectDetails(project.Details);
    setProjectLink(project.Link);
    setSkillInput(
      project.Skills?.map((skill) => {
        return { label: skill, value: skill };
      })
    );
  };

  const [skillInput, setSkillInput] = useState([]);

  const handleAddSkill = (selectedSkill) => {
    setSkillInput(selectedSkill);
    console.log(skillInput);
  };

  const handleAddProject = async () => {
    if (projectTitle.trim() && projectDetails.trim()) {
      const newProject = {
        Title: projectTitle,
        Details: projectDetails,
        Link: projectLink,
        Skills: skillInput.map((skill) => skill.label),
      };

      dispatch(setProjects({ ...newProject }));

      setProjectTitle("");
      setProjectDetails("");
      setProjectLink("");
      setSkillInput([]);

      toast.success("Project added successfully");
    } else {
      toast.error("Project title and details are required");
    }
  };

  return (
    <div className="resume-page">
      {/* Back button */}
      <div className="mb-4 fixed z-50">
        <button
          onClick={() => navigate("/experience")}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>
      <div className="flex flex-col gap-2 md:p-10 pt-10 items-center w-full justify-center">
        <h1 className="form-heading max-md:text-xl">Add your projects</h1>

        <div className="form-box">
          <div className="w-full h-full">
            <label>Project Title</label>
            <input
              className="input2"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Expense Tracker"
            />
          </div>

          <div className="w-full">
            <label>Live Link</label>
            <input
              className="input2"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="e.g. https://github.io/xyz"
            />
          </div>

          <div className="w-full h-full">
            <label>About the project</label>
            <textarea
              className="input2 min-h-36 max-h-64"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="e.g. Developed an app..."
            />
          </div>

          <div className="w-full h-full">
            <label>Skills Used</label>
            <Select
              isMulti
              name="skills"
              options={skillOptions}
              value={skillInput}
              onChange={(e) => handleAddSkill(e)}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Choose skills..."
            />
          </div>

          <div className="items-center justify-center flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => handleClear()}
              className="text-white bg-red-600 hover:bg-red-500  focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-500 font-medium rounded-lg px-4 py-2 max-w-32"
            >
              Clear All
            </button>
            <button
              className="text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-blue-800 rounded-lg px-8 py-2"
              onClick={() => handleAddProject()}
            >
              Add Project
            </button>
            <button onClick={() => navigate("/skills")} className="btn-save">
              Save and Continue
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-5 md:px-20 max-md:p-5 w-full items-center justify-center">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={index}
                className="p-5 border rounded-md shadow-md w-full"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-bold">{project.Title}</h1>
                    {project.Link && (
                      <a
                        className="font-semibold text-blue-600 hover:underline"
                        href={project.Link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Live
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="text-gray-600 hover:text-blue-600 p-1"
                      title="Edit"
                      onClick={() => handleEdit(index)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-gray-600 hover:text-red-600 p-1"
                      title="Delete"
                      onClick={() => handleDelete(index)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 mt-2">{project.Details}</p>

                {project.Skills && project.Skills.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.Skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <span>No projects added yet</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
