import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setHeading, setImageUrl } from "../../features/resume/resumeSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "lucide-react";
import Loader from "../ui/Loader";
import { confirmAlert } from "react-confirm-alert";
const env = import.meta.env;

const Heading = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.resume.heading);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setloading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setHeading(data));
    navigate("/education");
  };

  const backToHome = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="p-10 m-1 max-w-[444px] bg-slate-200 text-black shadow-md rounded-md">
            <h1 className="m-2 text-xl max-md:text-lg font-semibold">
              Details will be lost if you leave. Invest 5 minutes to deploy your
              portfolio.
            </h1>
            <button
              className="bg-gray-700 hover:bg-gray-400 text-white px-3 py-1 m-2 rounded-md"
              onClick={() => onClose()}
            >
              Stay
            </button>
            <button
              className="bg-red-600 hover:bg-red-400 m-2 rounded-md text-white py-1 px-3"
              onClick={() => {
                navigate("/");
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

  const deleteImage = async (e) => {
    e.preventDefault();
    dispatch(setImageUrl(""));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      setloading(true)
      const response = await fetch(
        `${env.VITE_SERVER_URL}/api/cloudinary/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!response.ok) throw new Error("Upload failed, choose another image");
      const { url } = await response.json();
      dispatch(setImageUrl(url));
      toast.success("Uploaded Successfully!");
      setloading(false)
    } catch (error) {
      toast.error("Upload failed, choose another image");
      setloading(false)
      console.log(error);
    }
  };

  useEffect(() => {
    if (location.state?.toastMessage) {
      toast.info(location.state.toastMessage);
      location.state.toastMessage = null;
    }
    if (details) {
      Object.keys(details).forEach((item) => {
        setValue(item, details[item]);
      });
    }
  }, [details, setValue, location]);

  return (
    <div className="min-h-screen w-full flex flex-col md:ml-[216px] px-4 py-6 sm:px-6 lg:px-8 ">
      {/* Back button */}
      <div className="mb-4 fixed z-50">
        <button
          onClick={() => backToHome()}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-full"
      >
        <h1 className="text-3xl mb-2 max-md:text-xl font-semibold text-gray-800">
          Add Your Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-5xl bg-white p-6 sm:p-8 rounded-lg shadow-md">
          {[
            {
              label: "First Name",
              name: "firstname",
              placeholder: "John",
              required: true,
            },
            {
              label: "Surname",
              name: "surname",
              placeholder: "Cena",
              required: true,
            },
            {
              label: "Phone",
              name: "phone",
              placeholder: "1234567890",
              required: false,
            },
            {
              label: "Email",
              name: "email",
              placeholder: "you@example.com",
              required: true,
            },
            {
              label: "Location",
              name: "location",
              placeholder: "City, State, Country",
              required: false,
            },
            {
              label: "LinkedIn",
              name: "linkedin",
              placeholder: "linkedin.com/in/yourname",
              required: false,
            },
            {
              label: "GitHub",
              name: "github",
              placeholder: "github.com/yourname",
              required: false,
            },
            {
              label: "Twitter",
              name: "twitter",
              placeholder: "twitter.com/yourname",
              required: false,
            },
          ].map((field) => (
            <div key={field.name} className="w-full">
              <label className="block mb-1 font-medium text-sm text-gray-700">
                {field.label}
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder={field.placeholder}
                {...register(field.name, {
                  required: field.required && "This field is required",
                  validate: field.validate,
                })}
              />
              {errors[field.name] && (
                <p className="text-xs text-red-500 mt-1">
                  {errors[field.name].message}
                </p>
              )}
            </div>
          ))}
          {/*Image Upload*/}
          <label
            htmlFor="image"
            className="flex justify-between items-center cursor-pointer max-md:flex-col gap-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <label
              htmlFor="image"
              className="cursor-pointer block mb-1 font-medium text-sm text-gray-700"
            >
              {details.image ? "Image uploaded" : "Upload your picture"}
            </label>
            {details.image && (
              <button
                onClick={(e) =>deleteImage(e)}
                className="text-sm px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Remove
              </button>
            )}

            <input
              id="image"
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              type="file"
            />
          </label>

          {/* About Section */}
          <div className="sm:col-span-2">
            <label className="block mb-1 font-medium text-sm text-gray-700">
              About Section
            </label>
            <textarea
              className="w-full px-4 py-2 min-h-28 border border-gray-300 rounded-md resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              placeholder="Write a short bio about yourself..."
              {...register("about", { required: "This field is required" })}
            />
            {errors.about && (
              <p className="text-xs text-red-500 mt-1">
                {errors.about.message}
              </p>
            )}
          </div>
        </div>

        {isSubmitting && (
          <div className="mt-4 text-blue-500 font-semibold">Saving...</div>
        )}

        <button type="submit" className="btn-save mt-4">
          Save and Continue
        </button>
      </form>
      {loading && <Loader/>}
    </div>
  );
};

export default Heading;
