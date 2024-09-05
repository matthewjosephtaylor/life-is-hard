// import { Colors, Htmls } from "@mjtdev/engine";
// import * as THREE from "three";
// import { CSS3DObject } from "three/examples/jsm/Addons";
// import { Thought } from "./Thought";
// import { getDocumentSprite } from "./getDocumentSprite";
// import { ThoughtAnimation } from "./ThoughtAnimation";

// export const addThoughtAnimation = (
//   scene: THREE.Scene,
//   thought: Thought
// ): ThoughtAnimation => {
//   const { text, confidence } = thought;
//   const color = Colors.from(Colors.randomColor())
//     .hue(confidence * Math.PI * 2)
//     .lighten(confidence)
//     .toString();
//   const fontSize = 4 * confidence + 2;
//   const document = thought.corpusDocuments[0];
//   if (!document) {
//     throw new Error(`No doc for thought: ${thought.text}`);
//     // console.log("no doc for thought", thought);
//     // return;
//   }
//   const parent = getDocumentSprite(scene, document);
//   // root.nam
//   // const thoughtDiv = Htmls.from("input", {
//   //   // textContent: text,

//   //   attributes: { type: "button", value: text },
//   //   style: {
//   //     fontSize: `${fontSize}px`,
//   //     // color: "white",
//   //     color,
//   //     opacity: 1,
//   //   },
//   // });

//   const thoughtDiv = Htmls.from("div", {
//     textContent: text,

//     // attributes: { type: "button", value: text },
//     style: {
//       fontSize: `${fontSize}px`,
//       // color: "white",
//       color,
//       opacity: 0,
//     },
//   });
//   const obj = new CSS3DObject(thoughtDiv);
//   // const scale = 100;
//   // const scale = 50;
//   // const startScale = scale / 2;
//   const startScale = 60;
//   obj.position.x = 2 * startScale * Math.random() - startScale;
//   obj.position.y = 2 * startScale * Math.random() - startScale;
//   // obj.position.z = 2 * startScale * Math.random() - startScale;

//   parent.add(obj);
//   // scene.add(obj);
//   return {
//     id: crypto.randomUUID(),
//     currentLifetime: 0,
//     getObject: () => obj,
//     dest: [
//       0, 0, 0,
//       // 2 * scale * Math.random() - scale,
//       // 2 * scale * Math.random() - scale,
//       // 2 * scale * Math.random() - scale,
//     ],
//     lifetime: 60 * 5,

//     speed: 0.005 * Math.random() * confidence,
//   };
// };
