import React from 'react'

const FeatureCard = ({title,description}) => {
  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 text-left shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-violet-500">
              {title}
            </h3>
            <p className="text-gray-700">
              {description}
            </p>
          </div>
  )
}

export default FeatureCard