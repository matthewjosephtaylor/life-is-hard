import { Bytes } from "@mjtdev/engine";
import {
  ArrayBuffers,
  type AppMessage,
  type AppMessageType,
} from "ai-worker-common";
import { subscribeToDataObjects } from "./subscribeToDataObjects";
import { waitForWs } from "./waitForWs";
import { call } from "./call";

// Cloudflare max WS message size
const MAX_WS_MESSAGE_SIZE = 1024 * 1024;
const MULTI_MESSAGE_CHUNK_SIZE = MAX_WS_MESSAGE_SIZE * 0.9;

export const sendChunkedMessage = ({
  // ws,
  message,
  chunkSize,
}: {
  message: ArrayBuffer;
  chunkSize: number;
}) => {
  const chunks = ArrayBuffers.splitArrayBuffer(message, chunkSize);
  const id = `multimessage-${Date.now()}-${crypto.randomUUID()}`;
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    dispatch({
      type: "message:chunk",
      detail: {
        id,
        idx: i,
        chunk,
        total: chunks.length,
      },
    });
  }
};

export const dispatch = async <T extends AppMessageType = AppMessageType>(
  message: AppMessage<T>
) => {
  const ws = await waitForWs();
  if (!ws) {
    console.log("dispatch refusing, no ws");
    return;
  }
  const msgPack = Bytes.toMsgPack(message);
  // console.log("sending msgPack", msgPack);
  if (msgPack.byteLength > MAX_WS_MESSAGE_SIZE) {
    const jsonString = JSON.stringify(message);
    return sendChunkedMessage({
      // ws,
      message: msgPack,
      chunkSize: MULTI_MESSAGE_CHUNK_SIZE,
    });
  }
  ws.send(msgPack);

  // const jsonString = JSON.stringify(message);
  // if (jsonString.length > MAX_WS_MESSAGE_SIZE) {
  //   return sendChunkedMessage({
  //     ws,
  //     message: jsonString,
  //     chunkSize: MULTI_MESSAGE_CHUNK_SIZE,
  //   });
  // }
  // ws.send(jsonString);
};

export const dispatchAll = async (messages: AppMessage[]) => {
  return dispatch({ type: "messages", detail: messages });
};

export const AppMessagesState = {
  call,
  dispatch,
  dispatchAll,
  subscribeToDataObjects,
};
