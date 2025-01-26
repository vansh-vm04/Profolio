import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isLoggedIn from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { addResume } from "../features/resume/resumeSlice";
const env = import.meta.env;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyLogin = async () => {
      const { loggedIn } = await isLoggedIn();
      if (!loggedIn) {
        navigate("/");
      }
    };
    verifyLogin();
  },);

  const logout = () => {
    const isConfirmed = window.confirm("Are you sure you want to logout?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  const openResume = async (hash) => {
    // console.log(hash)
    var response = await fetch(`${env.VITE_SERVER_URL}/resume/open`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash: hash }),
    });
    if (response.ok) {
      const resume = await response.json();
      const updatedResume = {
        heading: resume.heading,
        education: resume.education,
        experience: resume.experience,
        projects: resume.projects,
        skills: resume.skills,
        additionalSections:{
          Website:resume.additionalSections.Website,
          Languages:resume.additionalSections.Languages,
          Certifications:resume.additionalSections.Certifications,
          Accomplishments:resume.additionalSections.Accomplishments
        },
        template: resume.template,
      };
      console.log(updatedResume)
      dispatch(addResume(updatedResume));
      navigate("/heading");
    } else {
      toast.error("Some error occured, Try Again");
    }
  };

  const user = useSelector((state) => state.user);
  return (
    <div className="w-full h-screen min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-4xl font-semibold">
            {user.username[0]} {/* First letter of the user's name */}
          </div>
          {/* User Info */}
          <h1 className="mt-4 text-xl font-bold text-gray-800">
            {user.username}
          </h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      {/* My Resumes Section */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md mt-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">My Resumes</h2>
        <ul className="space-y-2">
          {user.resumes.length > 0 ? (
            user.resumes.map((hash, index) => (
              <li
                key={index}
                onClick={() => openResume(hash)}
                className="p-3 bg-blue-100 rounded-md text-blue-700 font-medium hover:bg-blue-200 transition"
              >
                Resume-{index + 1}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No resumes found.</p>
          )}
        </ul>
      </div>
      <span
        className=" text-blue-700 p-5 underline flex items-center text-md hover:text-blue-500 hover:cursor-pointer transition duration-100"
        onClick={() => logout()}
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
        Logout
      </span>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
