import React from 'react'

export default function Button({handleButtonClick,data}) {
  return (
    
        <button onClick={handleButtonClick} className=' px-2 w-full h-10 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header dark:text-lightMode-header font-medium rounded-sm hover:bg-lightMode-buttonHover'>
          {data}
        </button>
    
  )
}
