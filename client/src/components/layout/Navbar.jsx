import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetResume } from "../../features/resume/resumeSlice";
import isLoggedIn from "../../utils/authUtils";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const location = useLocation();
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    const verifyLogin = async () => {
      const { loggedIn } = await isLoggedIn();
      setloggedIn(loggedIn);
    };
    verifyLogin();
  }, [location.pathname]);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buildResume = () => {
    if(loggedIn){
      dispatch(resetResume());
      navigate("/heading");
    }else{
      toast.info("Please Login First");
      navigate('/login')
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-[8px] bg-white/20 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-4 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/icons/icon.png"
            alt="logo"
            className="w-12 h-12 rounded-lg shadow object-contain"
          />
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 font-[Inter]">
            Profolio
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {loggedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="nav-btn"
            >
              Dashboard
            </button>
          ) : (
            !pathname.endsWith("login") && (
              <button
                onClick={() => navigate("/login")}
                className="nav-btn"
              >
                Log In
              </button>
            )
          )}

          <button
            onClick={buildResume}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2 text-base font-semibold bg-gray-900  text-white rounded-lg  hover:bg-gray-800 transition-all shadow-sm"
          >
            Build Your Portfolio <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
