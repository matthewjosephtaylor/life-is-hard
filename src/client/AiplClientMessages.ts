import { Bytes } from "@mjtdev/engine";
import {
  ArrayBuffers,
  type AppMessage,
  type AppMessageType,
} from "ai-worker-common";
import type { AiplClientContext } from "./AiplClients";
import { waitForWs } from "./waitForWs";

// Cloudflare max WS message size
const MAX_WS_MESSAGE_SIZE = 1024 * 1024;
const MULTI_MESSAGE_CHUNK_SIZE = MAX_WS_MESSAGE_SIZE * 0.9;

export const sendChunkedMessage = ({
  message,
  chunkSize,
  ctx,
}: {
  message: ArrayBuffer;
  chunkSize: number;
  ctx: AiplClientContext;
}) => {
  const chunks = ArrayBuffers.splitArrayBuffer(message, chunkSize);
  const id = `multimessage-${Date.now()}-${crypto.randomUUID()}`;
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    dispatch(ctx, {
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
  ctx: AiplClientContext,
  message: AppMessage<T>
) => {
  const ws = await waitForWs(ctx);
  if (!ws) {
    console.log("dispatch refusing, no ws");
    return;
  }
  const msgPack = Bytes.toMsgPack(message);
  // console.log("sending msgPack", msgPack);
  if (msgPack.byteLength > MAX_WS_MESSAGE_SIZE) {
    const jsonString = JSON.stringify(message);
    return sendChunkedMessage({
      ctx,
      // ws,
      message: msgPack,
      chunkSize: MULTI_MESSAGE_CHUNK_SIZE,
    });
  }
  ws.send(msgPack);
};

export const dispatchAll = async (
  ctx: AiplClientContext,
  messages: AppMessage[]
) => {
  return dispatch(ctx, { type: "messages", detail: messages });
};

export const AiplClientMessages = {
  dispatch,
  dispatchAll,
};
