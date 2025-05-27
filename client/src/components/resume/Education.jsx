import React from "react";
import { useForm } from "react-hook-form";
import { degrees, months, years } from "../../constants/data";
import { useSelector, useDispatch } from 'react-redux'
import {setEducation, clearEducation} from '../../features/resume/resumeSlice'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Education = () => {

  const dispatch = useDispatch();
  const details = useSelector((state)=>state.resume.education);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm();
  
  const onSubmit = (data) => {
      dispatch(setEducation({...data}))
    };

    const handleClear = ()=>{
      dispatch(clearEducation());
    }
  
    useEffect(() => {
      // console.log("Education:", details);
      if(details.length>0){
        const latestEducation = details[details.length - 1];
        Object.keys(latestEducation).map((item)=>{
          setValue(item,latestEducation[item])
        })
      }
    }, [details,setValue]);

  return (
    <div className=" h-full w-full flex md:ml-[216px] items-center justify-center">
      <span
        className="absolute left-2 top-2 text-blue-700 underline flex items-center text-sm md:hidden hover:text-blue-500 transition duration-200"
        onClick={() => navigate("/heading")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col h-3/4 gap-2 md:p-10 pt-10 items-center w-full justify-center"
      >
        <h1 className="text-3xl max-md:text-2xl font-bold">
          Tell us about your education
        </h1>

        <div className="grid grid-cols-2 max-sm:grid-cols-1 max-md:p-10 gap-6 p-20 items-center h-1/2 justify-center w-full">
          <div className="w-full h-full">
            <label>College Name</label>
            <input
              className="input2"
              placeholder="e.g. Havard"
              {...register("cname", { required: true })}
            />
            {errors.cname && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>
          <div className="w-full h-full">
            <label>College Location</label>
            <input
              className="input2"
              placeholder="e.g. New Delhi,India"
              {...register("clocation", { required: false })}
            />
            {errors.clocation && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Degree</label>
            <select
              className="input2"
              {...register("degree", { required: true })}
            >
              {degrees.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full h-full">
            <label>Branch</label>
            <input
              className="input2"
              placeholder="e.g. Financial Accounting"
              {...register("branch", { required: true })}
            />
            {errors.branch && (
              <span className="text-red-500 text-xs">
                This field is required
              </span>
            )}
          </div>

          <div className="w-full h-full">
            <label>Start Year</label>
            <select className="input2" {...register("startyear")}>
              {years.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full h-full">
            <label>End Year</label>
            <select className="input2" {...register("endyear")}>
              {years.map((item) => {
                return (
                  <option key={item} value={`${item}`}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {isSubmitting && <div>Loading...</div>}
        <div className="items-center justify-center flex gap-2 flex-wrap">
        <button
              type="button"
              onClick={() => handleClear()}
              className="text-white bg-red-600 hover:bg-red-500  focus:ring-4 focus:outline-none focus:ring-red-500 dark:focus:ring-red-500 font-medium rounded-lg px-4 py-2 max-w-32"
            >
              Clear All
            </button>
        <button className="text-white bg-gradient-to-br from-blue-500 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-blue-800 rounded-lg px-8 py-2" 
        onClick={handleSubmit(onSubmit)}>
          Add Education
        </button>
        <button
        onClick={() => navigate("/experience")}
          className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none hover:cursor-pointer focus:ring-pink-200 dark:focus:ring-pink-800 rounded-lg px-8 py-2"
        >Save and Continue</button>
        </div>

        <div className="flex flex-col gap-2 py-2 md:px-20 max-md:p-2 w-full items-center justify-center">
          {details.length > 0 ? (
            details.map((edu, index) => (
              <div
                key={index}
                className="p-5 border rounded-md shadow-md w-full"
              >
                <div className="justify-between flex">
                  <h1 className="text-xl font-bold">{edu.cname}</h1>
                  <span>{edu.startyear+"-"+edu.endyear}</span>
                </div>
                <p className="text-gray-600">{edu.degree+' '+edu.branch}</p>
              </div>
            ))
          ):(
            <span>No education details added yet.. Click add education button</span>
          )}
        </div>

      </form>

      

    </div>
  );
};

export default Education;
