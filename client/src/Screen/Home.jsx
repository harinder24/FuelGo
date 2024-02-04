import React, { useEffect, useRef, useState } from "react";
import Profile, { ProfilePopUp } from "../Components/User/Profile";
import TopNav from "../Components/User/TopNav";

import Preferences from "../Components/User/Preferences";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { GoogleMap, Marker } from "@react-google-maps/api";
import stationMarke from "../../public/station.png";
import CloseIcon from "@mui/icons-material/Close";
export default function Home() {
  // const [isMobile, setIsMobile] = useState(false);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isProfilePopUp, setIsProfilePopUp] = useState(false);
  const [isList, setIsList] = useState(true);
  // useEffect(() => {
  //   const updateMousePosition = (e) => {
  //     setMousePosition({ x: e.clientX, y: e.clientY });
  //   };

  //   window.addEventListener("mousemove", updateMousePosition);

  //   return () => {
  //     window.removeEventListener("mousemove", updateMousePosition);
  //   };
  // }, []);
  // useEffect(() => {
  //   const userAgent = window.navigator.userAgent.toLowerCase();
  //   const isMobileDevice = /mobile|tablet|ip(ad|hone|od)|android/i.test(
  //     userAgent
  //   );
  //   setIsMobile(isMobileDevice);
  // }, []);

  async function setIsProfilePopUpHandler() {
    setIsProfilePopUp(true);
  }

  return (
    <>
      {" "}
      {/* {!isMobile && (
        <div className=" absolute top-0 z-10">
          <div className="relative w-screen h-screen overflow-hidden">
            <div
              className="glowing-cursor"
              style={{ left: mousePosition.x, top: mousePosition.y }}
            ></div>
          </div>
        </div>
      )} */}
      <div className="w-screen h-screen  bg-lightMode-bg dark:bg-darkMode-bg ">
        <div className=" absolute w-screen h-screen z-20">
          <div className=" flex w-full h-full justify-center">
            <div className="   w-[1400px] min-w-auto  h-full flex flex-row gap-x-3 p-3 max-[520px]:p-0 overflow-hidden">
              <div className="w-[312px] h-full rounded-xl max-[1000px]:rounded-none max-[1000px]:hidden">
                <Profile />
              </div>
              <div className="flex-1 flex flex-col ">
                <TopNav
                  setIsProfilePopUpHandler={setIsProfilePopUpHandler}
                  isList={isList}
                  setIsList={setIsList}
                />
                <div className="  max-[520px]:overflow-auto  max-[520px]:flex max-[520px]:flex-row max-[520px]:gap-x-4">
                  {" "}
                  <Preferences isList={isList} />
                </div>
                <MainBody isList={isList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isProfilePopUp && <ProfilePopUp setIsProfilePopUp={setIsProfilePopUp} />}
    </>
  );
}

function MainBody({ isList }) {
  return (
    <>
      {isList ? (
        <div className="flex-1 w-full overflow-y-auto flex flex-col gap-y-4 max-[720px]:flex-row max-[720px]:flex-wrap max-[720px]:justify-evenly max-[720px]:gap-4 max-[630px]:flex-col max-[630px]:flex-nowrap max-[630px]:justify-normal  max-[630px]:items-center max-[630px]:px-2 pb-4 ">
          <IndividualStationsList />
          <IndividualStationsList />
          <IndividualStationsList />
          <IndividualStationsList />
        </div>
      ) : (
        <div className=" flex-1 w-full ">
          <StationMap />
        </div>
      )}
    </>
  );
}

function StationMap() {
  const [showStationInfo, setShowStationInfo] = useState(false);
  const mapRef = useRef(null);
  const mapStyle = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    //  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242f3e" }],
    },
    {
      featureType: "poi",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    // {
    //   featureType: "road.highway",
    //   elementType: "geometry",
    //   stylers: [{ color: "#746855" }],
    // },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    // {
    //   featureType: "road.highway",
    //   elementType: "labels.text.fill",
    //   stylers: [{ color: "#f3d19c" }],
    // },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];
  const mapOptions = {
    disableDefaultUI: true,
    styles: mapStyle,
  };
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
    border: "0px",
    borderRadius: "8px",
  };
  const initialPosition = {
    lat: 49.258347,
    lng: -123.076953,
  };
  const handleMarkerClick = () => {
    setShowStationInfo(true)
  };
  return (
    <div className="w-full h-full relative">
      {showStationInfo && <StationInfo setShowStationInfo={setShowStationInfo}/>}
      <GoogleMap
        ref={mapRef}
        options={mapOptions}
        mapContainerStyle={mapContainerStyle}
        center={initialPosition}
        zoom={15}
      >
        <Marker
          position={initialPosition}
          title="Your Marker"
          icon={{
            url: stationMarke,
            scaledSize: { width: 36, height: 40 },
          }}
          onClick={() => handleMarkerClick()}
        />
      </GoogleMap>
    </div>
  );
}

function StationInfo({setShowStationInfo}) {
  const isFavourite = false;
  const rating = 4.3;
  return (
    <div className=" absolute bottom-4 left-4 w-[300px] bg max-[520px]:rounded-none rounded-lg z-[1] max-[520px]:w-full max-[520px]:bottom-0 max-[520px]:left-0">
      <div className=" caret-transparent w-full rounded-lg max-[520px]:rounded-none border-[1px] max-[520px]:border-0 cborder flex justify-between p-4 ">
        <div className=" flex  flex-col w-full">
          <div className="flex flex-row w-full items-center justify-between">
            <div className="w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]   font-[400] th max-text-xl text-ellipsis whitespace-nowrap overflow-hidden">
              Chevron gas stations
            </div>
            <div onClick={()=>setShowStationInfo(false)} className="  th  cursor-pointer">
              <CloseIcon />
            </div>
          </div>
          <div className=" relative pt-2">
            <img
              className=" w-[320px]   min-[520px]:aspect-video max-[500px]:w-full rounded-lg object-cover"
              src="../public/oilrig.jpg"
              alt=""
            />
            <div className=" absolute top-0 right-0  p-2 rounded-full cursor-pointer th">
              {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </div>
          </div>
          <div className=" flex flex-col justify-center pt-2 ">
            <div className=" flex flex-col gap-y-2">
              <div className=" flex flex-row justify-between items-center">
                <div className="tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden">
                  <div className="">22 km - </div>
                  <div className=" text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]">
                    {" "}
                    12343 st king highwaytdrjfyugiuhoijokojihgjyfhfxdz
                  </div>
                </div>
                <div className="p-[6px] rounded-full th fbg text-xs ">
                  {rating}
                </div>
              </div>
              <div className=" flex flex-row justify-between">
                <div className="tp flex flex-row text-sm">
                  <div className="">$1.23/</div> Regular
                </div>
                <div className="  tb text-sm hover:underline cursor-pointer">
                  More info
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IndividualStationsList() {
  const rating = 3.1;
  const filledStars = Math.floor(rating);
  const totalStars = 5;
  const size = 16;
  const stars = [];
  const isFavourite = false;
  // Filled stars
  for (let i = 0; i < filledStars; i++) {
    stars.push(<StarIcon key={i} sx={{ color: "gold", fontSize: size }} />);
  }

  // Half star
  if (!Number.isInteger(rating)) {
    const halfStar = rating - filledStars;
    if (halfStar < 0.3) {
      stars.push(<StarIcon sx={{ fontSize: size }} />);
    } else if (halfStar > 0.7) {
      stars.push(<StarIcon sx={{ color: "gold", fontSize: size }} />);
    } else {
      stars.push(
        <StarHalfIcon
          key={filledStars}
          sx={{ color: "gold", fontSize: size }}
        />
      );
    }
  }

  // Empty stars
  for (let i = stars.length; i < totalStars; i++) {
    stars.push(<StarIcon key={i} sx={{ fontSize: size }} />);
  }
  return (
    <div className=" caret-transparent w-full rounded-lg border-[1px] cborder flex justify-between p-4  max-[720px]:w-fit  ">
      <div className=" flex flex-row gap-x-12 max-[720px]:flex-col ">
        <div className=" relative">
          <img
            className=" w-[320px] max-[720px]:w-[260px] max-[630px]:w-[320px]  aspect-video rounded-lg object-cover"
            src="../public/oilrig.jpg"
            alt=""
          />
          <div className=" absolute top-0 right-0  p-2 rounded-full cursor-pointer th min-[720px]:hidden">
            {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </div>
        </div>
        <div className=" flex flex-col justify-center max-[720px]:pt-2 ">
          <div className=" flex flex-col gap-y-5 max-[720px]:gap-y-2">
            <div className="flex flex-row w-full items-center justify-between">
              <div className="w-[225px] max-[325px]:w-[200px] max-[300px]:w-[175px]  text-2xl font-[400] th max-[720px]:text-xl text-ellipsis whitespace-nowrap overflow-hidden">
                Chevron gas stations
              </div>
              <div className="p-[6px] rounded-full th fbg text-xs min-[720px]:hidden">
                {rating}
              </div>
            </div>
            <div className=" flex flex-row tp items-center gap-x-2 text-sm max-[720px]:hidden">
              <div>{rating}</div>
              <div className="  relative ">
                <div className=" flex flex-row gap-x-[2px]">{stars}</div>
              </div>
              <div>(246)</div>
            </div>
            <div className="tp flex w-full  flex-row gap-x-[2px] text-sm overflow-hidden">
              <div className="">22 km - </div>
              <div className=" text-ellipsis whitespace-nowrap overflow-hidden w-[175px] max-[285px]:w-[165px]">
                {" "}
                12343 st king highwaytdrjfyugiuhoijokojihgjyfhfxdz
              </div>
            </div>
            <div className=" flex flex-row justify-between">
              <div className="tp flex flex-row text-sm">
                <div className="">$1.23/</div> Regular
              </div>
              <div className=" min-[720px]:hidden tb text-sm hover:underline cursor-pointer">
                More info
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-between th max-[720px]:hidden">
        <div className="  p-2 rounded-full sbg cursor-pointer">
          {isFavourite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </div>
        <div className=" tb p-2 rounded-full sbg cursor-pointer">
          <NavigateNextIcon />
        </div>
      </div>
    </div>
  );
}

// shadow-[0px_0px_6px_#e2e8f033]  dark:shadow-[0px_0px_6px__#e2e8f033]
