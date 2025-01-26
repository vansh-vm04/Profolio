import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className=" w-[216px] left-0 fixed h-full primaryBg py-14 max-md:hidden">
      <ul className="flex flex-col gap-4 items-center">
        <li
          onClick={() => navigate("/heading")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("heading")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Heading
        </li>

        <li
          onClick={() => navigate("/education")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("education")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Education
        </li>

        <li
          onClick={() => navigate("/experience")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("experience")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Experience
        </li>

        <li
          onClick={() => navigate("/projects")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("projects")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Projects
        </li>

        <li
          onClick={() => navigate("/skills")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("skills")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Skills
        </li>

        <li
          onClick={() => navigate("/finalise")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("finalise")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Finalise
        </li>

        <li
          onClick={() => navigate("/templates")}
          className={`text-wrap text-xl  hover:cursor-pointer ${
            pathname.endsWith("templates")
              ? "text-white font-bold underline"
              : "text-zinc-300 font-semibold"
          }`}
        >
          Template
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
