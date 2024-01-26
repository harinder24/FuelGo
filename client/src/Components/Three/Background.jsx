import React, { useState} from "react";
import { Canvas} from "@react-three/fiber";
import CanvasComponent from "./CanvasComponent";
import Controls from "./CameraControl";


export default function Background({anglex, angley, zoom, focus}) {
    const initialCameraPosition = [3.062270448066928, 4.767485910554483,  12.298104313538397];

       
   
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Canvas camera={{ position: initialCameraPosition }}>
        <CanvasComponent zoom={zoom}/>
        <Controls zoom={zoom} focus={focus} anglex={anglex} angley={angley}/>
      </Canvas>

    </div>
  )
}
