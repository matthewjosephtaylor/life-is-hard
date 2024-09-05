import type { Chat } from "ai-worker-common";
import { deleteChat } from "../../../chat/deleteChat";
import { renameChat } from "../../../chat/renameChat";
import { retagChat } from "../../../chat/retagChat";
import { openChat } from "../../character/openChat";
import { AppButtonGroup } from "../../common/AppButtonGroup";
import { openAppPopup } from "../../popup/openAppPopup";
import { ViewChatStates } from "./ViewChatStates";

export const ChatActions = ({ chat }: { chat: Chat }) => {
  return (
    <AppButtonGroup
      colors={{ delete: "red" }}
      actions={{
        openChat: () => openChat(chat.id),
        rename: () => renameChat(chat.id),
        retag: () => retagChat(chat.id),
        delete: () => deleteChat(chat.id),
        viewChatState: () => {
          openAppPopup(<ViewChatStates chat={chat} />, {
            style: { maxWidth: "95vw" },
          });
        },
      }}
    />
  );
};
