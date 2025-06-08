import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div className="w-[216px] left-0 fixed h-full bg-[#111827] py-14 max-md:hidden shadow-lg">
      <ul className="flex flex-col gap-6 items-start px-6">
        <li
          onClick={() => navigate("/heading")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("heading")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Heading
        </li>

        <li
          onClick={() => navigate("/education")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("education")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Education
        </li>

        <li
          onClick={() => navigate("/experience")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("experience")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Experience
        </li>

        <li
          onClick={() => navigate("/projects")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("projects")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Projects
        </li>

        <li
          onClick={() => navigate("/skills")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("skills")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Skills
        </li>

        <li
          onClick={() => navigate("/templates")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("templates")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Template
        </li>

        <li
          onClick={() => navigate("/preview")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("preview")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Preview
        </li>

        <li
          onClick={() => navigate("/deploy")}
          className={`w-full px-3 py-2 rounded-lg text-lg hover:cursor-pointer transition ${
            pathname.endsWith("deploy")
              ? "bg-gray-800 text-white font-bold"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Deploy
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
