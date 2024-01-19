import React, { useState} from "react";
import { Canvas} from "@react-three/fiber";
import CanvasComponent from "./CanvasComponent";
import Controls from "./CameraControl";


export default function Background({anglex, angley, zoom, focus}) {
   
    const initialCameraPosition = [3.422061460869188, 5.315856452720275, 10.150449432123484];

       
  
   
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Canvas camera={{ position: initialCameraPosition }}>
        <CanvasComponent zoom={zoom}/>
        <Controls zoom={zoom} focus={focus} anglex={anglex} angley={angley}/>
      </Canvas>

    </div>
  )
}
