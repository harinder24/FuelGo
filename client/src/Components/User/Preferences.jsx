import React, { useEffect, useState } from "react";

import BgBlackOpacity from "../../Components/BgBlackOpacity";

import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Range } from "react-range";
export default function Preferences({ isList }) {
  const [bgPopUp, setBgPopUp] = useState(false);
  const [target, setTarget] = useState(null);
  const [preferencePopUp, setPreferencePopUp] = useState(false);
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
    [
      "Car wash",
      "Air pump",
      "Convenience store",
      "Ev charging station",
      "Truck stop",
    ],
    [5, 10, 15, 20],
  ];
  function preferenceOnclickHandler(i) {
    if (i === 0) {
      setPreferences({ ...preferences, verified: !preferences.verified });
    } else {
      setBgPopUp(true);
      setTarget(i);
      setPreferencePopUp(true);
    }
  }
  function bgPopUpOnClick() {
    setBgPopUp(false);
    setPreferencePopUp(false);
  }
  return (
    <div
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      className="h-8 w-full flex flex-row my-4 min-[520px]:justify-evenly max-[520px]:w-screen max-[520px]:overflow-x-auto max-[520px]:gap-x-4 max-[520px]:px-4"
    >
      {bgPopUp && (
        <div
          className=" absolute top-0 w-screen h-screen z-40"
          onClick={() => bgPopUpOnClick()}
        >
          {" "}
          <BgBlackOpacity isTransparent={true} />{" "}
        </div>
      )}

      {preferencesBtn.map((item, i) => {
        if (!isList && item === "Distance") {
          return <></>;
        }
        return (
          <div className=" relative max-[520px]:static  h-full">
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

            {preferencePopUp && target === i && (
              <PreferencePopUp
                preferenceData={preferenceData}
                bgPopUpOnClick={bgPopUpOnClick}
                i={i}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export function PreferencePopUp({ preferenceData, bgPopUpOnClick, i }) {
  const [header, setHeader] = useState("");
  const [radioValue, setRadioValue] = useState(null);
  const [ammenitiesValue, setAmmenitiesValue] = useState([
    {
      name: "Car wash",
      preferred: false,
    },
    {
      name: "Air pump",
      preferred: false,
    },
    {
      name: "Convenience store",
      preferred: false,
    },
    {
      name: "Ev charging station",
      preferred: false,
    },
    {
      name: "Truck stop",
      preferred: false,
    },
  ]);

  const [bottom, setBottom] = useState(0);
  const [distanceValues, setDistanceValues] = useState([5]);
  useEffect(() => {
    if (i === 1) {
      setHeader("Sort");
      setRadioValue(preferenceData[i][0]);
      setBottom("-284.6px");
    } else if (i === 2) {
      setHeader("Fuel type");
      setBottom("-333.6px");
      setRadioValue(preferenceData[i][0]);
    } else if (i === 3) {
      setHeader("Amenities");
      setBottom("-382.6px");
    } else if (i === 4) {
      setBottom("-237.6px");
      setHeader("Distance");
    }
  }, []);

  function amenitiesHandler(i) {
    const newAmmentiesValue = {...ammenitiesValue}
    const pref = newAmmentiesValue[i].preferred
    newAmmentiesValue[i].preferred = !pref
    setAmmenitiesValue(newAmmentiesValue)
  }
  
  return (
    <div
      // style={{ bottom: bottom }}
      className={`absolute bottom-[${bottom}] mt-8 ${
        i < 2 ? "left-[-90%]" : "right-[-90%]"
      } ${
        i === 4 && "right-[0%]"
      }  sbg z-[41] rounded-lg shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[2px_2px_8px_#182335]  th w-[350px] caret-transparent max-[520px]:bottom-0 max-[520px]:left-0 max-[520px]:mt-0 max-[520px]:w-screen rounded-b-none`}
    >
      <div className="flex flex-row justify-between text-2xl font-[500] p-4 pb-2 ">
        <div className="">{header}</div>
        <div
          onClick={() => bgPopUpOnClick()}
          className=" cursor-pointer absolute right-3 top-2 "
        >
          <CloseOutlinedIcon />
        </div>
      </div>
      <div className="border-b-[1px] cborder"></div>
      {i !== 4 ? (
        <div>
          {preferenceData[i].map((item,j) => {
            return (
              <div
                onClick={() => {
                  if (i === 3) {
                    amenitiesHandler(j);
                  } else {
                    setRadioValue(item);
                  }
                }}
                key={item}
                className="flex flex-row items-center justify-between px-4 py-[12.5px] cursor-pointer"
              >
             
                  <div className=" text-[16px]">{item}</div>
             
                <div className=" relative">
                  {i === 3 ? (
                    <>
                      <div className="w-4 h-4 rounded-[2px] fbg"></div>
                      {ammenitiesValue[j].preferred === true && (
                        <div className="w-2 h-2 rounded-[2px] bgbtn absolute top-1 left-1"></div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="w-4 h-4 rounded-full fbg"></div>
                      {radioValue === item && (
                        <div className="w-2 h-2 rounded-full bgbtn absolute top-1 left-1"></div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className=" mt-4 px-4 mb-4">
          <div className="text-lightMode-p dark:text-darkMode-p text-sm mb-3 text-end">
            in (km)
          </div>
          <Range
            step={5}
            min={5}
            max={20}
            values={distanceValues}
            onChange={(newValues) => setDistanceValues(newValues)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                // style={{
                //   ...props.style,
                //   height: "6px",
                //   width: "100%",
                //   backgroundColor: "#ccc",
                // }}
                className=" w-full h-2 rounded-lg tbg cborder border-[1px]"
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                // style={{
                //   ...props.style,
                //   height: "20px",
                //   width: "20px",
                //   backgroundColor: "#007bff",
                //   borderRadius: "50%",
                // }}
                className="h-4 w-4 rounded-full bgbtn focus-visible:outline-0   focus-visible:shadow-[0_0px_6px_#38bdf8]"
              />
            )}
          />
          <div className="text-lightMode-p dark:text-darkMode-p text-sm flex justify-between pt-2">
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
          </div>
        </div>
      )}
      {i === 4 && <div></div>}
      <div className="border-b-[1px] cborder  "></div>
      <div className="flex flex-row justify-between p-4 gap-x-4">
        <div className=" flex-1 p-3 px-4 bgbtn2 rounded-lg cursor-pointer text-center">
          Reset
        </div>
        <div className=" flex-1 p-3 px-4 bgbtn rounded-lg cursor-pointer text-center">
          Apply
        </div>
      </div>
    </div>
  );
}
