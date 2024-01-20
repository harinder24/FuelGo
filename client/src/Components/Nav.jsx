import React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Button from "./Button";
function NavLanding() {
  return (
    <div className="w-full h-full flex flex-row justify-center items-center bg-lightMode-transparentBg dark:bg-darkMode-transparentBg">
      <div className=" w-[1400px] min-w-auto h-full items-center px-4 flex flex-row justify-between">
        <div className="flex items-center">
          <WhatshotIcon sx={{ color: "rgb(14,165,233)" }} />
          <div className="font-medium text-lightMode-header">Fuel</div>
          <div className="font-medium text-[rgb(14,164,233)]">Go</div>
        </div>
        <div className="flex flex-row items-center w-full justify-end gap-x-2">
          <div className=" px-2 py-1 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header dark:text-lightMode-header font-medium rounded-sm hover:bg-lightMode-buttonHover text-center cursor-pointer">
            Log in
          </div>
          <div className="  px-2  py-1 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header dark:text-lightMode-header font-medium rounded-sm hover:bg-lightMode-buttonHover text-center cursor-pointer">
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
}

export { NavLanding };
