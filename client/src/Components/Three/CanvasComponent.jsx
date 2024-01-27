
import React, { useRef, useEffect} from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "../../../public/Route_66_adventure_-_sketchfab_challenge";
import * as THREE from 'three';

const CanvasComponent = ({setIsModelRendered}) => {
    const controls = useRef();
    const target = new THREE.Vector3();
   

    const handleControlsUpdate = () => {
      console.log("hi");
      setIsModelRendered(true);
    };
    return (
      <>
        <ambientLight />
        <Model />
        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.5}
          target={[0, 0, 0]}
          onUpdate={handleControlsUpdate} 
        />
      </>
    );
  }



export default CanvasComponent;
