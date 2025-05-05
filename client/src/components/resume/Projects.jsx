import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { setProjects, clearProjects } from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state)=>state.resume.projects);
  const navigate = useNavigate();

  const [projectTitle, setProjectTitle] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [projectLink, setProjectLink] = useState("");

  const handleClear=()=>{
    dispatch(clearProjects());
  }

  const handleAddProject = () => {
    if (projectTitle.trim() && projectDetails.trim()) {
      const newProject = {
        Title: projectTitle,
        Details: projectDetails,
        Link: projectLink,
      };

      dispatch(setProjects({...newProject}));

      setProjectTitle("");
      setProjectDetails("");
      setProjectLink("");

      toast.success("Project added successfully");
    } else {
      toast.error("Project title and details are required");
    }
  };

  return (
    <div className="h-full w-full flex md:ml-[216px] items-center justify-center">
      <span
        className="absolute left-2 top-2 text-blue-700 underline flex items-center text-sm md:hidden hover:text-blue-500 transition duration-200"
        onClick={() => navigate("/experience")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </span>
      <div className="flex flex-col gap-2 md:p-10 pt-10 items-center w-full justify-center">
        <h1 className="text-3xl max-md:text-2xl font-bold">Add your projects</h1>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:p-10 gap-6 pt-10 px-20 items-center justify-center w-full">
          <div className="w-full h-full">
            <label>Project Title</label>
            <input
              className="input2"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. Expense Tracker"
            />
          </div>

          <div className="w-full h-full">
            <label>Project Details</label>
            <input
              className="input2"
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
              placeholder="e.g. Developed an app..."
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

          <div className="items-center justify-center flex gap-2 flex-wrap">
        <button
              type="button"
              onClick={() => handleClear()}
              className="text-white bg-red-600 hover:bg-red-500  focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-500 font-medium rounded-lg px-4 py-2 max-w-32"
            >
              Clear All
            </button>
        <button className="text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-blue-800 rounded-lg px-8 py-2" 
        onClick={()=>handleAddProject()}>
          Add Project
        </button>
        <button
        onClick={() => navigate("/skills")}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2"
        >Next: Skills</button>
        </div>
        </div>

        <div className="flex flex-col gap-2 py-5 md:px-20 max-md:p-5 w-full items-center justify-center">
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div
                key={index}
                className="p-5 border rounded-md shadow-md w-full"
              >
                <div className="flex justify-between">
                  <h1 className="text-xl font-bold">{project.Title}</h1>
                  {project.Link && (
                    <a className="font-semibold" href={project.Link} target="_blank" rel="noopener noreferrer">
                      Live
                    </a>
                  )}
                </div>
                <p className="text-gray-600">{project.Details}</p>
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
