// import { Grid } from "@mjtdev/engine";
// import { useChildDataObjects } from "../../state/data-object/DataObjectsState";
// import { useUserState } from "../../state/user/UserState";
// import { LoadChatButton } from "./LoadChatButton";
// import { sortByName } from "../../common/sortByName";
// import { clearChatHistory } from "./clearChatHistory";

// export const ChatHistoryDisplay = () => {
//   // const [contents, setContents] = useState<ReactNode[]>([]);

//   const chats = useChildDataObjects(useUserState().id, "chat");

//   // AppEvents.useEventListener("chat-list-updated", () => {
//   //   Idbs.list(ChatDB).then(async (ids) => {
//   //     setContents(await chatIdsToLoadButtons(ids));
//   //   });
//   // });
//   // useEffect(() => {
//   //   AppEvents.dispatchEvent("chat-list-updated");
//   // }, []);
//   const contents = chats
//     .sort(sortByName)
//     .map((chat, i) => <LoadChatButton key={i} chat={chat} />);

//   return (
//     <Grid
//       gap="1em"
//       style={{ maxHeight: "80vh", overflow: "auto" }}
//       direction="row"
//       cellSize={"min-content"}
//     >
//       <input
//         onClick={() => {
//           clearChatHistory(c);
//         }}
//         type="button"
//         value="clear chat history"
//       />
//       {contents}
//     </Grid>
//   );
// };
