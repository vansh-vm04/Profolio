import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetResume } from "../../features/resume/resumeSlice";
import isLoggedIn from "../../utils/authUtils";

const Navbar = () => {
  const location = useLocation();
  const [loggedIn, setloggedIn] = useState(false);
  useEffect(() => {
    const verifyLogin = async () => {
      const { loggedIn } = await isLoggedIn();
      console.log(loggedIn);
      setloggedIn(loggedIn);
    };
    verifyLogin();
  }, [location]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buildResume = () => {
    dispatch(resetResume());
    navigate("/heading");
  };
  return (
    <nav className="border-b-2 shadow-sm flex justify-between bg-white items-center w-full px-6 md:py-4 z-10 top-0 sticky">
      <div onClick={() => navigate("/")}>
        <h1 className="text-3xl hover:cursor-pointer font-bold text-orange-1">
          ResumeDesk
        </h1>
      </div>
      <div className="flex gap-8 items-center">
        <div className="flex max-md:flex-wrap gap-2 items-center">
          {loggedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              type="button"
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg max-md:px-1 px-4 py-1"
            >
              My Dashboard
            </button>
          ) : (
            !pathname.endsWith("signup") && (
              <button
                onClick={() => navigate("/signup")}
                type="button"
                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-1"
              >
                Sign Up
              </button>
            )
          )}

          <button
            onClick={() => buildResume()}
            type="button"
            className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-4 max-md:hidden py-1"
          >
            Build My Resume
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
