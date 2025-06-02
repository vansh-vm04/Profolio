import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { setSkills } from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { skillOptions } from "../../constants/data";

const Skills = () => {
  const dispatch = useDispatch();
  const skills = useSelector((state)=>state.resume.skills);
  const navigate = useNavigate();

  const [skillInput, setSkillInput] = useState([]);

  useEffect(() => {
    const skillSet = skills.map(skill=>{return {label:skill,value:skill}});
    setSkillInput(skillSet)
  }, [])

  const handleAddSkill = (selectedSkill) => {
    setSkillInput(selectedSkill);
    console.log(skillInput)
  };

  const handleSave =()=>{
    dispatch(setSkills(skillInput))
    navigate('/templates')
  }

  return (
    <div className="h-full w-full flex md:ml-[216px] items-center justify-center flex-col gap-2 pt-10">
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
      <div className="grid grid-cols-1 max-w-[1000px] max-sm:grid-cols-1 max-md:p-5 max-md:pt-10 gap-6 p-20 pb-4 items-center h-full justify-center w-full">
        <div className="w-full flex-col flex h-full">
          <label>Add Skills</label>
          <Select
            isMulti
        name="skills"
        options={skillOptions}
        value={skillInput}
        onChange={(e)=>handleAddSkill(e)}
        className="skill-select"
        classNamePrefix="select"
        placeholder="Choose skills..."
          />
           
        </div>
        
      </div>
      <button
      onClick={() => handleSave()}
       className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2">
        Save and Continue
      </button>
    </div>
  );
};

export default Skills;
