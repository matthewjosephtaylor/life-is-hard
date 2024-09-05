// // import { askQuestionOfChat } from "../chat/askQuestionOfChat";
// import { AppCharacter, uniqueId } from "ai-worker-common";
// import { askQuestionOfChat } from "../chat/askQuestionOfChat";
// import { DataObjectStates } from "../state/data-object/DataObjectsState";
// import { DatasState } from "../state/data/DatasState";
// // import { openImageGenerationPopup } from "../ui/image/openImageGenerationPopup";
// import { getCharacter } from "./getCharacter";
// import { renderCardText } from "./renderCardText";

// export const updateCharacterImage = async (characterId: string) => {
//   const character = getCharacter(characterId);
//   if (!character) {
//     return;
//   }
//   const defaultImage = await DatasState.dataIdToBlob(character.imageDataId);

//   const generatedImageAndPrompt = await openImageGenerationPopup({
//     defaultImage,
//     defaultPrompt: character?.card.data.extensions?.genInfo?.imagePrompt,
//     onGeneratePrompt: async (was) => {
//       const char = character.card.data.name;
//       const { extensions, ...rest } = character.card.data;
//       const charaText = renderCardText(JSON.stringify(rest), {
//         char,
//       });
//       const directions = [
//         "You are an expert text to image image generation prompt engineer program.",
//         "You take in character information and output text describing the character as a camera would see it",
//         `You only describe the physical aspects of ${char} not mental states.`,
//         `# Character ${char} information:`,
//         `${charaText}`,
//       ].join("\n");

//       const ans = await askQuestionOfChat({
//         systemMessage: directions,
//         userMessage: `Describe what ${char} looks like`,
//         assistantMessage: `${char} looks like `,
//       });
//       return ans;
//     },
//   });
//   if (!generatedImageAndPrompt) {
//     return;
//   }
//   const { image, prompt } = generatedImageAndPrompt;
//   if (!image) {
//     return;
//   }

//   return DatasState.deleteDataId(character.imageDataId)
//     .then(async (resp) => {
//       if (character.imageDataId && !resp?.ok) {
//         return;
//       }
//       const imageDataId = uniqueId("data");
//       return DatasState.putBlob({ blob: image, id: imageDataId }).then(
//         (resp) => {
//           if (!resp.ok) {
//             return undefined;
//           }
//           return imageDataId;
//         }
//       );
//     })
//     .then((imageDataId) => {
//       if (!imageDataId) {
//         return;
//       }
//       return DataObjectStates.updateDataObject<AppCharacter>(
//         characterId,
//         (c) => {
//           if (!c) {
//             return c;
//           }

//           // delicate code TODO introduce immer to data-objects
//           return {
//             ...c,
//             imageDataId,
//             card: {
//               ...c.card,
//               data: {
//                 ...c.card.data,
//                 extensions: {
//                   ...c.card.data.extensions,
//                   genInfo: {
//                     ...(c.card.data.extensions?.genInfo ?? {}),
//                     imagePrompt: prompt,
//                   },
//                 },
//               },
//             },
//           };
//         }
//       );
//     });
// };
