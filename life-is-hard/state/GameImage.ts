import type { SdApiTxt2ImgRequest } from "ai-worker-common";




export type GameImage = {
  request: Partial<SdApiTxt2ImgRequest>;
  bytes: ArrayBuffer;
};
