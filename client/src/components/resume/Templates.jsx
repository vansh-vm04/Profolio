import React, { useEffect } from "react";
import { templates } from "../../constants/data";
import Template from "../other/Template";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTemplate } from "../../features/resume/resumeSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setResume } from "../../features/user/userSlice";
const env = await import.meta.env;

const Templates = () => {
  const resume = useSelector((state) => state.resume);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [resumeHtml, setResumeHtml] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    handleSelect(resume.template);
  }, [resume]);

  const handleSelect = async (id) => {
    dispatch(setTemplate(id));
    // console.log(JSON.stringify(resume));
    try {
      var response = await fetch(`${env.VITE_SERVER_URL}/resume/view`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resume),
      });
      // console.log(response);

      if (response.ok) {
        const html = await response.text();
        const blob = new Blob([html], { type: "text/html" });
        const iframeSrc = URL.createObjectURL(blob);
        setResumeHtml(iframeSrc);
      }else{
        toast.error("Some error occured, Try Again");
      }
    } catch (error) {
      console.log(error);
      setResumeHtml(<h2>Error</h2>);
      toast.error("Some error occured, Try Again");
    }
  };

  const download = async () => {
    try {
      if (user) {
        var userID = user.id;
        // console.log("userId: " + userID);
      }
      const token = localStorage.getItem("token");
      const response = await fetch(`${env.VITE_SERVER_URL}/resume/download`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          UserID: userID,
          authorization: token,
        },
        body: JSON.stringify(resume),
      });
      if (response.status == 404 || response.status == 401) {
        toast.info(`Please login to download resume`);
        navigate("/login");
      }
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        const resumes = await JSON.parse(response.headers.get("Resumes"));
        dispatch(setResume(resumes));
        navigate('/')
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured, Try Again");
    }
  };

  return (
    <div className=" w-full flex gap-6 flex-col md:ml-[216px] items-center justify-center md:p-10 pt-10">
      <span
        className="absolute left-2 top-2 text-blue-700 underline flex items-center text-sm md:hidden hover:text-blue-500 transition duration-200"
        onClick={() => navigate("/finalise")}
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
        Select a template
      </h1>
      <div className="p-2 grid gap-4 grid-cols-2 max-md:grid-cols-1 w-full">
        <div className="grid gap-4 grid-cols-3">
          {templates.map((item) => {
            return (
              <Template
                onclick={() => handleSelect(item.id)}
                key={item.id}
                imageSrc={item.image}
              />
            );
          })}
        </div>
        <div className="flex flex-col gap-4 items-center">
          {resumeHtml && (
            <h1 className="text-2xl font-bold mb-4">Resume Preview</h1>
          )}
          <iframe src={resumeHtml} className="w-full h-96" />
        </div>
      </div>
      <button
        onClick={() => download()}
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2"
      >
        Download Resume
      </button>
      <ToastContainer />
    </div>
  );
};

export default Templates;
