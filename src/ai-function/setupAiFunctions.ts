import { Animates, safe } from "@mjtdev/engine";
import { askForGeneratedImages } from "../ai/askForGeneratedImages";
import { updateSelfDestructState } from "../error/SelfDestructPopup";
import { openMessagePopup } from "../error/openMessagePopup";
import { openSelfDestructPopup } from "../error/openSelfDestructPopup";
// import { WINDOWS } from "../ui/WINDOWS";

const animator = Animates.create({});
animator.tickers.push((tick) => {
  if (tick.frameCount % 60 === 0) {
    updateSelfDestructState((s) => {
      s.timer -= 1;
    });
  }
});

let lastWindow: Window | undefined | null = undefined;
type AiFunction = (ctx: any) => void | Promise<void>;

export const openDialogAiFunction: AiFunction = (ctx) => {
  console.log("ctx", ctx);
  const { arg = "" } = ctx;
  const cleaned = arg.replace('^.*?"', "").replaceAll('"', "");
  openMessagePopup(cleaned);
};
export const openBrowserAiFunction: AiFunction = (ctx) => {
  console.log("ctx", ctx);
  const { arg = "" } = ctx;
  const cleaned = arg.replace('^.*?"', "").replaceAll('"', "");
  const fullUrl = cleaned.startsWith("http") ? cleaned : `https://${cleaned}`;

  lastWindow = window.open(fullUrl, "_blank");
  console.log("opened browser window", [cleaned, lastWindow]);
  // openMessagePopup(cleaned);
};

// export const switchTabAiFunction: AiFunction = (ctx) => {
//   console.log("ctx", ctx);
//   const { arg = "" } = ctx;
//   const cleaned = arg.replace('^.*?"', "").replaceAll('"', "");
//   const windows = Objects.keys(WINDOWS);
//   const entries = windows.map((w) => [w, w] as const);
//   const [match, _] = Nlps.valueOfClosestMatch(
//     cleaned,
//     Object.fromEntries(entries)
//   );
//   console.log("window match", match);
//   if (!match) {
//     return;
//   }
//   // switchWindow("corpora");
//   switchWindow(match);
// };

export const closeBrowserAiFunction: AiFunction = (ctx) => {
  console.log("ctx", ctx);
  const { arg = "" } = ctx;
  const cleaned = arg.replace('^.*?"', "").replaceAll('"', "");
  console.log("window-closed", [lastWindow?.closed]);
  lastWindow?.close();
  console.log("window-closed", [lastWindow?.closed]);
  // openMessagePopup(cleaned);
};

export const selfDestructAiFunction: AiFunction = (ctx) => {
  console.log("ctx", ctx);
  const { arg = "" } = ctx;
  const cleaned = arg.replace('^.*?"', "").replaceAll('"', "");
  const secs = Math.min(safe(() => Number(cleaned)) ?? 10);

  updateSelfDestructState((s) => {
    s.timer = secs;
  });
  // getSelfDestructState().getAnimator().tickers.length = 0;

  openSelfDestructPopup(secs);
};

export const generateImage: AiFunction = async (ctx) => {
  const { arg = "" } = ctx;
  const blobs = await askForGeneratedImages({
    prompt: `4k masterpiece. ${arg}`,
    // n: 10,
  });
  // if (!resp || !resp.data) {
  //   console.log("empty response from imagegen");
  //   return;
  // }
  // const datas = Objects.toMany(resp.data);
  // const imageJson = resp.data[0] as OpenAib64JsonImage;
  // const ab = Bytes.base64ToArrayBuffer(imageJson.b64_json);
  // const image = Bytes.toBlob(ab, "image/png");
  const { chats, userId, chat } = ctx.env;

  // chats.addChatMessage({
  //   chat,
  //   userId,
  //   draft: {
  //     content: { type: "image", parts: [image] },
  //   },
  // });
  // const thought = createThought({
  //   image,
  // });

  // updateThoughtCloudState((state) => {
  //   state.thoughts.push(thought);
  // });

  // TODO messages done right
  // ctx.env.updateMessages((state) => {
  //   state.messages[message.id] = message;
  // });

  // Chats.setChatMessage(ctx.env.getChat(), message);

  // ctx.env.updateChat((state) => {
  //   state.currentMessageId = message.id;
  // });
};
