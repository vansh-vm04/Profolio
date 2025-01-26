// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
const env = import.meta.env;
import { setUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/authUtils";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    toast.info(`Please login`);
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    // console.log(data);
    const response = await fetch(`${env.VITE_SERVER_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status == 404) toast.error(`Account not found, try sign up`);
    if (response.status == 401) toast.error(`Wrong password, try again`);
    // console.log(response);
    const userData = await response.json();
    if (userData) {
      const token = userData.token;
      localStorage.setItem("token", token);
      dispatch(
        setUser({
          id: userData.id,
          username: userData.username,
          email: userData.email,
          token: userData.token,
          loggedIn: true, // Set the logged-in status to true
        })
      );
      // console.log(userData);
      
      if(token){
        const user = isLoggedIn();
        if((await user).loggedIn) navigate('/');
      }
    }
    
  };

  return (
    <div className=" h-screen flex flex-col top-0 gap-6 items-center w-full justify-center">
      <p className="text-2xl font-semibold">Welcome back! Please sign in.</p>
      <div className="flex gap-6 flex-col items-center justify-center">
        {isSubmitting && <div>Loading...</div>}
        <form
          className="flex gap-4 items-center flex-col justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "this value is required" },
              minLength: { value: 11, message: "enter valid email" },
            })}
            type="text"
          />
          {errors.email && (
            <span className="text-red-600">*{errors.email.message}</span>
          )}
          <div className="flex gap-1 max-w-fit">
            <input
              className="input"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "this field is required" },
              })}
              type={showPassword ? "text" : "password"}
            />
            {errors.password && (
              <span className="text-red-600">*{errors.password.message}</span>
            )}
            <button
              type="button"
              className="text-sm text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-1"
            disabled={isSubmitting}
            type="submit"
            value="Log In"
          />
          {errors.custom && (
            <span className="text-red-600">*{errors.custom.message}</span>
          )}
        </form>
        <p>
          Need an account?{" "}
          <a className="text-blue-500" href="/signup">
            Sign up for free
          </a>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
