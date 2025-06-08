import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
const env = import.meta.env;
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";
import isLoggedIn from "../utils/authUtils";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [Info, setInfo] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const verifyLogin = async () => {
    const { loggedIn } = await isLoggedIn();
    if (loggedIn) navigate("/"), toast.success("SignUp Successful!");
  };

  useEffect(() => {
    verifyLogin();
  }, []);

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
      const auth = await isLoggedIn();
      if (auth.loggedIn) navigate("/"), toast.success("Login Successful!");
    }
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${env.VITE_SERVER_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 409) {
        setInfo("An account already exists with this email or username. Try login.");
      } else if (response.ok) {
        const userData = await response.json();
        const token = userData.token;
        dispatch(
          setUser({
            id: userData.id,
            username: userData.username,
            email: userData.email,
            token: userData.token,
            loggedIn: true,
          })
        );
        localStorage.setItem("token", token);
        toast.success("Login Successful!")
        navigate("/");
      } else {
        toast.error(`Some error occurred, try again`);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Some error occurred, try a different username`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-200 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create your account</h2>
        {isSubmitting && <div className="text-center text-gray-500">Loading...</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              type="text"
              {...register("username", {
                required: { value: true, message: "Username is required" },
                minLength: { value: 3, message: "Minimum 3 characters" },
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">*{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              type="text"
              {...register("email", {
                required: { value: true, message: "Email is required" },
                minLength: { value: 11, message: "Enter a valid email" },
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">*{errors.email.message}</p>
            )}
          </div>

          <div className="relative">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1">*{errors.password.message}</p>
            )}
          </div>

          {Info && <p className="text-sm text-red-600 text-center">{Info}</p>}

          <input
            type="submit"
            disabled={isSubmitting}
            value="Sign Up"
            className="w-full bg-black cursor-pointer text-white py-2 rounded-md hover:bg-gray-900 transition-all"
          />
        </form>

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

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-black cursor-pointer underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
