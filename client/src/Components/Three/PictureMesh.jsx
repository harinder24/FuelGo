// import {
//   Color,
//   WebGLRenderer,
//   Scene,
//   PerspectiveCamera,
//   AxesHelper,
//   BufferGeometry,
//   BufferAttribute,
//   Points,
//   ShaderMaterial,
//   Vector2,
//   Vector3,
//   CanvasTexture,
//   AmbientLight,
//   Clock,
// } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import Stats from "stats-js";
// import LoaderManager from "./LoaderManager";
// import GUI from "lil-gui";
// import vertexShader from "./glsl/main.vert";
// import fragmentShader from "./glsl/main.frag";
// import { randFloat } from "three/src/math/MathUtils";
// import gsap from "gsap/gsap-core";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// export default class MainScene {
//   #canvas;
//   #renderer;
//   #scene;
//   #camera;
//   #controls;
//   #stats;
//   #width;
//   #height;
//   #loadingScreen
//   #texture;
//   #guiObj = {
//     progress: 0,
//     showTitle: true,
//     frequency: 0.125,
//   };

//   constructor() {
//     if (document.querySelector("canvas")) {
      
//       this.#canvas = document.querySelector(".scene");
//     } else {
//       const root = document.getElementById("root");
//       const can = document.createElement("canvas");
//       can.classList.add("scene");

//       root.appendChild(can);
//       can.classList.add("scene");
//       this.#canvas = document.querySelector(".scene");
//     }
//     if(!this.glb){
//        this.#loadingScreen = document.createElement('div');
//        this.#loadingScreen.classList = 'landing-loading-screen w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg absolute top-0 z-50';
//        this.#loadingScreen.innerHTML = `
//       <div class="w-full h-full flex justify-center items-center">
//         <div class="loadingScreen">
//           <div class="loadingScreenline"></div>
//           <div class="loadingScreenline"></div>
//           <div class="loadingScreenline"></div>
//         </div>
     
//     </div>
//     `
//     document.getElementById('root').appendChild(this.#loadingScreen);
//     }
//     this.init();
//   }

//   init = async () => {
//     // Preload assets before initiating the scene
//     const assets = [
//       {
//         name: "image",
//         texture: "../../../public/aboutus1.png",
//       },
//     ];

//     await LoaderManager.load(assets);
//     this.#texture = LoaderManager.assets["image"].texture
//     //   this.setStats()
//     //   this.setGUI()
//     this.isAbout = false
//     this.setScene();
//     this.setRender();
//     this.setCamera();
//     this.setControls();
//     this.setAxesHelper();
//     this.loadGLBModel();
//   // this.setParticlesGrid()

//     this.handleResize();

//     // start RAF
//     this.events();
//   };

 

//   loadGLBModel() {
//     const loader = new GLTFLoader();
//     loader.load(
//       "../../../public/route_66_adventure_-_sketchfab_challenge.glb",
//       (glb) => {
//         this.glb = glb.scene;
//         this.glb.scale.set(8, 8, 8);
//         this.glb.rotateX(0.3);
//         this.#scene.add(this.glb);
//         const root = document.getElementById("root");
//         this.#loadingScreen.remove()
//         const clock = new Clock();
      
//         // Render loop for continuous rotation
//         const render = () => {
//           const delta = clock.getDelta(); // Get the time elapsed since the last frame

//           // Update rotation of the model around the Y-axis
//           this.glb.rotation.y += delta * 0.03; // Adjust the rotation speed as needed

//           // Render the scene
//           this.#renderer.render(this.#scene, this.#camera);

//           // Request next frame
//           requestAnimationFrame(render);
//         };

//         // Start the render loop
//         render();
//       }
//     );
//     // loader.load(
//     //     '../../../public/route_66_adventure_-_sketchfab_challenge.glb',
//     //     (gltf) => {
//     //         // Add the loaded model to the scene
//     //         gltf.scene.position.set(0, 0, 0);
//     //         this.#scene.add(gltf.scene);

//     //         // Optionally manipulate the loaded model

//     //     },
//     //     (xhr) => {
//     //         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//     //     },
//     //     (error) => {
//     //         console.error('Error loading GLB model', error);
//     //     }
//     // );
//   }
//   /**
//    * Our Webgl renderer, an object that will draw everything in our canvas
//    * https://threejs.org/docs/?q=rend#api/en/renderers/WebGLRenderer
//    */
//   aboutUs() {
//     this.isAbout = true
//     this.glb.scale.set(0.1,0.1,0.1)
//     this.setParticlesGrid();
//   }
//   setRender() {
//     this.#renderer = new WebGLRenderer({
//       canvas: this.#canvas,
//       antialias: true,
//     });
//   }

//   async changeImg(num) {
//     await gsap.fromTo(
//       this.material.uniforms.uProgress,
//       {
//         value: 1,
//       },
//       {
//         value: 0,
//         duration: 2.5,
//         ease: "Power4.easeOut",
//       }
//     )
//     if(num === 1){
//       const assets = [
//         {
//           name: "image",
//           texture: "../../../public/aboutus1.png",
//         },
//       ];
  
//       await LoaderManager.load(assets);
//       this.#texture = LoaderManager.assets["image"].texture
//     }else if(num === 2){
//       const assets = [
//         {
//           name: "image",
//           texture: "../../../public/aboutus2.png",
//         },
//       ];
  
//       await LoaderManager.load(assets);
//       this.#texture = LoaderManager.assets["image"].texture
//     }else if(num === 3){
//       const assets = [
//         {
//           name: "image",
//           texture: "../../../public/aboutus3.png",
//         },
//       ];
  
//       await LoaderManager.load(assets);
//       this.#texture = LoaderManager.assets["image"].texture
//     }
//     gsap.fromTo(
//       this.material.uniforms.uProgress,
//       {
//         value: 0,
//       },
//       {
//         value: 1,
//         duration: 2.5,
//         ease: "Power4.easeOut",
//       }
//     );

//   }

//   /**
//    * This is our scene, we'll add any object
//    * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
//    */
//   setScene() {
//     this.#scene = new Scene();
//     const gradientTexture = new CanvasTexture(this.createGradientCanvas());
//     this.#scene.background = gradientTexture;
//   }

//   createGradientCanvas() {
//     const canvas = document.createElement("canvas");
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     const ctx = canvas.getContext("2d");

//     const gradient = ctx.createLinearGradient(0, canvas.width, 0, 0);
//     gradient.addColorStop(0.5, "#ffffff"); // Red
//     gradient.addColorStop(1, "#00d4ff"); // Cyan

//     ctx.fillStyle = gradient;
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     return canvas;
//   }
//   /**
//    * Our Perspective camera, this is the point of view that we'll have
//    * of our scene.
//    * A perscpective camera is mimicing the human eyes so something far we'll
//    * look smaller than something close
//    * https://threejs.org/docs/?q=pers#api/en/cameras/PerspectiveCamera
//    */
//   setCamera() {
//     const aspectRatio = this.#width / this.#height;
//     const fieldOfView = 60;
//     const nearPlane = 0.1;
//     const farPlane = 10000;

//     this.#camera = new PerspectiveCamera(
//       fieldOfView,
//       aspectRatio,
//       nearPlane,
//       farPlane
//     );
//     this.#camera.position.y = 0;
//     this.#camera.position.x = 0;
//     this.#camera.position.z = 250;

//     const target = new Vector3(0, 0, 0); // Adjust target position as needed
//     this.#camera.lookAt(target);

//     const ambientLight = new AmbientLight(0xffffff, 1); // Color: white, Intensity: 0.5

//     this.#scene.add(ambientLight);
//     this.#scene.add(this.#camera);
//   }

//   /**
//    * Threejs controls to have controls on our scene
//    * https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls
//    */
//   setControls() {
//     this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
//     // this.#controls.enableDamping = true;
//     this.#controls.enableZoom = false;

//     // Disable rotating
//     this.#controls.enableRotate = false;

//     // Enable damping (smoothly decelerates motion)
//     this.#controls.enableDamping = true;
//   }

//   /**
//    * Axes Helper
//    * https://threejs.org/docs/?q=Axesh#api/en/helpers/AxesHelper
//    */
//   setAxesHelper() {
//     // const axesHelper = new AxesHelper(3);
//     // this.#scene.add(axesHelper);
//   }

//   setParticlesGrid() {
//     const geometry = new BufferGeometry();
//     const multiplier = 18;
//     const nbColums = 16 * multiplier;
//     const nbLines = 9 * multiplier;
//     const vertices = [];
//     const initPositions = [];
//     let mouseXY = new Vector3();
//     document.addEventListener("mousemove", onMouseEnter);
//     function onMouseEnter(event) {
//       if (event.isPrimary === false) return;

//       let mouseX = event.clientX - window.innerWidth;
//       let mouseY = event.clientY - window.innerHeight;
//       mouseXY = new Vector3(
//         (0.5 * mouseX) / window.innerWidth,
//         (-0.5 * mouseY) / window.innerHeight,
//         0
//       );
//     }
//     for (let i = 0; i < nbColums; i++) {
//       for (let y = 0; y < nbLines; y++) {
//         const point = [i, y, 0];
//         const initPoint = [
//           i - nbColums / 2,
//           y - nbLines / 2,
//           randFloat(10, 100),
//         ];
//         vertices.push(...point);
//         initPositions.push(...initPoint);
//       }
//     }

//     const vertices32 = new Float32Array(vertices);
//     const initPositions32 = new Float32Array(initPositions);
//     geometry.setAttribute("position", new BufferAttribute(vertices32, 3));
//     geometry.setAttribute(
//       "initPosition",
//       new BufferAttribute(initPositions32, 3)
//     );
//     geometry.center();
//     const material = new ShaderMaterial({
//       fragmentShader: fragmentShader,
//       vertexShader: vertexShader,
//       uniforms: {
//         uPointSize: { value: 8 },
//         uTexture: { value: this.#texture },
//         uNbLines: { value: nbLines },
//         uNbColumns: { value: nbColums },
//         uProgress: { value: this.#guiObj.progress },
//         uFrequency: { value: 0.125 },
//         uTime: { value: 0 },
//         uMouseXY: { value: mouseXY },
//       },
//       transparent: true,
//       depthTest: false,
//       depthWrite: false,
//     });
//     const mesh = new Points(geometry, material);
//     mesh.position.set(0, 0, 10);
//     this.material = material;
//     this.#scene.add(mesh);
//     console.log();
//     gsap.fromTo(
//       this.material.uniforms.uProgress,
//       {
//         value: 0,
//       },
//       {
//         value: 1,
//         duration: 2.5,
//         ease: "Power4.easeOut",
//       }
//     );
//   }

//   /**
//    * Build stats to display fps
//    */
//   // setStats() {
//   //   this.#stats = new Stats()
//   //   this.#stats.showPanel(0)
//   //   document.body.appendChild(this.#stats.dom)
//   // }

//   // setGUI() {

//   //   const titleEl = document.querySelector('.main-title')

//   //   const gui = new GUI()
//   //   gui.add(this.#guiObj, 'progress', 0, 1).onChange(() => {
//   //     this.material.uniforms.uProgress.value = this.#guiObj.progress
//   //   })
//   //   gui.add(this.#guiObj, 'frequency', 0, 1).onChange(() => {
//   //     this.material.uniforms.uFrequency.value = this.#guiObj.frequency
//   //   })
//   // }
//   /**
//    * List of events
//    */
//   events() {
//     window.addEventListener("resize", this.handleResize, { passive: true });
//     this.draw(0);
//   }

//   // EVENTS

//   /**
//    * Request animation frame function
//    * This function is called 60/time per seconds with no performance issue
//    * Everything that happens in the scene is drawed here
//    * @param {Number} now
//    */
//   draw = (time) => {
//     // now: time in ms
//     //   this.#stats.begin()

//     if (this.#controls) this.#controls.update(); // for damping
//     this.#renderer.render(this.#scene, this.#camera);
// if(this.isAbout){
//   this.material.uniforms.uTime.value = time / 1000
// }


//     //   this.#stats.end()
//     this.raf = window.requestAnimationFrame(this.draw);
//   };

//   /**
//    * On resize, we need to adapt our camera based
//    * on the new window width and height and the renderer
//    */
//   handleResize = () => {
//     this.#width = window.innerWidth;
//     this.#height = window.innerHeight;

//     // Update camera
//     this.#camera.aspect = this.#width / this.#height;
//     this.#camera.updateProjectionMatrix();
//     if(this.isAbout){
//       if (this.#width > 800) {
//         this.#camera.position.y = 0;
//         this.#camera.position.x = 70;
//         this.#camera.position.z = 250;
//       }
//       if (this.#width < 800) {
//         this.#camera.position.z = 350;
//         this.#camera.position.x = 100;
//       }
//       if (this.#width < 530) {
//         this.#camera.position.z = 450;
//         this.#camera.position.x = 150;
//       }
//       if (this.#width < 400) {
//         this.#camera.position.z = 550;
//         this.#camera.position.x = 250;
//       }
//     }else{
     
//       if(this.#width > 530){
//         this.#camera.position.y = 0;
//         this.#camera.position.x = 70;
//         this.#camera.position.z = 250;
//       }
//       if (this.#width < 530) {
//         this.#camera.position.z = 350;
//         this.#camera.position.x = 100;
//       }
  
//   }
//     const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;

//     this.#renderer.setPixelRatio(DPR);
//     this.#renderer.setSize(this.#width, this.#height);
//   };
// }
// import React, { useState, useEffect, useRef } from "react";
// import Background from "../Components/Three/Background";

// import { NavLanding } from "../Components/Nav";
// import { useNavigate } from "react-router-dom";
// import AutocompleteComponent from "../Components/AutocompleteComponent";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
//  import MainScene from "../Components/Three/scene";
//  import ArrowBackIcon from '@mui/icons-material/ArrowBack';
//  import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
//  import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
//  export default function LandingPage() {
//   const mainSceneRef = useRef(null);
//   const navigate = useNavigate();
//   const [isModelRended, setIsModelRendered] = useState(false);
//   const [isAboutUsActive, setIsAboutUsActive] = useState(false)
//   const [isAboutNum, setIsAboutNum] = useState(1)
//   useEffect(() => {
  
//     const mainScene = new MainScene();
//     mainSceneRef.current = mainScene;

//     // Perform any communication or setup with MainScene here
//     // For example:
//     // mainScene.someMethod();

//     return () => {
//       // Clean up any resources if needed
     
//       mainSceneRef.current = null;
//     };
//   }, []);

//   const handleButtonClick = () => {
//     // Example: Trigger a method in MainScene when the button is clicked
//     setIsAboutUsActive(true)
//     if (mainSceneRef.current) {
//       mainSceneRef.current.aboutUs();
//     }
//   };
//   // const decreseNum = () => {
//   //   // Example: Trigger a method in MainScene when the button is clicked
//   //   setIsAboutNum(isAboutNum - 1)
//   //   if (mainSceneRef.current) {
//   //     mainSceneRef.current.changeImg(isAboutNum)
//   //   }
//   // };
//   // const increaseNum = () => {
//   //   // Example: Trigger a method in MainScene when the button is clicked
//   //   setIsAboutUsActive(true)
//   //   if (mainSceneRef.current) {
//   //     mainSceneRef.current.changeImg(isAboutNum)
//   //   }
//   // };
//   // if(!isModelRended){
//   //   return(
//   //     <>
//   //     <div className="w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg flex justify-center items-center">

//   //     </div>
//   //     </>
//   //   )
//   // }

//   return (
//     <div className=" w-screen h-screen absolute top-0 z-40">
//     <div className="w-screen h-screen relative overflow-hidden">
//       {/* {!isModelRended && (
//         <div className="w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg absolute top-0 z-50">
//           <div className="w-full h-full flex justify-center items-center">
//             <div className="loadingScreen">
//               <div className="loadingScreenline"></div>
//               <div className="loadingScreenline"></div>
//               <div className="loadingScreenline"></div>
//             </div>
//           </div>
//         </div>
//       )} */}

//         {/* left-[1368px] 
//       max-[1484px]:right-4 max-[1484px]:left-auto */}
//       {/* <Background isAboutUsActive={isAboutUsActive} setIsModelRendered={setIsModelRendered} /> */}
//       {!isAboutUsActive ? <>
//       <div className="absolute top-0 right-0 w-screen h-[54px]">
//         <NavLanding />
//       </div>
//       <div  className="absolute bottom-6
//         right-[calc((100vw-1368px)/2)] max-[1384px]:right-4 
//        font-[300] text-transparent text-xl z-[10]">
//  <div onClick={handleButtonClick} className=" cursor-pointer">About us</div>
//       </div>
//       <div  className="absolute bottom-6
//         right-[calc((100vw-1368px)/2)] max-[1384px]:right-4 
//        font-[300] text-xl text-lightMode-button ">
//         <div className="relative">
//           <div >About us</div>
//         <div className=" absolute bottom-[-4px] w-full h-[2px] bg-lightMode-button  "></div>
//         <div className="w-full flex flex-row justify-center"><div className=" absolute bottom-[-5px] h-1 w-2 rounded-full bg-white animate-move"></div></div>
        
//         </div>
           
//         </div>
//       <div className=" absolute bottom-20 left-[75px] overflow-hidden bg-black w-[550px] h-[250px] blur-[200px] max-[680px]:w-[calc(100vw-16px)] px-4 max-[680px]:left-0 max-[680px]:bottom-[30px]"></div>
//       <div className=" absolute bottom-[150px]   max-[630px]:w-[calc(100vw-16px)] pr-4  left-[calc((100vw-1368px)/2)] max-[1384px]:left-4  max-[680px]:bottom-[100px]">
//         <div></div>
//         <div className="flex flex-col ">
          
//           <div className=" text-4xl font-bold text-white max-[370px]:text-2xl">
//             Gas station near you
//             {/* <span className=" text-lightMode-button">started</span> */}
//           </div>
//           <div className="flex flex-row w-[550px] max-[680px]:w-full my-4">
//             <div className="flex-1 relative">
//               <div className="h-10 flex-1 bg-white rounded-sm">
//                 <AutocompleteComponent />
//               </div>
//               <div className="absolute top-[5px] right-[2px] cursor-pointer bg-white ">
//                 <LocationOnIcon />
//               </div>
//             </div>
//             <div className="h-10  ml-4  bg-lightMode-button flex items-center justify-center rounded-sm cursor-pointer transform hover:translate-y-[-4px] transition duration-300">
//               <div className="px-2 font-semibold text-white">Search</div>
//             </div>
//           </div>
//           {/* <div className=" text-white font-medium text-sm">
//             Or{" "}
//             <span
//               onClick={() => navigate("/login")}
//               className="text-lightMode-button cursor-pointer"
//             >
//               Log in
//             </span>
//           </div> */}
//         </div>
//       </div>
//       </>: 
      
// //       <div className="w-full h-full absolute top-0 z-[10]">
// //         <div className="w-full h-full relative">
// //          <div className=" absolute top-4 left-[75px] overflow-hidden    px-4 max-[680px]:left-0">
// //        <div className="hover:scale-105 rounded-full cursor-pointer">
// //           <ArrowBackIcon  sx={{ color: "rgb(255,255,255)",  fontSize: "50px" }}/></div>
// //          </div>
// //          <div className="w-full h-full flex flex-col justify-between items-center  py-[60px]">
// //           {isAboutNum !== 1 && <div onClick={decreseNum} className=" p-2 rounded-full border-4 border-[rgb(255,255,255)] cursor-pointer hover:bg-white  text-[rgb(255,255,255)] hover:text-[rgb(14,165,233)] hover:scale-105">
// //           <KeyboardArrowUpIcon sx={{   fontSize: "50px" }}/> 
// //           </div>}
          
// //           <div className="flex-1 ">

// //           </div>
// //           {isAboutNum !== 3 && 
// //           <div onClick={increaseNum} className=" p-2 rounded-full border-4 border-[rgb(14,165,233)]  hover:bg-[rgb(14,165,233)]  text-[rgb(14,165,233)] hover:text-[rgb(255,255,255)] cursor-pointer hover:scale-105">
// //           <KeyboardArrowDownIcon sx={{  fontSize: "50px" }}/> 
// //           </div>
// //  }
// //          </div>
// //             <div className="w-full h-full ">

// //             </div>
// //             </div>
// //         </div>
// <></>
//         }
//     </div>
//     </div>
//   );
// }

