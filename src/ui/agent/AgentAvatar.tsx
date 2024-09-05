// import { Grid, Idbs, isDefined } from "@mjtdev/engine";
// import { ReactNode, useEffect, useState } from "react";
// import { getBackendData } from "../../backend/data/getBackendData";
// import { putBackendDataObject } from "../../backend/data/putBackendDataObject";
// import {
//   getAgentsState,
//   storeAiAgentsState,
//   updateAgentsState,
// } from "../../bot/AgentsState";
// import { ChatDB } from "../../chat/ChatDB";
// import { loadChatState } from "../../chat/loadChatState";
// import { openErrorPopup } from "../../error/openErrorPopup";
// import { CharacterAvatar } from "../character/CharacterAvatar";
// import { switchWindow } from "../WINDOWS";
// import {
//   AppContextMenu,
//   openAppContextMenu,
// } from "../common/openAppContextMenu";
// import { AppBorder } from "./AppBorder";
// import { openUpdateAiAgentPopup } from "./openUpdateAiAgentPopup";

// export const pullAgent = async (id: string) => {
//   const resp = await getBackendData(id);
//   if (!resp.ok) {
//     console.log(resp);
//     return openErrorPopup("Error pulling Agent");
//   }
//   const agent: AiAgent = await resp.json();
//   updateAgentsState((state) => {
//     state.agents[agent.id] = agent;
//   });
//   storeAiAgentsState();
//   return agent;
// };

// export const deployAgent = async (id: string) => {
//   const agent = getAgentsState().agents[id];
//   if (!agent) {
//     return openErrorPopup(`No agent for id: ${id}`);
//   }
//   const resp = await putBackendDataObject(agent);

//   if (!resp.ok) {
//     console.log(resp);
//     return openErrorPopup("Error pushing Agent");
//   }
//   const text = await resp.text();
//   console.log(text);
//   return resp;
// };

// export const forgetAgent = async (id: string) => {
//   updateAgentsState((state) => {
//     delete state.agents[id];
//   });
//   return storeAiAgentsState();
// };

// export const AgentAvatar = ({ agent }: { agent: AiAgent }) => {
//   const { aiCharacterId, userCharacterId, name, id, chatIds } = agent;

//   // const chats = usechat

//   const [chatLinks, setChatLinks] = useState<ReactNode[]>([]);

//   useEffect(() => {
//     Promise.all(
//       chatIds.map(async (id, i) => {
//         // await retagChat(id);
//         const chat = await Idbs.get(ChatDB, id);
//         if (!chat) {
//           return undefined;
//         }
//         const d = new Date(chat.creation).toLocaleString();
//         return (
//           <input
//             onClick={() => {
//               loadChatState(String(id));
//               switchWindow("chat");
//             }}
//             key={i}
//             type="button"
//             value={`${d}: ${chat.tags.join(",")}`}
//           />
//         );
//       })
//     ).then((links) => {
//       setChatLinks(links.filter(isDefined));
//     });
//   }, [chatIds]);

//   const aiCharacterAvatar = (
//     <CharacterAvatar
//       imageStyle={{ maxHeight: "10em" }}
//       character={aiCharacterId}
//     />
//   );
//   const userCharacterAvatar = (
//     <CharacterAvatar
//       imageStyle={{ maxHeight: "10em" }}
//       character={userCharacterId}
//     />
//   );
//   return (
//     <div
//       onContextMenu={(evt) =>
//         openAppContextMenu(evt, {
//           edit: () => openUpdateAiAgentPopup(id),
//           pull: () => pullAgent(id),
//           deploy: () => deployAgent(id),
//           forget: () => forgetAgent(id),
//           demo: () => {
//             window.location.href = `/demo-${id}`;
//           },
//           chat: async () => {
//             throw new Error("TBD");
//             // await startNewAgentChat(id);
//             // switchWindow("chat");
//           },
//           visualChat: async () => {
//             throw new Error("TBD");
//             // await startNewAgentChat(id);
//             // switchWindow("visualChat");
//           },
//         })
//       }
//     >
//       <AppContextMenu
//         actions={{
//           edit: () => openUpdateAiAgentPopup(id),
//           pull: () => pullAgent(id),
//           deploy: () => deployAgent(id),
//           forget: () => forgetAgent(id),
//           demo: () => {
//             window.location.href = `/demo-${id}`;
//           },
//           chat: async () => {
//             throw new Error("TBD");
//             // await startNewAgentChat(id);
//             // switchWindow("chat");
//           },
//           visualChat: async () => {
//             throw new Error("TBD");
//             // await startNewAgentChat(id);
//             // switchWindow("visualChat");
//           },
//         }}
//       >
//         <AppBorder title={name}>
//           <Grid direction="column" cellSize={"min-content"} gap={"1em"}>
//             <AppBorder title="ai">{aiCharacterAvatar}</AppBorder>
//             <AppBorder title="user">{userCharacterAvatar}</AppBorder>
//           </Grid>
//         </AppBorder>
//         <AppBorder title={"chats"}>{chatLinks}</AppBorder>
//       </AppContextMenu>
//     </div>
//   );
// };
