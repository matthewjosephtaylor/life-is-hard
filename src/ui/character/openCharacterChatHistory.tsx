// import { closePopup, openCenteredPopup } from "@mjtdev/engine";
// import { DataObjectStates } from "../../state/data-object/DataObjectStates";
// import { CharacterChatHistory } from "./CharacterChatHistory";
// import { openAppPopup } from "../popup/openAppPopup";
// import { closeAppPopup } from "../popup/closeAppPopup";

// export const openCharacterChatHistory = ({
//   characterId,
// }: {
//   characterId: string;
// }) => {
//   DataObjectStates.findChildDataObjects(characterId, "chat");
//   return new Promise<string | undefined>((resolve) => {
//     const name = openAppPopup(
//       <CharacterChatHistory
//         onSubmit={(chatId) => {
//           resolve(chatId);
//           closeAppPopup();
//         }}
//         characterId={characterId}
//       />,
//       {
//         onClose: () => resolve(undefined),
//       }
//     );
//   });
// };
