import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setHeading } from "../../features/resume/resumeSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Heading = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.resume.heading);
  const navigate = useNavigate();
  const location = useLocation();

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

  useEffect(() => {
    // console.log("Updated Details:", details);
    if(location.state?.toastMessage){
      toast.info(location.state.toastMessage);
      //clear toast message
      location.state.toastMessage = null;
    }
    if (details) {
      Object.keys(details).map((item) => {
        setValue(item, details[item]);
      });
    }
  }, [details,setValue,location]);

  return (
    <div className=" h-full w-full flex md:ml-[216px] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-3/4 gap-2 md:p-10 pt-10 items-center w-full justify-center"
      >
        <h1 className="text-3xl max-md:text-2xl font-bold">
          Add your contact details
        </h1>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:p-10 gap-4 p-10 items-center h-1/2 justify-center w-full">
          <div className="w-full h-full">
            <label>First Name</label>
            <input
              className="input2"
              placeholder="Example-John (required)"
              {...register("firstname", { required: true })}
            />
            {errors.firstname && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Surname</label>
            <input
              className="input2"
              placeholder="Example-Cena (required)"
              {...register("surname", { required: true })}
            />
            {errors.surname && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>


          <div className="w-full h-full">
            <label>Phone</label>
            <input
              className="input2"
              placeholder="Example-1234567890 (required)"
              {...register("phone", {
                required: "This field is required",
                validate: {
                  isNumber: (value) =>
                    /^[0-9]+$/.test(value) ||
                    "Phone number must be a numeric value",
                },
              })}
            />
            {errors.phone && (
              <span className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Email</label>
            <input
              className="input2"
              placeholder="Example-xyz@gmail.com (required)"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Location</label>
            <input
              className="input2"
              placeholder="Your location (city, state, country)"
              {...register("location", { required: true })}
            />
            {errors.location && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

         

          <div className="w-full h-full">
            <label>LinkedIn</label>
            <input
              className="input2"
              placeholder="Example-linkedin.com/johncena (optional)"
              {...register("linkedin", { required: false })}
            />
            {errors.linkedin && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Github</label>
            <input
              className="input2"
              placeholder="Your github link (optional)"
              {...register("github", { required: false })}
            />
            {errors.github && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Twitter</label>
            <input
              className="input2"
              placeholder="Your twitter link (optional)"
              {...register("twitter", { required: false })}
            />
            {errors.twitter && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

           <div className="w-full h-full">
            <label>About Section</label>
            <textarea
              className="input2 min-h-36 max-h-64"
              placeholder="Write something about yourself. This will appear in about section."
              {...register("about", { required: true })}
            />
            {errors.about && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          
        </div>
        {isSubmitting && <div>Loading...</div>}
        <button
          type="submit"
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2"
        >
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default Heading;
