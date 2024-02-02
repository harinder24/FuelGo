import React from 'react'

export default function Button({handleButtonClick,data}) {
  return (
    
        <button onClick={handleButtonClick} className=' px-2 w-full h-10 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header font-[400] text-sm dark:text-lightMode-header hover:bg-lightMode-buttonHover rounded-lg'>
          {data}
        </button>
    
  )
}
