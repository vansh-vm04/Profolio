import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetResume } from "../features/resume/resumeSlice";
import { useEffect } from "react";
import isLoggedIn from "../utils/authUtils";
import { setUser } from "../features/user/userSlice";

const Home = () => {

const dispatch = useDispatch();
useEffect(() => {
  const user = isLoggedIn();
  if(user.loggedIn){
    dispatch(setUser(user.data));
  }
},);


const navigate = useNavigate();
const buildResume = () =>{
  dispatch(resetResume());
  navigate('/heading');
}

  return (
    <div className="w-full flex h-screen gap-6 justify-center px-9 pt-12 max-md:flex-col max-md:items-center ">
      <div className="w-1/3">
        <img className="w-full" src="/images/resumefront.png" alt="resume" />
      </div>
      <section className="flex gap-6 flex-col pt-24 max-md:items-center">
        <h1 className="text-5xl font-bold">The Best Online Resume Builder</h1>
        <p className="text-2xl">
          Easily create the perfect resume for any job using our best-in-class
          resume builder platform.
        </p>
        <button
        onClick={()=>buildResume()}
          type="button"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-semibold rounded-lg text-2xl px-5 py-2.5 max-w-md h-16 text-center me-2 mb-2 text-nowrap"
        >
          Create My Resume Now
        </button>
      </section>
    </div>
  );
};

export default Home;
