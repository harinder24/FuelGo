
import React, { useRef, useEffect,useMemo, useState} from "react";
import { OrbitControls, Text, Html  } from "@react-three/drei";
import Model from "../../../public/Route_66_adventure_-_sketchfab_challenge";

import * as THREE from 'three';


import { useFrame, useThree } from "@react-three/fiber";
// import SetParticlesGrid from "./PictureMesh.jsx";


const CanvasComponent = ({setIsModelRendered,isAboutUsActive}) => {
    const controls = useRef();
  
    const cubeRef = useRef()
 

  // useFrame(() => {
  //   if (cubeRef.current) { 
  //     cubeRef.current.rotation.y += 0.0005;
  //   }
   
  // });
    const handleControlsUpdate = () => {
    
      setIsModelRendered(true);
    };
    // const meshPosition = 
    return (
      <>
        <ambientLight  intensity={1}/>
      
      
      <mesh position={[0,0,0]}   ref={cubeRef}>
        {/* <Model /> */}
        <SetParticlesGrid/>
        </mesh>
        <mesh  >
       {/* {
        isAboutUsActive &&
        <></>
        // < position={[0, 15.35,  40.5]}/>
       } */}
        
     
 
      </mesh>
        <OrbitControls
         
           enableZoom={true}
          enablePan={true}
          
          enableRotate={true}
       
          // zoomSpeed={0.5}
          // panSpeed={0.5}
          // rotateSpeed={0.5}
          // target={[0, 0, 0]}
         onUpdate={handleControlsUpdate} 
       
        />
        
      </>
    );
  }

 
  
  
  
  

  
export default CanvasComponent;
