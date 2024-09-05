import { AppImages } from "ai-worker-common";
export const characterPlay = async () => {
  const response = await fetch("test.png");
  if (!response.ok) {
    console.error({ response });
    return;
  }
  const ab = await response.arrayBuffer();
  const cards = await AppImages.pngToTavernCards(ab);
  console.log({ cards });
  // const decoded = await decodePng(new Uint8Array(ab), {
  //   parseChunkTypes: "*",
  // });

  // console.log({ decoded });

  // const meta = decoded.metadata[0] as IPngMetadataTextualData;
  // const b64 = meta.text;
  // const textAb = Bytes.base64ToArrayBuffer(b64);
  // const text = Bytes.arrayBufferToUtf8(textAb);
  // console.log(text);
  // const json = JSON.parse(text);
  // console.log(json);
  // // const v2 = Cards.parseToV2(text);
  // console.log(v2);
};
