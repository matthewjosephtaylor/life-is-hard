// import { Colors, Htmls } from "@mjtdev/engine";
// import { CorpusDocument } from "ai-worker-common";
// import { CSS3DObject } from "three/examples/jsm/Addons";
// import { getThoughtCloudState } from "./ThoughtCloudState";
// import { openCorpusDocumentViewer } from "./openCorpusDocumentViewer";
// import { minusOneToOneRandom } from "./minusOneToOneRandom";

// export const createDocumentSprite = (document: CorpusDocument) => {
//   const { id, name, mediaType, size } = document;
//   const { getRenderer } = getThoughtCloudState();
//   if (!getRenderer) {
//     throw new Error("no thought renderer");
//   }

//   const bbox = getRenderer().domElement.getBoundingClientRect();
//   const width = bbox.width / 25;
//   const height = bbox.height / 25;
//   // const xRange =

//   // const x = Math.random() * (width - width * 2);
//   const x = minusOneToOneRandom() * width;
//   const y = minusOneToOneRandom() * height;

//   const confidence = 1;
//   const color = "grey";
//   // const fontSize = 4 * confidence + 2;
//   const fontSize = 2;
//   const parent = Htmls.from("div", {
//     style: {
//       // color: "white",
//       color: "white",
//       // color,
//       opacity: 1,
//       zIndex: 100,
//       // backgroundColor: Colors.from("black").alpha(0).toString(),

//       maxWidth: "2em",
//     },
//   });
//   const icon = Htmls.from("input", {
//     // textContent: text,
//     // attributes: { type: "button", value: name },
//     parent,
//     attributes: { type: "button", value: "📄" },
//     style: {
//       fontSize: `${fontSize * 4}px`,
//       padding: 0,
//       borderRadius: 0,
//       border: "none",
//       backgroundColor: Colors.from("black").alpha(0).toString(),

//       // color,
//       // opacity: 1,

//       // maxWidth: "16em",
//       // overflow: "hidden",
//       // textOverflow: "ellipsis",
//       // whiteSpace: "nowrap",
//     },
//   });
//   const textSpan = Htmls.from("span", {
//     textContent: name,
//     parent,
//     clazz: "button",
//     style: {
//       fontSize: `${fontSize}px`,
//       // backgroundColor: "black",
//       overflow: "hidden",
//       textOverflow: "ellipsis",
//       whiteSpace: "nowrap",
//     },
//   });

//   // work around revoked proxy
//   const doc = { ...document };

//   const obj = new CSS3DObject(parent);
//   obj.position.x = x;
//   obj.position.y = y;
//   // obj.position.z = -100;
//   console.log("dp", [x, y]);
//   parent.onclick = () => {
//     console.log("obj", obj);
//     console.log("bbox", icon.getBoundingClientRect());
//     openCorpusDocumentViewer(doc);
//   };
//   obj.name = id;
//   return obj;
// };
