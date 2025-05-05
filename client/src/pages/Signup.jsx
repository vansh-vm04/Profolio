import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { toast } from "react-toastify";
const env = import.meta.env;
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/user/userSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [Info, setInfo] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${env.VITE_SERVER_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status == 409) {
        setInfo("An account already exist with this email or username, try login");
      }
      if (response.ok) {
        const userData = await response.json();
        const token = userData.token;
        dispatch(
                setUser({
                  id: userData.id,
                  username: userData.username,
                  email: userData.email,
                  token: userData.token,
                  loggedIn: true, // Set the logged-in status to true
                })
              );
        // console.log(token)
        localStorage.setItem("token",token);
        navigate('/')
      } else {
        toast.error(`Some error occured, try again`);
      }
    }catch (error) {
      console.log(error);
      toast.error(`Some error occured, try diffrent username`);
    };
  };

  return (
    <div className="h-screen flex flex-col top-0 gap-6 items-center w-full justify-center">
      <p className="text-2xl font-semibold">Sign up to continue!</p>
      <div className="flex gap-6 flex-col items-center justify-center">
        {isSubmitting && <div>Loading...</div>}
        <form
          className="flex gap-4 items-center flex-col justify-center"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="input"
            placeholder="Username"
            {...register("username", {
              required: { value: true, message: "this value is required" },
              minLength: { value: 3, message: "min length is 3" },
            })}
            type="text"
          />
          {errors.username && (
            <span className="text-red-600">*{errors.username.message}</span>
          )}

          <input
            className="input"
            placeholder="Email"
            {...register("email", {
              required: { value: true, message: "this value is required" },
              minLength: { value: 11, message: "enter a valid email id" },
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

          {Info && <span className="text-red-600">{Info}</span>}

          <input
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg px-4 py-1"
            disabled={isSubmitting}
            type="submit"
            value="Sign Up"
          />
          {errors.custom && (
            <span className="text-red-600">*{errors.custom.message}</span>
          )}
        </form>
        <p>
          Have an account?{" "}
          <a className="text-blue-500" href="/login">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};
export default Signup;
