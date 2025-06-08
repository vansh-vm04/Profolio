import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { months, years } from "../../constants/data";
import { useSelector, useDispatch } from "react-redux";
import {
  clearExperience,
  setExperience,
  removeExperience,
} from "../../features/resume/resumeSlice";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit } from "lucide-react";
import { ArrowLeft } from "lucide-react";

const Experience = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();
  const expList = useSelector((state) => state.resume.experience);
  const navigate = useNavigate();

  const [currentlyWorking, setCurrentlyWorking] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Auto-fill
  useEffect(() => {
    if (editIndex !== null) {
      const data = expList[editIndex];
      Object.keys(data).forEach((key) => {
        if (key !== "Working") setValue(key, data[key]);
      });
      setCurrentlyWorking(data.Working || false);
    }
  }, [editIndex]);

  const onSubmit = (data) => {
    const payload = { ...data, Working: currentlyWorking };
    dispatch(setExperience(payload));
    reset();
    setCurrentlyWorking(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    dispatch(removeExperience(index));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
  };

  const handleClear = () => {
    dispatch(clearExperience());
    reset();
    setEditIndex(null);
    setCurrentlyWorking(false);
  };

  return (
    <div className="resume-page">
      {/* Back button */}
      <div className="mb-4 fixed z-50">
        <button
          onClick={() => navigate("/education")}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>

      <div className="w-full h-full flex flex-col items-center justify-start px-4 py-6">
        <h1 className="form-heading px-4 max-md:text-xl mb-2">Add Your Work Experience</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Job Title</label>
              <input
                className="input2"
                placeholder="e.g. Senior Software Developer"
                {...register("jobTitle", { required: true })}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm">Required</p>
              )}
            </div>

            <div>
              <label>Company Name</label>
              <input
                className="input2"
                placeholder="e.g. Microsoft"
                {...register("cname", { required: true })}
              />
              {errors.cname && <p className="text-red-500 text-sm">Required</p>}
            </div>

            <div>
              <label>Work Link (optional)</label>
              <input
                className="input2"
                placeholder="e.g. https://..."
                {...register("worklink")}
              />
            </div>

            <div>
              <label>Company Location</label>
              <input
                className="input2"
                placeholder="e.g. New Delhi, India"
                {...register("clocation")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Start Date</label>
              <div className="flex gap-2">
                <select className="input2 w-1/2" {...register("smonth",{required:true})}>
                <option value="">Select Month</option>
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select className="input2 w-1/2" {...register("syear",{required:true})}>
                <option value="">Select Year</option>
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={currentlyWorking}
                  onChange={(e) => setCurrentlyWorking(e.target.checked)}
                />
                <label className="text-sm">I currently work here</label>
              </div>
            </div>

            <div>
              <label>End Date</label>
              <div className="flex gap-2">
                <select
                  className="input2 w-1/2"
                  {...register("emonth")}
                  disabled={currentlyWorking}
                >
                  {months.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
                <select
                  className="input2 w-1/2"
                  {...register("eyear")}
                  disabled={currentlyWorking}
                >
                  {years.map((y) => (
                    <option key={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3 pt-2 flex-wrap">
            <button type="submit" className="btn-primary">
              {editIndex !== null ? "Update Experience" : "Add Experience"}
            </button>
            <button type="button" onClick={handleClear} className="btn-danger">
              Clear All
            </button>
            <button onClick={() => navigate("/projects")} className="btn-save">
              Save & Continue
            </button>
          </div>
        </form>

        <div className="mt-6 w-full max-w-4xl">
          {expList.length > 0 ? (
            expList.map((exp, index) => (
              <div
                key={index}
                className="flex justify-between items-start border p-4 rounded-lg shadow mb-4"
              >
                <div className="space-y-1">
                  <a
                    href={exp.worklink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-blue-600"
                  >
                    {exp.jobTitle}, {exp.cname}
                  </a>
                  <p className="text-sm text-gray-600">{exp.clocation}</p>
                  <p className="text-sm">
                    {exp.smonth} {exp.syear} –{" "}
                    {exp.Working ? "Present" : `${exp.emonth} ${exp.eyear}`}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(index)}
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
            <p className="text-gray-500 text-center mt-4">
              No work experience added yet. Use the form above to add.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experience;
