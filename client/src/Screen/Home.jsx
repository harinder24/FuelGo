import React, { useEffect, useState } from "react";
import Profile from "../Components/User/Profile";
import BgBlackOpacity from "../Components/BgBlackOpacity";
import TopNav from "../Components/User/TopNav";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileDevice = /mobile|tablet|ip(ad|hone|od)|android/i.test(
      userAgent
    );
    setIsMobile(isMobileDevice);
  }, []);

  async function setIsProfilePopUpHandler() {
    setIsProfilePopUp(true);
  }

  return (
    <>
      {" "}
      {!isMobile && (
        <div className=" absolute top-0 z-10">
          <div className="relative w-screen h-screen overflow-hidden">
            <div
              className="glowing-cursor"
              style={{ left: mousePosition.x, top: mousePosition.y }}
            ></div>
          </div>
        </div>
      )}
      <div className="w-screen h-screen  bg-lightMode-bg dark:bg-darkMode-bg ">
        <div className=" absolute w-screen h-screen z-20">
          <div className=" flex w-full h-full justify-center">
            <div className="   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0">
              <div className="w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1000px]:hidden">
                <Profile />
              </div>
              <div className="flex-1 flex flex-col ">
                <TopNav setIsProfilePopUpHandler={setIsProfilePopUpHandler} />
                <Preferences />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}

function Preferences() {
  const [bgPopUp, setBgPopUp] = useState(false)
  const [preferencePopUp, setPreferencePopUp] = useState(false)
  const [preferences, setPreferences] = useState({
    sort: "Recommended",
    verified: false,
    fuelType: "Regular",
    Amenities: [],
    Distance: 5,
  });
  const preferencesBtn = [
    "Verified",
    "Sort",
    "Fuel type",
    "Amenities",
    "Distance",
  ];
  const preferenceData = [
    ["Verifierd", "Not verified"],
    ["Recommended", "Rating", "Price"],
    ["Regular", "Mid-grade", "Premium", "Diesel"],
    ["Car wash", "Air pump", "Convenience store", "Ev charging station", "Truck stop"],
    [5,10,15,20]
  ];
  function preferenceOnclickHandler(i) {
    if (i === 0) {
      setPreferences({ ...preferences, verified: !preferences.verified });
    }else{
      setBgPopUp(true)
      preferencePopUp(true)
    }
  }
  function bgPopUpOnClick(){
    setBgPopUp(false)

  }
  return (
    <div className="h-8 w-full flex flex-row my-4 justify-evenly">
      {bgPopUp && <div className=" absolute top-0 w-screen h-screen z-40" onClick={()=> bgPopUpOnClick()}> <BgBlackOpacity isTransparent={true}/> </div>}
   
      {preferencesBtn.map((item, i) => {
        return (
          <div className=" relative  h-full">
          <div
            onClick={() => preferenceOnclickHandler(i)}
            key={item}
            className={`h-full px-2 text-lightMode-header  ${
              i === 0 && preferences.verified ? "bgbtn" : "sbg"
            }  rounded-lg flex flex-row items-center justify-center text-xs gap-x-1 cursor-pointer w-[90px]`}
          >
            <div>{item}</div>

            {i === 0 ? (
              <VerifiedOutlinedIcon sx={{ fontSize: 16 }} />
            ) : (
              <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16 }} />
            )}
          </div>
          {preferencePopUp && <PreferencePopUp preferenceData={preferenceData} i={i}/>}
          </div>
        );
      })}
    </div>
  );
}

function PreferencePopUp({preferenceData, i}){

  return(
<div className=" absolute" style={{ bottom: -divRef?.current?.clientHeight || 0 }}>
  {i === 1 || i === 2 && 
  <div>
    {preferenceData.map((item)=>{
      return(
        <div key={item} className="flex flex-row items-center justify-between">
          <div>
              {item}
          </div>
          <div className="w-2 h-2 rounded-full">

          </div>
        </div>
      )
    })}
    </div>}

</div>
  )
}



function ProfilePopUp({ setIsProfilePopUp }) {
  return (
    <BgBlackOpacity>
      <div
        onClick={() => setIsProfilePopUp(false)}
        className=" absolute top-0 w-screen h-screen z-40"
      >
        <div className=" absolute top-0  w-[312px] h-full animate-slide-in">
          <Profile />
        </div>
      </div>
    </BgBlackOpacity>
  );
}
// shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_6px__#e2e8f033]
