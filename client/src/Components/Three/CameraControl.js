import {  useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";

import * as THREE from 'three';
import CameraControls from 'camera-controls';
CameraControls.install({ THREE });
function Controls({ zoom, focus, anglex,angley, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
    const camera = useThree((state) => state.camera)
    const gl = useThree((state) => state.gl)
    const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  
    return useFrame((state, delta) => {
      if(zoom){
        zoom ? pos.set(focus.x + 0.5, focus.y + 0.5, focus.z + 0.5) : pos.set(3.422061460869188, 5.315856452720275, 10.150449432123484);
        zoom ? look.set(focus.x - anglex, focus.y -angley , focus.z - 0.5) : look.set(3.422061460869188, 5.315856452720275, 10.150449432123484);
  
        state.camera.position.lerp(pos, 0.5)
        state.camera.updateProjectionMatrix()
  
        controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
        return controls.update(delta)
      }
      return null
    })
  }

  export default Controls