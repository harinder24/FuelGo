import {
  Color,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AxesHelper,
  BufferGeometry,
  BufferAttribute,
  Points,
  ShaderMaterial,
  Vector2,
  Vector3,
  CanvasTexture,
  AmbientLight,
  Clock,
  Group,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Stats from "stats-js";
import LoaderManager from "./LoaderManager";
import GUI from "lil-gui";
import vertexShader from "./glsl/main.vert";
import fragmentShader from "./glsl/main.frag";
import { randFloat } from "three/src/math/MathUtils";
import gsap from "gsap/gsap-core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
export default class MainScene {
  #canvas;
  #renderer;
  #scene;
  #camera;
  #controls;
  #stats;
  #width;
  #height;
  #loadingScreen;
  #texture;
  container;
  mesh;

  #guiObj = {
    progress: 0,
    showTitle: true,
    frequency: 0.125,
  };

  constructor() {
    if (document.querySelector("canvas")) {
      this.#canvas = document.querySelector(".scene");
    } else {
      const root = document.getElementById("root");
      const can = document.createElement("canvas");
      can.classList.add("scene");

      root.appendChild(can);
      can.classList.add("scene");
      this.#canvas = document.querySelector(".scene");
    }
    if(!this.glb){
       this.#loadingScreen = document.createElement('div');
       this.#loadingScreen.classList = 'landing-loading-screen w-screen h-screen bg-lightMode-bg dark:bg-darkMode-bg absolute top-0 z-50';
       this.#loadingScreen.innerHTML = `
      <div class="w-full h-full flex justify-center items-center">
        <div class="loadingScreen">
          <div class="loadingScreenline"></div>
          <div class="loadingScreenline"></div>
          <div class="loadingScreenline"></div>
        </div>

    </div>
    `
    document.getElementById('root').appendChild(this.#loadingScreen);
    }
    this.init();
  }

  init = async () => {
    // Preload assets before initiating the scene
    const assets = [
      {
        name: "image",
        texture: "../../../public/aboutus1.png",
      },
    ];

    await LoaderManager.load(assets);
    this.#texture = LoaderManager.assets["image"].texture;
    //   this.setStats()
    //   this.setGUI()
    this.isAbout = false;
    this.setScene();
    this.setRender();
    this.setCamera();
    this.setControls();
    this.setAxesHelper();
     this.loadGLBModel();
    // this.setParticlesGrid()

    this.handleResize();

    // start RAF
    this.events();
  };

  goBack() {
    this.#controls.enableRotate = true;
    this.isAbout = false;
    this.#scene.remove(this.container);
    this.glb.scale.set(8, 8, 8);
  }

  loadGLBModel() {
    const loader = new GLTFLoader();
    loader.load(
      "../../../public/route_66_adventure_-_sketchfab_challenge.glb",
      (glb) => {
        this.glb = glb.scene;
        this.glb.scale.set(8, 8, 8);
        this.glb.rotateX(0.3);
        this.#scene.add(this.glb);
        const root = document.getElementById("root");
        this.#loadingScreen.remove();
        const clock = new Clock();

        // Render loop for continuous rotation
        const render = () => {
          const delta = clock.getDelta(); // Get the time elapsed since the last frame

          // Update rotation of the model around the Y-axis
          this.glb.rotation.y += delta * 0.03; // Adjust the rotation speed as needed

          // Render the scene
          this.#renderer.render(this.#scene, this.#camera);

          // Request next frame
          requestAnimationFrame(render);
        };

        // Start the render loop
        render();
      }
    );
  }

  async aboutUs() {
    this.#controls.enableRotate = false;
    this.container = new Group();
    this.container.position.set(0, 0, 10);
    this.#scene.add(this.container);
    this.glb.scale.set(0.001, 0.001, 0.001);
    const assets = [
      {
        name: "image",
        texture: "../../../public/aboutus1.png",
      },
    ];

    await LoaderManager.load(assets);
    this.#texture = LoaderManager.assets["image"].texture;
    this.setParticlesGrid();
    this.isAbout = true;
  }
  setRender() {
    this.#renderer = new WebGLRenderer({
      canvas: this.#canvas,
      antialias: true,
    });
  }

  async changeImg(num) {
    const t = this.#texture;

    await gsap.fromTo(
      this.material.uniforms.uProgress,
      {
        value: 1,
      },
      {
        value: 0,
        duration: 2.5,
        ease: "Power4.easeOut",
      }
    );
    if (num === 1) {
      const assets = [
        {
          name: "image",
          texture: "../../../public/aboutus1.png",
        },
      ];

      await LoaderManager.load(assets);
      this.#texture = LoaderManager.assets["image"].texture;
    } else if (num === 2) {
      const assets = [
        {
          name: "image",
          texture: "../../../public/aboutus2.png",
        },
      ];

      await LoaderManager.load(assets);
      this.#texture = LoaderManager.assets["image"].texture;
    } else if (num === 3) {
      const assets = [
        {
          name: "image",
          texture: "../../../public/aboutus3.png",
        },
      ];

      await LoaderManager.load(assets);
      this.#texture = LoaderManager.assets["image"].texture;
    }
    // const tex = this.#texture
    // this.material.uniforms.uTexture = tex
    this.container.remove(this.mesh);
    this.setParticlesGrid();
  }

  /**
   * This is our scene, we'll add any object
   * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
   */
  setScene() {
    this.#scene = new Scene();
    const gradientTexture = new CanvasTexture(this.createGradientCanvas());
    this.#scene.background = gradientTexture;
  }

  createGradientCanvas() {
    const canvas = document.createElement("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, canvas.width, 0, 0);
    gradient.addColorStop(0.5, "#ffffff"); // Red
    gradient.addColorStop(1, "rgb(14,164,233)"); // Cyan

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
  }
  /**
   * Our Perspective camera, this is the point of view that we'll have
   * of our scene.
   * A perscpective camera is mimicing the human eyes so something far we'll
   * look smaller than something close
   * https://threejs.org/docs/?q=pers#api/en/cameras/PerspectiveCamera
   */
  setCamera() {
    const aspectRatio = this.#width / this.#height;
    const fieldOfView = 60;
    const nearPlane = 0.1;
    const farPlane = 10000;

    this.#camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.#camera.position.y = 0;
    this.#camera.position.x = 0;
    this.#camera.position.z = 250;

    const target = new Vector3(0, 0, 0); // Adjust target position as needed
    this.#camera.lookAt(target);

    const ambientLight = new AmbientLight(0xffffff, 1); // Color: white, Intensity: 0.5

    this.#scene.add(ambientLight);
    this.#scene.add(this.#camera);
  }

  /**
   * Threejs controls to have controls on our scene
   * https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls
   */
  setControls() {
    this.#controls = new OrbitControls(this.#camera, this.#renderer.domElement);
    // this.#controls.enableDamping = true;
    this.#controls.enableZoom = false;

    // Disable rotating
    this.#controls.enableRotate = true;

    // Enable damping (smoothly decelerates motion)
    this.#controls.enableDamping = true;
  }

  /**
   * Axes Helper
   * https://threejs.org/docs/?q=Axesh#api/en/helpers/AxesHelper
   */
  setAxesHelper() {
    // const axesHelper = new AxesHelper(3);
    // this.#scene.add(axesHelper);
  }

  setParticlesGrid() {
    const geometry = new BufferGeometry();
    const multiplier = 18;
    const nbColums = 16 * multiplier;
    const nbLines = 9 * multiplier;
    const vertices = [];
    const initPositions = [];
    let mouseXY = new Vector3();
    document.addEventListener("mousemove", onMouseEnter);
    function onMouseEnter(event) {
      if (event.isPrimary === false) return;

      let mouseX = event.clientX - window.innerWidth;
      let mouseY = event.clientY - window.innerHeight;
      mouseXY = new Vector3(
        (0.5 * mouseX) / window.innerWidth,
        (-0.5 * mouseY) / window.innerHeight,
        0
      );
    }
    for (let i = 0; i < nbColums; i++) {
      for (let y = 0; y < nbLines; y++) {
        const point = [i, y, 0];
        const initPoint = [
          i - nbColums / 2,
          y - nbLines / 2,
          randFloat(10, 100),
        ];
        vertices.push(...point);
        initPositions.push(...initPoint);
      }
    }

    const vertices32 = new Float32Array(vertices);
    const initPositions32 = new Float32Array(initPositions);
    geometry.setAttribute("position", new BufferAttribute(vertices32, 3));
    geometry.setAttribute(
      "initPosition",
      new BufferAttribute(initPositions32, 3)
    );
    geometry.center();
    const material = new ShaderMaterial({
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      uniforms: {
        uPointSize: { value: 8 },
        uTexture: { value: this.#texture },
        uNbLines: { value: nbLines },
        uNbColumns: { value: nbColums },
        uProgress: { value: this.#guiObj.progress },
        uFrequency: { value: 0.125 },
        uTime: { value: 0 },
        uMouseXY: { value: mouseXY },
      },
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    this.mesh = new Points(geometry, material);
    this.mesh.position.set(0, 0, 0);
    this.material = material;
    this.container.add(this.mesh);

    gsap.fromTo(
      this.material.uniforms.uProgress,
      {
        value: 0,
      },
      {
        value: 1,
        duration: 2.5,
        ease: "Power4.easeOut",
      }
    );
  }

  /**
   * Build stats to display fps
   */
  // setStats() {
  //   this.#stats = new Stats()
  //   this.#stats.showPanel(0)
  //   document.body.appendChild(this.#stats.dom)
  // }

  // setGUI() {

  //   const titleEl = document.querySelector('.main-title')

  //   const gui = new GUI()
  //   gui.add(this.#guiObj, 'progress', 0, 1).onChange(() => {
  //     this.material.uniforms.uProgress.value = this.#guiObj.progress
  //   })
  //   gui.add(this.#guiObj, 'frequency', 0, 1).onChange(() => {
  //     this.material.uniforms.uFrequency.value = this.#guiObj.frequency
  //   })
  // }
  /**
   * List of events
   */
  events() {
    window.addEventListener("resize", this.handleResize, { passive: true });
    this.draw(0);
  }

  // EVENTS

  /**
   * Request animation frame function
   * This function is called 60/time per seconds with no performance issue
   * Everything that happens in the scene is drawed here
   * @param {Number} now
   */
  draw = (time) => {
    // now: time in ms
    //   this.#stats.begin()

    if (this.#controls) this.#controls.update(); // for damping
    this.#renderer.render(this.#scene, this.#camera);
    if (this.isAbout) {
      this.material.uniforms.uTime.value = time / 1000;
    }

    //   this.#stats.end()
    this.raf = window.requestAnimationFrame(this.draw);
  };

  /**
   * On resize, we need to adapt our camera based
   * on the new window width and height and the renderer
   */
  handleResize = () => {
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;

    // Update camera
    this.#camera.aspect = this.#width / this.#height;
    this.#camera.updateProjectionMatrix();
    if (this.isAbout) {
      if (this.#width > 800) {
        this.#camera.position.y = 0;
        this.#camera.position.x = 70;
        this.#camera.position.z = 250;
      }
      if (this.#width < 800) {
        this.#camera.position.z = 350;
        this.#camera.position.x = 100;
      }
      if (this.#width < 530) {
        this.#camera.position.z = 450;
        this.#camera.position.x = 150;
      }
      if (this.#width < 400) {
        this.#camera.position.z = 550;
        this.#camera.position.x = 250;
      }
    } else {
      if (this.#width > 530) {
        this.#camera.position.y = 0;
        this.#camera.position.x = 70;
        this.#camera.position.z = 250;
      }
      if (this.#width < 530) {
        this.#camera.position.z = 350;
        this.#camera.position.x = 100;
      }
    }
    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1;

    this.#renderer.setPixelRatio(DPR);
    this.#renderer.setSize(this.#width, this.#height);
  };
}
