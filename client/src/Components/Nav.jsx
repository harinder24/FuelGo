import React from "react";

import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon";
import WhatshotIcon from "@mui/icons-material/Whatshot";
function NavLanding() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-row justify-center items-center mt-2 ">
      <div className=" w-[1400px] min-w-auto h-full items-center px-4 flex flex-row justify-between">
        <div className="flex items-center flex-row gap-x-1 ">
          <WhatshotIcon sx={{ color: "rgb(14,164,233)", fontSize:"28px" }}  />
          {/* <Icon size={28} /> */}
          <div
            
            className="flex flex-row items-center font-medium text-lightMode-button "
          >
            <div className="text-white">Fuel</div>
            Go
          </div>
        </div>
        <div className="flex flex-row items-center w-full justify-end gap-x-2">
          <button
            onClick={() => navigate("/signup")}
            className=" px-4 py-2 bg-lightMode-button text-sm   font-[400] rounded-lg  text-center cursor-pointer hover:rounded-full transition-all 
            text-white
           
            duration-300 ease-in-out hover:bg-lightMode-buttonHover"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}

export { NavLanding };
