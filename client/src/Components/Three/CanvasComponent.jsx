
import React, { useRef} from "react";
import { OrbitControls } from "@react-three/drei";
import Model from "../../../public/Route_66_adventure_-_sketchfab_challenge";
import * as THREE from 'three';

const CanvasComponent = ({ zoom }) => {
    const controls = useRef();
    const target = new THREE.Vector3();
  
    return (
      <>
        <ambientLight />
        <Model />
        <OrbitControls
          ref={controls}
          enableZoom={false}
          enablePan={true}
          enableRotate={!zoom}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.5}
          target={[0, 0, 0]}
        />
      </>
    );
  }



export default CanvasComponent;
