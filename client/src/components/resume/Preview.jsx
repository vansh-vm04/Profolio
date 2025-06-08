import React from "react";
import { useSelector } from "react-redux";
import P1 from "../templates/Portfolio-1";
import P2 from "../templates/Portfolio-2";
import P3 from "../templates/Portfolio-3";
import P4 from "../templates/Portfolio-4";
import P5 from "../templates/Portfolio-5";
import P6 from "../templates/Portfolio-6";
import P7 from "../templates/Portfolio-7";
import P8 from "../templates/Portfolio-8";
import P9 from "../templates/Portfolio-9";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PreviewPage = () => {
  const navigate = useNavigate();
  const templates = {
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
    p7: P7,
    p8: P8,
    p9: P9,
  };
  const resume = useSelector((state) => state.resume);

  if (!resume || !resume.template) {
    return (
      <div className="text-center mt-20 text-red-600">
        No template selected or resume data missing.
      </div>
    );
  }

  // Select the template component dynamically
  const SelectedTemplate = templates[resume.template];

  if (!SelectedTemplate) {
    return (
      <div className="text-center mt-20 text-red-600">
        Invalid template selected: {resume.template}
      </div>
    );
  }

  return (
    <div className="w-full md:ml-[216px] bg-gray-50">
    <div className="m-4 gap-1 flex justify-between items-center">
        <button
          onClick={() => navigate('/templates')}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
        <span className="text-black text-xl max-md:text-sm font-semibold">Make sure to fill out all details to get full preview.</span>
        <button
          onClick={()=>navigate('/deploy')}
          className="btn-save max-md:text-sm max-md:font-medium"
        >
          Save & Continue
        </button>
      </div>
    <SelectedTemplate resume={resume} />
    </div>
  )
  ;
};

export default PreviewPage;
