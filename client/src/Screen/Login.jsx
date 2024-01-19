import React from 'react'
import WhatshotIcon from "@mui/icons-material/Whatshot";
export default function Login() {
  return (
    <div className='w-screen min-h-screen h-auto bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center'>
        <div className='w-[800px] h-[500px] bg-lightMode-sbg dark:bg-darkMode-sbg rounded-lg border-lightMode-border dark:border-darkMode-border border-[1px] flex flex-row'>
        <div className=' relative flex-1 w-full h-full'>
        <div className='flex-1 flex w-full h-full flex-row items-center justify-center border-lightMode-border dark:border-darkMode-border border-r-[1px] '>
            
        <WhatshotIcon  sx={{ color: "rgb(14,165,233)", fontSize: "300px" }} />
        </div>
        <div className=' absolute top-0 w-full flex items-center justify-center pt-2'>
        <div className="font-lg text-2xl text-lightMode-header">Fuel</div>
          <div className="font-medium text-2xl text-[rgb(14,164,233)]">Go</div>
        </div>
        </div>
        <div className='flex-1 flex '>

        </div>


        </div>

    </div>
  )
}
