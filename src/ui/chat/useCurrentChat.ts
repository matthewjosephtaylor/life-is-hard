import { isDefined } from "@mjtdev/engine";
import type { Chat, ChatMessage } from "ai-worker-common";
import { useEffect, useState } from "react";
import {
  DataObjectStates,
  useChildDataObjects,
} from "../../state/data-object/DataObjectStates";
import { AppModes } from "../../state/location/AppModes";

export const useCurrentChat = (): Readonly<{
  chat: Chat | undefined;
  messages: readonly ChatMessage[];
}> => {
  const chatId = AppModes.useAppHashParam("chatId");
  // console.log(`useCurrentChat: ChatID: ${chatId}`);
  const activeChat = DataObjectStates.useDataObject<Chat>(chatId);
  // const { appInterfaceId } = useAppState();
  // // console.log("useCurrentChat: appInterfaceId", appInterfaceId);

  // const activeChats = DataObjectStates.useChildDataObjects(
  //   appInterfaceId,
  //   "chat",
  //   "active"
  // );
  // const activeChat: Chat | undefined = activeChats[0];

  // = useDataObject(
  //   activeChats[0]?.id,
  //   activeChats[0]?.currentMessageId
  // );
  const messages = useChildDataObjects(activeChat?.id, "chat-message");

  const [result, setResult] = useState(
    Object.freeze({
      chat: undefined as undefined | Chat,
      messages: [] as ChatMessage[],
    })
  );
  useEffect(() => {
    // need to make sure we only give back _valid_ chats where we already
    // have the current message in SWR cache, otherwise UI blinks
    const currentMessage = messages.find(
      (m) => m.id === activeChat?.currentMessageId
    );
    if (isDefined(currentMessage)) {
      return setResult(
        Object.freeze({
          chat: activeChat,
          messages: [...messages],
        })
      );
    } else {
      // console.log("no current message", {
      //   currentMessage,
      //   messages,
      //   activeChat,
      // });
    }
  }, [messages, activeChat]);

  // console.log(`useCurrentChat:result`, {
  //   result,
  //   messages,
  //   activeChat,
  // });

  return result

  return { chat: activeChat, messages };
};
