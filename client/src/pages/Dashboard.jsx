import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isLoggedIn from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addResume, resetResume } from "../features/resume/resumeSlice";
import { setUser } from "../features/user/userSlice";
import { googleLogout } from "@react-oauth/google";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ArrowLeft } from "lucide-react";

const env = import.meta.env;

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyLogin = async () => {
      const { loggedIn, data } = await isLoggedIn();
      if (loggedIn) {
        const userData = {
          id: data._id,
          username: data.username,
          email: data.email,
          token: data.token,
          loggedIn: true,
          resumes: data.resumes,
        };
        dispatch(setUser(userData));
      } else {
        navigate("/");
      }
    };
    verifyLogin();
  }, []);

  const logoutConfirm = () => {
    localStorage.removeItem("token");
    setUser(null);
    resetResume();
    localStorage.removeItem("persist:user");
    localStorage.removeItem("persist:resume");
    googleLogout();
    navigate("/");
  };

  const logout = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="p-10 bg-slate-200 text-black shadow-md rounded-md">
            <h1 className="m-2 text-xl font-semibold">Sad to see you go 🥲</h1>
            <button
              className="bg-gray-700 hover:bg-gray-400 text-white px-3 py-1 m-2 rounded-md"
              onClick={() => onClose()}
            >
              Stay
            </button>
            <button
              className="bg-red-600 hover:bg-red-400 m-2 rounded-md text-white py-1 px-3"
              onClick={() => {
                logoutConfirm();
                onClose();
              }}
            >
              Leave
            </button>
          </div>
        );
      },
    });
  };

  const deleteConfirm = async (hash) => {
    try {
      const res = await fetch(
        `${env.VITE_SERVER_URL}/api/portfolio/delete/${user.username}/${hash}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        toast.success("Portfolio deleted successfully.");
        const updatedResumes = user.resumes.filter((item) => item !== hash);
        dispatch(setUser({ ...user, resumes: updatedResumes }));
      } else {
        toast.error("Failed to delete portfolio.");
      }
    } catch (err) {
      toast.error("Something went wrong.");
      console.log(err);
    }
  };

  const handleDeletePortfolio = async (hash) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="p-10 bg-slate-200 text-black shadow-md rounded-md">
            <h1 className="m-2 text-xl font-semibold">Arey you sure? 🤔</h1>
            <button
              className="bg-gray-700 hover:bg-gray-400 text-white px-3 py-1 m-2 rounded-md"
              onClick={() => onClose()}
            >
              Cancel
            </button>
            <button
              className="bg-red-600 hover:bg-red-400 m-2 rounded-md text-white py-1 px-3"
              onClick={() => {
                deleteConfirm(hash);
                onClose();
              }}
            >
              Delete
            </button>
          </div>
        );
      },
    });
  };

  const openResume = async (hash) => {
    const response = await fetch(
      `${env.VITE_SERVER_URL}/api/portfolio/open/${hash}`
    );
    if (response.ok) {
      const resume = await response.json();
      const updatedResume = {
        heading: resume.heading,
        education: resume.education,
        experience: resume.experience,
        projects: resume.projects,
        skills: resume.skills,
        template: resume.template,
      };
      dispatch(addResume(updatedResume));
      navigate("/heading");
    } else {
      toast.error("Some error occurred, Try Again");
    }
  };

  const copyLink = (username) => {
    const url = `${env.VITE_BASE_URL}/${username}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  };

  const user = useSelector((state) => state.user);

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="mb-4 pt-20 w-full fixed z-50 left-4">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md mt-20 p-6 w-full max-w-md text-center">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-4xl font-semibold shadow-md">
            {user.username[0]?.toUpperCase()}
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-800 capitalize">
            {user.username}
          </h1>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* My Portfolio Section */}
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-[644px] mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Portfolios ({user.resumes.length})</h2>
        <div className="space-y-4">
          {user.resumes.length > 0 ? (
            user.resumes.map((hash, index) => {
              const publicUrl = `${env.VITE_BASE_URL}/${hash}`;
              return (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <div
                    onClick={() => openResume(hash)}
                    className="cursor-pointer font-semibold text-blue-700 hover:underline"
                  >
                    Portfolio-{index + 1}
                  </div>
                  <div className="text-xs text-gray-700 mt-1 break-all">
                    {publicUrl}
                  </div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <button
                      onClick={() => window.open(publicUrl, "_blank")}
                      className="text-sm px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                    >
                      Visit Live
                    </button>
                    <button
                      onClick={() => copyLink(hash)}
                      className="text-sm px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => handleDeletePortfolio(hash)}
                      className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 text-sm">No portfolios found.</p>
          )}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        className="mt-8 px-5 py-2 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg shadow-md transition duration-150"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
