import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import * as THREE from 'three';
import CameraControls from 'camera-controls';
CameraControls.install({ THREE });

function Controls({ }) {
  const { camera, gl } = useThree();
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [camera, gl]);
  const originalRotationY = useRef(0); // Store the original rotation around y-axis
const x = controls.camera.position.x
controls.zoom = false;
  useFrame(() => {
    controls.rotate(0.001, 0, 0); // Adjust rotation speed as needed
    controls.update();
    // if(zoom){
    //   zoom ? pos.set(focus.x + 0.5, focus.y + 0.5, focus.z + 0.5) : pos.set(3.422061460869188, 5.315856452720275, 10.150449432123484);
    //   zoom ? look.set(focus.x - anglex, focus.y -angley , focus.z - 0.5) : look.set(3.422061460869188, 5.315856452720275, 10.150449432123484);
  
    //   state.camera.position.lerp(pos, 0.5)
    //   state.camera.updateProjectionMatrix()
  
    //   controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    //   return controls.update(delta)
    // }
  });

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

  return null;
}

export default Controls;



