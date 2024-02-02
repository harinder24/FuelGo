import React, { } from "react";
import LandingPage from "./Screen/LandingPage";
import Login from "./Screen/Login";
import Signup from "./Screen/Signup";
import ForgetPassword from "./Screen/ForgetPassword";
import ChangePassWord from "./Screen/ChangePassWord";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error from "./Screen/Error";
import Home from "./Screen/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },

  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPassword/>,
  },
  {
    path: "/changepassword/:id",
    element: <ChangePassWord/>,
  },
  {
    path: "/error",
    element: <Error/>,
  },
  {
    path: "/home",
    element: <Home/>,
  },
]);

function App() {

  return (
 
    <RouterProvider router={router} />
  );
}


export default App;


// import React, { Suspense, useRef } from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Model from "../public/Route_66_adventure_-_sketchfab_challenge";

// function App() {
//   const controls = useRef();

//   const handleCameraUpdate = () => {
//     if (controls.current) {
//       const position = controls.current.object.position;
//       console.log("Camera Position:", position);
//     }
//   };

//   return (
//     <div className="w-screen h-screen flex justify-center items-center">
//       <Canvas className="h-full w-full" camera={{ position: [3.422061460869188, 5.315856452720275, 10.150449432123484] }}>
//         <Suspense fallback={null}>
//           <ambientLight />
//           <Model />
//         </Suspense>
//         <OrbitControls
//           ref={controls}
//           enableZoom={true}
//           enablePan={false}
//           enableRotate={true}
//           zoomSpeed={0.5}
//           panSpeed={0.5}
//           rotateSpeed={0.5}
//           target={[0, 0, 0]}
//           onChange={handleCameraUpdate}
//         />
//       </Canvas>
//     </div>
//   );
// }

// export default App;


