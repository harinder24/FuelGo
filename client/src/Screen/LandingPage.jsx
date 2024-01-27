import React, { useState } from "react";
import Background from "../Components/Three/Background";

import { NavLanding } from "../Components/Nav";
import { useNavigate } from "react-router-dom";
import AutocompleteComponent from "../Components/AutocompleteComponent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
export default function LandingPage() {
  const navigate = useNavigate();
  const [isModelRended, setIsModelRendered] = useState(false);
  // if(!isModelRended){
  //   return(
  //     <>
  //     <div className="w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center">

  //     </div>
  //     </>
  //   )
  // }

  return (
    <div className="w-screen h-screen relative">
      {!isModelRended && (
        <div className="w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg absolute top-0 z-50">
          <div className="w-full h-full flex justify-center items-center">
            <div class="loadingScreen">
              <div class="loadingScreenline"></div>
              <div class="loadingScreenline"></div>
              <div class="loadingScreenline"></div>
            </div>
          </div>
        </div>
      )}
      <Background setIsModelRendered={setIsModelRendered} />
      <div className="absolute top-0 right-0 w-screen h-[54px]">
        <NavLanding />
      </div>
      <div className=" absolute bottom-20 left-[75px] overflow-hidden bg-black w-[550px] h-[250px] blur-[100px] max-[630px]:w-full px-4 max-[630px]:left-0"></div>
      <div className=" absolute bottom-[150px] left-20  max-[630px]:w-full px-4 max-[630px]:left-0 ">
        <div></div>
        <div className="flex flex-col ">
          <div className=" text-4xl font-bold text-white">
            Let's get <span className=" text-lightMode-button">started</span>
          </div>
          <div className="flex flex-row w-[550px] max-[630px]:w-full my-4">
            <div className="flex-1 relative">
              <div className="h-10 flex-1 bg-white rounded-sm">
                <AutocompleteComponent />
              </div>
              <div className="absolute top-[5px] right-[2px] cursor-pointer bg-white ">
                <LocationOnIcon />
              </div>
            </div>
            <div className="h-10  mx-4  bg-lightMode-button flex items-center justify-center rounded-sm cursor-pointer">
              <div className="px-2 font-semibold text-white">Search</div>
            </div>
          </div>
          <div className=" text-white font-medium text-sm">
            Or{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-lightMode-button cursor-pointer"
            >
              Log in
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
