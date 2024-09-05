// import * as THREE from "three";
// import { updateThoughtCloudState } from "./ThoughtCloudState";
// import { addThoughtAnimation } from "./addThoughtAnimation";

// export const addThoughtToScene = (scene: THREE.Scene) => {
//   updateThoughtCloudState((state) => {
//     const thought = state.thoughts.shift();
//     if (!thought) {
//       return;
//     }

//     const animation = addThoughtAnimation(scene, thought);
//     if (animation) {
//       state.animations.push(animation);
//     }
//   });
// };
