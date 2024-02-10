import React from "react";
import Profile from "../Components/User/Profile";

export default function GasStation() {
  return (
    <div className=" w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg ">
      <div className=" absolute w-screen h-screen z-20">
        <div className=" flex w-full h-full justify-center">
          <div className="   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden">
            <div className="w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1000px]:hidden">
              <Profile />
            </div>
            <div className="flex-1 flex flex-col ">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavGasStation(){
  return(
    <div className=" w-full rounded-lg sbg flex flex-row items-center p-4 gap-x-4 max-[520px]:rounded-none max-[520px]:p-2">

    </div>
  )
}