import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { setHeading } from "../../features/resume/resumeSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Heading = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.resume.heading);
  const navigate = useNavigate();

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
    if (details) {
      Object.keys(details).map((item) => {
        setValue(item, details[item]);
      });
    }
  }, [details, setValue]);

  return (
    <div className=" h-full w-full flex md:ml-[216px] items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-3/4 gap-2 md:p-10 pt-10 items-center w-full justify-center"
      >
        <h1 className="text-3xl max-md:text-2xl font-bold">
          Add your contact details
        </h1>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:p-10 gap-6 p-20 items-center h-1/2 justify-center w-full">
          <div className="w-full h-full">
            <label>First Name</label>
            <input
              className="input2"
              placeholder="Example-John"
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
              placeholder="Example-Cena"
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
              placeholder="Example-1234567890"
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
              placeholder="Example-xyz@gmail.com"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>LinkedIn</label>
            <input
              className="input2"
              placeholder="Example-linkedin.com/johncena"
              {...register("linkedin", { required: true })}
            />
            {errors.linkedin && (
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
          Next: Education
        </button>
      </form>
    </div>
  );
};

export default Heading;
