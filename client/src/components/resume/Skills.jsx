import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { setSkills } from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'
import { skillOptions } from "../../constants/data";
import { ArrowLeft } from "lucide-react";

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
    dispatch(setSkills(skillInput.map(skill=>skill.label)))
    navigate('/templates')
  }

  return (
    <div className="resume-page">
      {/* Back button */}
      <div className="mb-4 fixed z-50">
        <button
          onClick={() => navigate('/projects')}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>
      
      <div className=" w-full flex items-center justify-center flex-col gap-2 pt-10">
        <h1 className="form-heading max-md:text-xl">Add your skills</h1>
      <div className="grid grid-cols-1 max-w-[1000px] max-sm:grid-cols-1 max-md:p-5 max-md:pt-5 gap-6 p-20 pb-4 items-center h-full justify-center w-full">
        <div className="w-full flex-col flex h-full">
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
       className="btn-save">
        Save and Continue
      </button>
    </div>
    </div>
  );
};

export default Skills;
