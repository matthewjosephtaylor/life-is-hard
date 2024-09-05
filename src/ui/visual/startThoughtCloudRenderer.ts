// import { Animates, Htmls } from "@mjtdev/engine";
// import * as THREE from "three";
// import { CSS3DRenderer } from "three/examples/jsm/Addons";
// import {
//   getThoughtCloudState,
//   updateThoughtCloudState,
// } from "./ThoughtCloudState";
// import { addThoughtToScene } from "./addThoughtToScene";
// import { animateThoughts } from "./animateThoughts";

// export const startThoughtCloudRenderer = (parent: HTMLDivElement) => {
//   // Set up the scene
//   const scene = new THREE.Scene();

//   // Create a camera
//   const bbox = parent.getBoundingClientRect();
//   const camera = new THREE.PerspectiveCamera(
//     90,
//     bbox.width / bbox.height,
//     0.1,
//     10000
//   );
//   camera.position.z = 40;

//   // Create a CSS3DRenderer
//   const rendererElement = Htmls.from("div");
//   const cssRenderer = new CSS3DRenderer({
//     element: rendererElement,
//   });
//   cssRenderer.setSize(bbox.width, bbox.height);
//   parent.appendChild(cssRenderer.domElement);
//   updateThoughtCloudState((state) => {
//     state.getRenderer = () => cssRenderer;
//   });

//   const MAX_THOUGHTS = 20;

//   // Animation loop
//   const as = Animates.create({
//     ticker: (tick) => {
//       if (
//         tick.frameCount % 30 === 0 &&
//         getThoughtCloudState().animations.length < MAX_THOUGHTS
//       ) {
//         addThoughtToScene(scene);
//       }
//       animateThoughts(scene);

//       cssRenderer.render(scene, camera);
//     },
//   });

//   // disposal
//   return () => {
//     as.abort = true;
//     getThoughtCloudState().animations.forEach((a) => {});
//     updateThoughtCloudState((state) => {
//       state.animations.forEach((a) => {
//         if (a.getObject) {
//           scene.remove(a.getObject());
//         }
//       });
//       state.animations = [];
//       state.thoughts = [];
//     });
//     scene.clear();
//     scene.remove();
//     cssRenderer.domElement.remove();
//     rendererElement.remove();
//   };
// };
