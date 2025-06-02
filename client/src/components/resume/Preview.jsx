import React from "react";
import { useSelector } from "react-redux";
import P1 from "../templates/Portfolio-1";
import P2 from "../templates/Portfolio-2";
import P3 from "../templates/Portfolio-3";
import P4 from "../templates/Portfolio-4";
import P5 from "../templates/Portfolio-5";
import P6 from "../templates/Portfolio-6";

const PreviewPage = () => {
  const templates = {
    p1: P1,
    p2: P2,
    p3: P3,
    p4: P4,
    p5: P5,
    p6: P6,
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

  return <SelectedTemplate resume={resume} />;
};

export default PreviewPage;
