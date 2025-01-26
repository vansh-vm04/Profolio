import React from 'react'

const Template = ({onclick, imageSrc}) => {
  return (
    <div
    onClick={onclick}
     className='w-full h-fit border-orange-400  border-s-orange-1 border-2 items-center justify-center hover:cursor-pointer'>
        <img className='w-full h-64 max-md:h-44 overflow-hidden' src={imageSrc} alt="template" />
    </div>
  )
}

export default Template