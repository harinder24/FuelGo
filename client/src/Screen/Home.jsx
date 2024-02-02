import React, { useEffect, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import WalletOutlinedIcon from "@mui/icons-material/WalletOutlined";
import LensOutlinedIcon from "@mui/icons-material/LensOutlined";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import CardGiftcardOutlinedIcon from "@mui/icons-material/CardGiftcardOutlined";
import PixIcon from "@mui/icons-material/Pix";
export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
          <div className="  w-full h-full z-20 flex flex-col p-3">
            <div className="w-[312px] h-full rounded-xl shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_6px__#e2e8f033]">
              <Profile />
            </div>
            <div className="flex-1"></div>
          </div>
        </div>
      </div>
    </>
  );
}

function Profile() {
  return (
    <div className="w-full h-full bg-lightMode-sbg flex flex-col dark:bg-darkMode-sbg rounded-xl ">
      <div className="p-2 pb-0 w-full mb-6">
        <div className="w-full border-t-[1px] border-lightMode-fbg h-[88px] rounded-xl tbg-gradient flex flex-row items-center  p-4 ">
          <div className="flex flex-row gap-x-4 items-center w-full justify-between">
            <div className="flex flex-row gap-x-4 items-center flex-1">
              <img
                className="size-14 rounded-full"
                src="../public/oilrig.jpg"
                alt=""
              />
              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="text-lightMode-header text-base font-[500] width-full overflow-hidden text-ellipsis whitespace-nowrap">
                  Harinder Sran
                </div>
                <div className="text-lightMode-p dark:text-darkMode-p text-sm width-full overflow-hidden text-ellipsis whitespace-nowrap">
                  hss0220022gmail.com
                </div>
              </div>
            </div>
            <div className=" cursor-pointer">
              <SettingsOutlinedIcon sx={{ color: "white", fontSize: "28px" }} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 flex-col mb-2">
        <div className="text-lightMode-p dark:text-darkMode-p text-sm mb-1">
          level 1
        </div>
        <div className="flex flex-row h-4 rounded-full bg-lightMode-tbg">
          {" "}
          <div
            className="bg-lightMode-button rounded-full"
            style={{ width: "20%" }}
          ></div>
          <div className="flex-1"></div>
        </div>
        <div className="text-lightMode-p dark:text-darkMode-p text-sm mt-1 flex flex-row justify-between items center">
          <div>15</div>
          <div>15 / 75</div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
          <FavoriteBorderOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
          <div className="text-lightMode-header dark:text-darkMode-header text-sm">
            Favourite
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
          <WalletOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
          <div className="text-lightMode-header dark:text-darkMode-header text-sm">
            Rewards
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
          <SentimentSatisfiedOutlinedIcon
            sx={{ color: "#ffffff", fontSize: 25 }}
          />
          <div className="text-lightMode-header dark:text-darkMode-header text-sm">
            Favourite
          </div>
        </div>
      </div>
      <div className="px-2 w-full ">
        <div className=" flex flex-row items-center gap-x-4 p-4 rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
          <LensOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
          <div className="text-lightMode-header dark:text-darkMode-header text-sm">
            Frame
          </div>
        </div>
      </div>
      <div className="px-2 w-full mb-4">
        <div className=" flex flex-row items-center gap-x-4 p-4 py-[8.5px] rounded-xl cursor-pointer hover:bg-lightMode-tbg dark:hover:bg-darkMode-tbg">
          <CardGiftcardOutlinedIcon sx={{ color: "#ffffff", fontSize: 25 }} />
          <div className=" flex flex-col">
            <div className="text-lightMode-header dark:text-darkMode-header text-sm">
              Invite friends
            </div>
            <div className=" flex flex-row items-center gap-x-1">
              <div className="text-lightMode-p dark:text-darkMode-p text-sm ">
                You earn 100
              </div>{" "}
              <PixIcon sx={{ color: "white", fontSize: 14 }} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}
