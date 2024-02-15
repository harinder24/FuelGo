import React, { useEffect } from "react";
import { NavLanding } from "../Components/Nav";

import AutocompleteComponent from "../Components/AutocompleteComponent";
export default function LandingPage() {
  return (
    <div className="w-screen h-screen relative bg-darkMode-bg overflow-y-auto overflow-hidden">
      <div className=" absolute  top-0 w-full z-20 ">
        <NavLanding />
      </div>
      <div className="w-full h-[400px] flex sbg flex-row justify-center  overflow-hidden mt-[68px]">
        <div className=" pl-4 w-[1400px] min-w-auto h-full max-[640px]:pr-4  flex flex-row overflow-hidden relative ">
          <div className=" h-full w-full  flex flex-row">
            <div className="flex-col flex flex-1">
              <div className=" th text-5xl font-[Satisfy] mt-10">
                Filling <span className="font-[Satisfy] tb"> Gas</span>{" "}
                <div className="mt-4 ml-[100px] font-[Satisfy] max-[320px]:m-auto">
                  {" "}
                  Made <span className="font-[Satisfy] tb"> easy</span>
                </div>
              </div>
              <div className="mt-10 flex-1  ">
                <div className="flex flex-row justify-between items-end mb-4">
                  <div className=" tp text-2xl ">Let's get started</div>
                  {/* <div className=" tb text-sm cursor-pointer ">
                    Use current location
                  </div> */}
                </div>
                <div className=" h-10  th ">
                  <AutocompleteComponent />
                </div>
              </div>
            </div>
            <div className=" w-[300px]  h-full tbg trapezoid  min-[800px]:flex-1 max-[640px]:hidden">
              <img
                className="w-full h-full object-cover"
                src="/landing/st.webp"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useState, useEffect, useRef } from "react";

// import { NavLanding } from "../Components/Nav";
// import { useNavigate } from "react-router-dom";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import MainScene from "../Components/Three/scene";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// export default function LandingPage() {
//   const mainSceneRef = useRef(null);
//   const navigate = useNavigate();
//   const [isModelRended, setIsModelRendered] = useState(false);
//   const [isAboutUsActive, setIsAboutUsActive] = useState(false);
//   const [isAboutNum, setIsAboutNum] = useState(1);
//   const [isImgNotRenderering, setIsImgNotRenderining] = useState(true);
//   useEffect(() => {
//     const mainScene = new MainScene();
//     mainSceneRef.current = mainScene;
//     const style = document.createElement("style");
//     style.textContent = "html { overflow: hidden; }";
//     document.head.appendChild(style);

//     return () => {
//       document.head.removeChild(style);
//       mainSceneRef.current = null;
//       const canvas = document.querySelector("canvas");
//       if (canvas) {
//         canvas.parentNode.removeChild(canvas);
//       } else {
//         console.error("Canvas element not found.");
//       }
//     };
//   }, []);

//   const handleButtonClick = () => {
//     setIsAboutUsActive(true);
//     if (mainSceneRef.current) {
//       mainSceneRef.current.aboutUs();
//     }
//   };
//   const decreseNum = async () => {
//     setIsImgNotRenderining(false);
//     const num = isAboutNum;
//     setIsAboutNum(isAboutNum - 1);
//     if (mainSceneRef.current) {
//       mainSceneRef.current
//         .changeImg(num - 1)
//         .then(() => {

//           setIsImgNotRenderining(true);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   };
//   const increaseNum = async () => {
//     setIsImgNotRenderining(false);
//     const num = isAboutNum;
//     setIsAboutNum(isAboutNum + 1);
//     if (mainSceneRef.current) {
//       mainSceneRef.current
//         .changeImg(num + 1)
//         .then(() => {
//           setIsImgNotRenderining(true);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     }
//   };
//   const navigateToSignUp = async () => {

//     const canvas = document.querySelector("canvas");
//     if (canvas) {
//       canvas.parentNode.removeChild(canvas);
//     } else {
//       console.error("Canvas element not found.");
//     }
//     mainSceneRef.current = null;
//     navigate("/signup");
//   };
//   const goBack = () => {
//     mainSceneRef.current.goBack();
//     setIsAboutNum(1);
//     setIsAboutUsActive(false);
//   };

//   return (
//     <div className=" w-screen h-screen absolute top-0 z-40">
//       <div className="w-screen h-screen relative overflow-hidden">

//         {!isAboutUsActive ? (
//           <>
//             <div className="absolute top-0 right-0 w-screen h-[54px]">
//               <NavLanding />
//             </div>
//             <div
//               className="absolute bottom-6
//         right-[calc((100vw-1368px)/2)] max-[1384px]:right-4
//        font-[300] text-transparent text-xl  z-[10] "
//             >
//               <div onClick={handleButtonClick} className=" cursor-pointer">
//                 About us
//               </div>
//             </div>
//             <div
//               className="absolute bottom-6
//         right-[calc((100vw-1368px)/2)] max-[1384px]:right-4
//        font-[300] text-lightMode-button text-xl   "
//             >
//               About us
//             </div>
//             <div
//               className="absolute bottom-6
//         right-[calc((100vw-1368px)/2)] max-[1384px]:right-4
//        font-[300] text-xl  "
//             >
//               <div className="relative text-transparent">
//                 <div>About us</div>
//                 <div className=" absolute bottom-[-4px] w-full h-[2px] bg-lightMode-button  "></div>
//                 <div className="w-full flex flex-row justify-center">
//                   <div className=" absolute bottom-[-5px] h-1 w-2 rounded-full bg-white animate-move"></div>
//                 </div>
//               </div>
//             </div>
//             <div className=" absolute bottom-20 left-[75px] overflow-hidden bg-black w-[550px] h-[250px] blur-[200px] max-[680px]:w-[calc(100vw-16px)] px-4 max-[680px]:left-0 max-[680px]:bottom-[30px]"></div>
//             <div className=" absolute bottom-[150px]   max-[630px]:w-[calc(100vw-16px)] pr-4  left-[calc((100vw-1368px)/2)] max-[1384px]:left-4  max-[680px]:bottom-[100px]">
//               <div></div>
//               <div className="flex flex-col ">
//                 <div className=" text-4xl font-bold text-white max-[370px]:text-2xl">
//                   Gas station near you
//                   {/* <span className=" text-lightMode-button">started</span> */}
//                 </div>
//                 <div className="flex flex-row w-[550px] max-[680px]:w-full my-4">
//                   <div className="flex-1 relative">
//                     <div className="h-10 flex-1 bg-white rounded-lg">
//                       <AutocompleteComponent />
//                     </div>
//                     <div className="absolute top-[6px] right-[0px] pr-[2px] cursor-pointer bg-white ">
//                       <LocationOnIcon sx={{ color: "rgb(14,164,233)"}} />
//                     </div>
//                   </div>
//                   <div className="h-10  ml-4  bg-lightMode-button flex items-center justify-center cursor-pointer transform hover:translate-y-[-4px]  transition duration-300 rounded-lg text-white
//                   hover:bg-lightMode-buttonHover">
//                     <div className="px-2 font-[400] text-sm">Search</div>
//                   </div>
//                 </div>

//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="w-full h-full absolute top-0 z-[10]">
//             <div className="w-full h-full relative">
//               <div className=" absolute top-4 left-[75px] overflow-hidden    px-4 max-[680px]:left-0">
//                 <div
//                   onClick={goBack}
//                   className="hover:scale-105 rounded-full cursor-pointer"
//                 >
//                   <ArrowBackIcon
//                     sx={{ color: "rgb(255,255,255)", fontSize: "50px" }}
//                   />
//                 </div>
//               </div>
//               {isImgNotRenderering && (
//                 <div className="w-full h-full flex flex-col justify-between items-center  py-[60px]">
//                   {isAboutNum !== 1 && (
//                     <div
//                       onClick={decreseNum}
//                       className=" p-2 rounded-full border-4 border-[rgb(255,255,255)] cursor-pointer hover:bg-white  text-[rgb(255,255,255)] hover:text-[rgb(14,165,233)] hover:scale-105"
//                     >
//                       <KeyboardArrowUpIcon sx={{ fontSize: "50px" }} />
//                     </div>
//                   )}

//                   <div className="flex-1 "></div>
//                   {isAboutNum !== 3 && (
//                     <div
//                       onClick={increaseNum}
//                       className=" p-2 rounded-full border-4 border-[rgb(14,165,233)]  hover:bg-[rgb(14,165,233)]  text-[rgb(14,165,233)] hover:text-[rgb(255,255,255)] cursor-pointer hover:scale-105"
//                     >
//                       <KeyboardArrowDownIcon sx={{ fontSize: "50px" }} />
//                     </div>
//                   )}
//                   {isAboutNum === 3 && (
//                     <div
//                       onClick={navigateToSignUp}
//                       className=" p-2 rounded-full border-[2px] border-[rgb(14,165,233)]    text-[rgb(14,165,233)]  cursor-pointer hover:scale-105"
//                     >
//                       <div className=" text-lg px-4 font-medium">
//                         Get started
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//               <div className="w-full h-full "></div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
