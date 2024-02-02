import React ,{useRef}from 'react'
import { OrbitControls } from '@react-three/drei'
import { Canvas} from "@react-three/fiber";
import Van from '../../../public/Com_van';


// export default function Index() {
//   const pos = {x: 0, y: 0, z: 6}
//   return (
//     <Canvas shadows camera={{ position: [pos.x, pos.y, pos.z] }}>
//       <color attach="background" args={["#ececec"]} />
//       <Experience />
//     </Canvas>
//   );
// }
// const Experience = () => {
//   const controlsRef = useRef();

//   // Log camera position whenever controls change
//   const handleControlsChange = () => {
//     console.log('Camera Position:', controlsRef.current.object.position);
//   };
//   return (
//     <>
//       <OrbitControls ref={controlsRef} onChange={handleControlsChange}/>
//       <ambientLight intensity={1}/>
//       <directionalLight position={[5,5,5]} castShadow color={"#9e69da"}/>
//       <Van position={[0,0,0]} rotation={[0, 0, 0]}/>
//     </>
//   );
// };