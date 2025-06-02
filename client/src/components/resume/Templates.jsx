import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTemplate } from '../../features/resume/resumeSlice';
import { CheckCircle } from 'lucide-react'; 

const templates = [
  { id: 'p1', name: 'Colorful Portfolio', img: '/templates/colorful.png' },
  { id: 'p2', name: 'Minimal Portfolio', img: '/templates/minimal.png' },
  { id: 'p3', name: 'Dark Elegance', img: '/templates/dark.png' },
  { id: 'p4', name: 'Modern Grid', img: '/templates/grid.png' },
  { id: 'p5', name: 'Classic Resume', img: '/templates/classic.png' },
  { id: 'p6', name: 'Creative Flow', img: '/templates/creative.png' },
];

export default function SelectTemplate() {
  const dispatch = useDispatch();
  const selectedTemplate = useSelector((state) => state.resume.template);

  const handleSelect = (id) => {
    dispatch(setTemplate(id));
  };

  return (
    <div className={`md:ml-[216px] p-10 w-full`}>
      <h1 className="text-2xl font-bold mb-6">Choose a Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((tpl) => {
          const isSelected = tpl.id === selectedTemplate;

          return (
            <div
              key={tpl.id}
              className={`relative border p-4 rounded shadow hover:shadow-lg transition duration-300 ${
                isSelected ? 'border-blue-600 ring-2 ring-blue-400' : ''
              }`}
            >
              {/* Tick Overlay */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                  <CheckCircle className="text-green-600 w-5 h-5" />
                </div>
              )}

              <img
                src={tpl.img}
                alt={tpl.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="font-semibold text-lg text-center">{tpl.name}</h2>
              <button
                onClick={() => handleSelect(tpl.id)}
                className={`mt-4 w-full px-4 py-2 rounded text-white transition ${
                  isSelected
                    ? 'bg-green-600 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-500'
                }`}
                disabled={isSelected}
              >
                {isSelected ? 'Selected' : 'Select'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
