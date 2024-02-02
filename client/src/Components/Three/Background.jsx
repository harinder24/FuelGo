import React, { Suspense, useState} from "react";
import { Canvas} from "@react-three/fiber";
import CanvasComponent from "./CanvasComponent";
import Controls from "./CameraControl";


// transformed = initPosition + ((position - initPosition) * uProgress);
// transformed.z += sin(transformed.x * uFrequency + uTime) * amplitude;
// transformed.z += sin(transformed.y * uFrequency + uTime) * amplitude;

export default function Background({isAboutUsActive,setIsModelRendered}) {
    // const initialCameraPosition = [3.062270448066928, 4.767485910554483,  23.6];
    const initialCameraPosition = [0,0,2];
    // const focus = {x:-0.5, y:14.767485910554483, z:40.6}
    // const initialCameraPosition = [-0.5, 4.767485910554483,  40.6];
  return (
    <div className="w-full h-full flex justify-center items-center">
        <color attach="background" args={["#ececec"]} />
      <Canvas camera={{ position: initialCameraPosition, fov: 75 }}>
        
        <CanvasComponent isAboutUsActive={isAboutUsActive} setIsModelRendered={setIsModelRendered} />
        <Controls isAboutUsActive={isAboutUsActive}/>
      
      </Canvas>

    </div>
  )
}
