import React from "react";
import { useForm } from "react-hook-form";
import { degrees, years } from "../../constants/data";
import { useSelector, useDispatch } from "react-redux";
import { ArrowLeft } from "lucide-react";
import {
  setEducation,
  clearEducation,
  removeEducation,
} from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Plus } from "lucide-react";

const Education = () => {
  const dispatch = useDispatch();
  const details = useSelector((state) => state.resume.education);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setEducation(data));
    reset();
  };

  const handleClear = () => {
    dispatch(clearEducation());
  };

  const handleDelete = (index) => {
    dispatch(removeEducation(index));
  };

  const handleEdit = (edu) => {
    Object.keys(edu).forEach((key) => {
      setValue(key, edu[key]);
    });
  };

  return (
    <div className="min-h-screen w-full md:ml-[216px] p-6 md:p-10">
      {/* Back button */}
      <div className="mb-4 fixed z-50">
        <button
          onClick={() => navigate("/heading")}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex justify-center items-center">
          <h1 className="form-heading px-4 max-md:text-xl">Education Details</h1>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-6 rounded-2xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label className="block mb-1 font-medium">College Name *</label>
            <input
              className="input2"
              placeholder="e.g. Harvard"
              {...register("cname", { required: true })}
            />
            {errors.cname && (
              <p className="text-xs text-red-500 mt-1">
                This field is required
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">College Location</label>
            <input
              className="input2"
              placeholder="e.g. New Delhi"
              {...register("clocation")}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Degree *</label>
            <select
              className="input2"
              {...register("degree", { required: true })}
            >
              <option value="">Select degree</option>
              {degrees.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Branch *</label>
            <input
              className="input2"
              placeholder="e.g. Computer Science"
              {...register("branch", { required: true })}
            />
            {errors.branch && (
              <p className="text-xs text-red-500 mt-1">
                This field is required
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Start Year</label>
            <select className="input2" {...register("startyear")}>
              <option value="">Select year</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">End Year</label>
            <select className="input2" {...register("endyear")}>
              <option value="">Select year</option>
              {years.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-full flex flex-wrap gap-4 justify-end mt-2">
            <button
              type="button"
              onClick={handleClear}
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl"
            >
              Clear All
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add Education
            </button>
            {/* Navigation Button */}

            <button
              onClick={() => navigate("/experience")}
              className="btn-save"
            >
              Save and Continue
            </button>
          </div>
        </form>

        {/* Education List */}
        <div className="flex flex-col gap-4">
          {details.length > 0 ? (
            details.map((edu, index) => (
              <div
                key={index}
                className="p-5 bg-white border rounded-2xl shadow-md flex justify-between items-start"
              >
                <div>
                  <h2 className="text-xl font-semibold">{edu.cname}</h2>
                  <p className="text-sm text-gray-600">{edu.clocation}</p>
                  <p className="text-sm">
                    {edu.degree} in {edu.branch}
                  </p>
                  <p className="text-xs text-gray-500">
                    {edu.startyear} - {edu.endyear}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              No education entries yet. Fill the form above to add one.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Education;
