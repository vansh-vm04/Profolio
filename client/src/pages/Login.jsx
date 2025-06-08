import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const env = import.meta.env;
import { setUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import isLoggedIn from "../utils/authUtils";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const verifyLogin = async () => {
    const { loggedIn } = await isLoggedIn();
    if (loggedIn) {
      toast.success("Login Successful!")
      navigate("/");
    }
  };

  useEffect(() => {
    verifyLogin();
  }, []);

  const [showPassword, setShowPassword] = useState(false);

  const LoginWithGoogle = async (details) => {
    const data = jwtDecode(details.credential);
    const response = await fetch(`${env.VITE_SERVER_URL}/user/login/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
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
          loggedIn: true,
          resumes: userData.resumes,
        })
      );
      if (localStorage.getItem("token")) {
        const auth = await isLoggedIn();
        if (auth.loggedIn) {
          toast.success("Login Successful!")
          navigate("/");
        }
      }
    }
  };

  const onSubmit = async (data) => {
    const response = await fetch(`${env.VITE_SERVER_URL}/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (response.status == 404) toast.error(`Account not found, try sign up`);
    if (response.status == 401) toast.error(`Wrong password, try again or login with google`);
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
          loggedIn: true,
          resumes: userData.resumes,
        })
      );
      if (token) {
        const auth = await isLoggedIn();
        if (auth.loggedIn) {
          toast.success("Login Successful!")
          navigate("/");
        }
      }
    }
  };

  return (
    <div id="login" className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 flex-col flex items-center justify-center px-4">
      <div  className="w-full max-w-md flex-col flex items-center bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome back! Please sign in
        </h2>

        {isSubmitting && (
          <div className="text-sm text-gray-500 text-center">Signing you in...</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Email"
              {...register("email", {
                required: { value: true, message: "This field is required" },
                minLength: { value: 11, message: "Enter a valid email" },
              })}
              type="text"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">*{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:outline-none"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "This field is required" },
              })}
              type={showPassword ? "text" : "password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-2 text-sm text-gray-500 hover:text-black"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">*{errors.password.message}</p>
            )}
          </div>

          <input
            type="submit"
            value="Log In"
            disabled={isSubmitting}
            className="w-full bg-black cursor-pointer text-white py-2 rounded-md hover:bg-gray-900 transition-all"
          />
        </form>

        <div className="text-center text-gray-500 text-sm">or</div>

        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(credentialResponse) => LoginWithGoogle(credentialResponse)}
            onError={() => console.log("Login Failed")}
            useOneTap
            width="100%"
            theme="filled_black"
            size="large"
          />
        </div>

        <p className="text-center text-sm text-gray-600">
          Need an account?{" "}
          <a href="/signup" className="text-black font-medium underline">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
