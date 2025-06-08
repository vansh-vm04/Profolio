import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTemplate } from "../../features/resume/resumeSlice";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const templates = [
  { id: "p1", name: "Lavender Rise", img: "/images/lavenderrise.png" },
  { id: "p3", name: "Aqua Resume", img: "/images/aquaresume.png" },
  { id: "p8", name: "Blush Tone", img: "/images/blushtone.png" },
  { id: "p2", name: "Night Profile", img: "/images/nightprofile.png" },
  { id: "p5", name: "Classic Resume", img: "/images/classic.png" },
  { id: "p6", name: "Neon Matrix", img: "/images/neonmatrix.png" },
  { id: "p7", name: "Cyan Glow", img: "/images/cyanglow.png" },
  { id: "p4", name: "Cyber Glow", img: "/images/cyberglow.png" },
  { id: "p9", name: "Glass Glow", img: "/images/glassglow.png" },
];

export default function SelectTemplate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state) => state.resume.template);

  const handleSelect = (id) => {
    dispatch(setTemplate(id));
  };

  const handleSave = () => {
    if (selectedTemplate) {
      navigate("/preview");
    }
  };

  return (
    <div className="md:ml-[216px] flex flex-col md:px-2 md:pt-10 w-full bg-gray-50">
      <div className="mt-4 ml-4 fixed z-50">
        <button
          onClick={() => navigate("/skills")}
          className="p-2 rounded-full bg-white shadow hover:bg-blue-100 transition-colors"
          aria-label="Go Back"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 hover:text-blue-600" />
        </button>
      </div>

      <div className=" flex flex-col p-6 items-center md:p-8 w-full bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h1 className="form-heading max-md:text-xl">Choose a Template</h1>
        </div>

        <div className="grid max-md:max-h-[80vh] scrollbar-hide grid-cols-1 p-2 rounded-lg scroll-smooth max-h-[70vh] overflow-y-scroll sm:grid-cols-2 w-full lg:grid-cols-3 gap-6">
          {templates.map((tpl) => {
            const isSelected = tpl.id === selectedTemplate;

            return (
              <div
                key={tpl.id}
                className={`relative border-2 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white ${
                  isSelected
                    ? "ring-2 ring-blue-500 border-blue-400"
                    : "border-gray-200"
                }`}
              >
                {/* Check Icon */}
                {isSelected && (
                  <div className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
                    <CheckCircle className="text-green-600 w-6 h-6" />
                  </div>
                )}

                <img
                  src={tpl.img}
                  alt={tpl.name}
                  className="w-full h-48 max-md:object-left-top object-cover object-top"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-center text-gray-700">
                    {tpl.name}
                  </h2>
                  <button
                    onClick={() => handleSelect(tpl.id)}
                    className={`mt-4 w-full py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                      isSelected
                        ? "bg-green-600 cursor-default"
                        : "bg-blue-600 hover:bg-blue-500"
                    }`}
                    disabled={isSelected}
                  >
                    {isSelected ? "Selected" : "Select Template"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <button
          onClick={handleSave}
          className="btn-save mt-2"
          disabled={!selectedTemplate}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}
