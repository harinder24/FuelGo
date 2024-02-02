import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import * as THREE from 'three';
import CameraControls from 'camera-controls';
CameraControls.install({ THREE });

function Controls({isAboutUsActive,pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
// const focus = {x:6.07, y:0.6, z:-2.2}
//3.062270448066928, 4.767485910554483,  23.6
const focus = {x:-0.5, y:14.767485910554483, z:40.6}
  useFrame((state, delta) => {
  
    if(!isAboutUsActive){
      // controls.rotate(0.0003, 0, 0); 
      // controls.update();
     
    }else{
      // controls.enabled = false;
      
      pos.set(focus.x + 0.5, focus.y + 0.5, focus.z + 0.5)
      look.set(focus.x + 0.5, focus.y + 0.5 , focus.z ) 
      state.camera.position.lerp(pos, 0.5)
      state.camera.updateProjectionMatrix()
      
      controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
      return controls.update(delta)
    }

  
  });

  return null;
}

export default Controls;



  // if(zoom){
    //   zoom ? pos.set(focus.x + 0.5, focus.y + 0.5, focus.z + 0.5) : pos.set(3.422061460869188, 5.315856452720275, 10.150449432123484);
    //   zoom ? look.set(focus.x - anglex, focus.y -angley , focus.z - 0.5) : look.set(3.422061460869188, 5.315856452720275, 10.150449432123484);
  
    //   state.camera.position.lerp(pos, 0.5)
    //   state.camera.updateProjectionMatrix()
  
    //   controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    //   return controls.update(delta)
    // }
    
  // const handleUserInteraction = () => {
  //   // Reset rotation around y-axis when user interacts with the camera
  //   const polarAngle = controls.getPolarAngle();
  //   controls.rotate(0, originalRotationY.current - polarAngle, 0);
  //   originalRotationY.current = polarAngle;
  //   controls.update();
  // };

  // // Attach event listeners for user interactions
  // controls.addEventListener("controlstart", handleUserInteraction);
  // controls.addEventListener("controlend", handleUserInteraction);
