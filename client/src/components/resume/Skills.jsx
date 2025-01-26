import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setSkills, clearSkills } from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";

const Skills = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state)=>state.resume.skills);
  const navigate = useNavigate();

  const [skillInput, setSkillInput] = useState("");

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      dispatch(setSkills(skillInput));
      setSkillInput("");
      toast.success("Skill added successfully");
      // console.log(skills);
    } else {
      toast.error("Enter something to add");
    }
  };

  const handleClear=()=>{
    dispatch(clearSkills());
  }

  return (
    <div className="h-full w-full flex md:ml-[216px] items-center justify-center flex-col gap-2 md:p-10 pt-10">
      <span
        className="absolute left-2 top-2 text-blue-700 underline flex items-center text-sm md:hidden hover:text-blue-500 transition duration-200"
        onClick={() => navigate("/projects")}
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
      <h1 className="text-3xl max-md:text-2xl font-bold">Add your skills</h1>
      <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:pt-10 gap-6 p-20 pb-4 items-center h-full justify-center w-full">
        <div className="w-full flex-col flex h-full">
          <label>Add Skills</label>
          <input
            className="input2"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            placeholder="e.g. Technical Skills - React.js, MongoDB, Node.js"
          />
           <div className="items-center pt-4 justify-center flex gap-2 flex-wrap">
          <button
              type="button"
              onClick={() => handleClear()}
              className="text-white bg-red-600 hover:bg-red-500  focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-500 font-medium rounded-lg px-4 py-2 max-w-32"
            >
              Clear All
            </button>
          <button
            type="button"
            onClick={handleAddSkill}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-2 max-w-32"
          >
            Add Skill
          </button>
          </div>
        </div>

        <div className="w-full p-5 grid grid-cols-4 gap-1 rounded-md h-full">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <div
                key={index}
                className="p-2 max-h-fit text-center bg-white border rounded-md shadow-md"
              >
                <p className="text-gray-600">{skill}</p>
              </div>
            ))
          ) : (
            <span>No skills added yet</span>
          )}
        </div>
        
      </div>
      <ToastContainer />
      <button
      onClick={() => navigate("/finalise")}
       className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2">
        Next: Finalise
      </button>
    </div>
  );
};

export default Skills;
