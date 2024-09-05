// import { Objects } from "@mjtdev/engine";
// import type { Chat } from "ai-worker-common";
// import { AI_FUNCTION_PREFIX } from "../chat/addFunctionsToChat";
// import { AI_FUNCTIONS } from "./setupAiFunctions";

// export const createAiFunctionPromptText = (chat: Chat) => {
//   const aiFuncPrompts = AI_FUNCTIONS.map((f) => {
//     const { name, usage, params = [] } = f;
//     const manyParams = Objects.toMany(params);
//     const paramsUsages = manyParams.map((p) => {
//       const { name, description } = p;
//       return `// var:${name} is the ${description}`;
//     });
//     const paramsCallSignature = manyParams
//       .map((p) => {
//         const { name, type = "string" } = p;
//         return `${name}:${type}`;
//       })
//       .join(", ");
//     const funcCallSignature = [
//       `${AI_FUNCTION_PREFIX}${name}(${paramsCallSignature});`,
//     ];

//     return [`// function for ${usage}`, ...paramsUsages, funcCallSignature, ""];
//   }).flat();

//   const example = `
// # Example function call:

// <|im_start|>${chat.userName}
// open a dialog with the message hello world<|im_end|>
// <|im_start|>${chat.aiName}
// ${AI_FUNCTION_PREFIX}openDialog("hello world");<|im_end|>
//   `;

//   const direction = `
// Whenever you want to perform a function call DO NOT RESPOND with natural language!
// instead call the function in your next response as the example function calls above show.
// ONLY CALL FUNCTIONS IN THE ABOVE KNOWN FUNCTIONS LIST!
// Most of the time you will respond with natural language. Only respond with function calls when needed.
//   `;

//   return [
//     `${chat.aiName} knows about the following function calls:`,
//     "",
//     "# Known Functions",
//     ...aiFuncPrompts,
//     "",
//     example,
//     direction,
//   ].join("\n");
// };
