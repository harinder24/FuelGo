import React from "react";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

 
function NavLanding() {
const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-row justify-center items-center">
      <div className=" w-[1400px] min-w-auto h-full items-center px-4 flex flex-row justify-between">
        <div className="flex items-center">
          <WhatshotIcon sx={{ color: "rgb(14,165,233)" }} />
          <div className="font-medium text-lightMode-header">Fuel</div>
          <div className="font-medium text-[rgb(14,164,233)]">Go</div>
        </div>
        <div className="flex flex-row items-center w-full justify-end gap-x-2">
          <button onClick={()=> navigate("/login")} className=" w-[80px] py-1 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header  max-[320px]:w-[70px] dark:text-lightMode-header font-medium rounded-sm hover:bg-lightMode-buttonHover text-center cursor-pointer">
            Log in
          </button>
          <button onClick={()=> navigate("/signup")} className=" w-[80px]  max-[320px]:w-[70px] py-1 bg-lightMode-button dark:bg-lightMode-button text-lightMode-header dark:text-lightMode-header font-medium rounded-sm hover:bg-lightMode-buttonHover text-center cursor-pointer">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}

export { NavLanding };
