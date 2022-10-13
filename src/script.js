import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  wireframe: true,
});

// Mesh 1
const geometry = new THREE.TorusGeometry(10, 1, 10, 100);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Mesh 2
const geometry2 = new THREE.OctahedronGeometry(3, 6, 6, 8, 8, 8);
const mesh2 = new THREE.Mesh(geometry2, material);
scene.add(mesh2);

// Drawing triangles
const geometry4 = new THREE.BufferGeometry();
const count = 500;
// each triangle with 3 vertices each with 3 values, hence *3 *3
const positionsArray = new Float32Array(count * 3 * 3);
for (let i = 0; i < positionsArray.length; i++) {
  if (i % 3 === 0) {
    positionsArray[i] = (Math.random() + 1.5) * 3;
  } else {
    positionsArray[i] = (Math.random() - 0.5) * 3;
  }
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3);
geometry4.setAttribute("position", positionsAttribute);
const mesh4 = new THREE.Mesh(geometry4, material);
scene.add(mesh4);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 20;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
