import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {setAdditionalSections} from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";

const Finalise = () => {
  const [website, setWebsite] = useState("");
  const [languages, setLanguages] = useState("");
  const [certifications, setCertifications] = useState("");
  const [accomplishments, setAccomplishments] = useState("");

  const dispatch = useDispatch();
  const sections = useSelector((state)=>state.resume.additionalSections);
  const resume = useSelector((state)=>state.resume);
  const navigate = useNavigate();

  useEffect(() => {
    if (sections) {
      setWebsite(sections.Website || "");
      setLanguages((sections.Languages || []).join(", "));
      setCertifications((sections.Certifications || []).join(", "));
      setAccomplishments((sections.Accomplishments || []).join(", "));
    }
    // console.log(resume)
  }, [sections,resume])

  const handleFinish = () => {
    const addSections = {
      Website: website,
      Languages: languages.split(',').map((lang) => lang.trim()),
      Certifications: certifications.split(',').map((cert) => cert.trim()),
      Accomplishments: accomplishments.split(',').map((acc) => acc.trim()),
    };
  
    dispatch(setAdditionalSections(addSections));
    navigate('/templates');
  };

  return (
    <div className=" h-full w-full flex gap-6 flex-col md:ml-[216px] items-center justify-center md:p-10 pt-10">
      <span
        className="absolute left-2 top-2 text-blue-700 underline flex items-center text-sm md:hidden hover:text-blue-500 transition duration-200"
        onClick={() => navigate("/skills")}
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
      <h1 className="text-3xl max-md:text-2xl mb-6 font-bold">
        Add additional sections
      </h1>
      <div className="w-full h-full">
        <div className="w-full px-5 md:px-20 flex flex-col justify-center">
          <label className="text-lg flex items-center">Website</label>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="Enter your website"
            className="input2"
          />
        </div>
      </div>

      <div className="w-full h-full">
        <div className="w-full px-5 md:px-20 flex flex-col justify-center">
          <label className="text-lg flex items-center">Languages</label>
          <input
            type="text"
            value={languages}
            onChange={(e) => setLanguages(e.target.value)}
            placeholder="Enter languages seperated by comas(,)"
            className="input2"
          />
        </div>
      </div>

      <div className="w-full h-full">
        <div className="w-full px-5 md:px-20 flex flex-col justify-center">
          <label className="text-lg flex items-center">Certifications</label>
          <input
            type="text"
            value={certifications}
            onChange={(e) =>
              setCertifications(e.target.value)
            }
            placeholder="Enter certifications seperated by comas(,)"
            className="input2"
          />
        </div>
      </div>

      <div className="w-full h-full">
        <div className="w-full px-5 md:px-20 flex flex-col justify-center">
          <label className="text-lg flex items-center">Accomplishments</label>
          <input
            type="text"
            value={accomplishments}
            onChange={(e) =>
              setAccomplishments(e.target.value)
            }
            placeholder="Enter accomplishments seperated by comas(,)"
            className="input2"
          />
        </div>
      </div>
      <button onClick={()=>handleFinish()} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg mt-6 px-8 py-2">
        Finish Resume
      </button>
    </div>
  );
};

export default Finalise;
