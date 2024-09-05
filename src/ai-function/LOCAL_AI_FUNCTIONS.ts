import { toMany } from "@mjtdev/engine";
import type { AiFunctionCall } from "ai-worker-common";
import { openMessagePopup } from "../error/openMessagePopup";
import { closeAppPopup } from "../ui/popup/closeAppPopup";
// import { WINDOWS } from "../ui/WINDOWS";
import { updateAssistedEditorState } from "../ui/chat/mind/assisted-editor/AssistedEditorDisplay";

let lastWindow: Window | undefined | null = undefined;
export const LOCAL_AI_FUNCTIONS: Partial<
  Record<string, (props: AiFunctionCall) => void>
> = {
  openDialog: ({ name, args = {} }) => {
    const cleaned = toMany(Object.values(args))
      .join("")
      .replace('^.*?"', "")
      .replaceAll('"', "");
    openMessagePopup(cleaned);
  },
  closeDialog: () => {
    closeAppPopup();
  },

  cancel: () => {
    closeAppPopup();
  },
  openBrowser: ({ name, args = {} }) => {
    const cleaned = toMany(Object.values(args))
      .join("")
      .replace('^.*?"', "")
      .replaceAll('"', "");
    const fullUrl = cleaned.startsWith("http") ? cleaned : `https://${cleaned}`;

    lastWindow = window.open(fullUrl, "_blank");
  },
  closeBrowser: () => {
    lastWindow?.close();
  },
  // switchTab: ({ name, args = {} }) => {
  //   const cleaned = toMany(Object.values(args))
  //     .join("")
  //     .replace('^.*?"', "")
  //     .replaceAll('"', "");
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
  //   switchWindow(match);
  // },
  create: (call) => {
    updateAssistedEditorState((s) => {
      s.commands.push(call);
    });
  },
  update: (call) => {
    updateAssistedEditorState((s) => {
      s.commands.push(call);
    });
  },
  load: (call) => {
    updateAssistedEditorState((s) => {
      s.commands.push(call);
    });
  },
  list: (call) => {
    updateAssistedEditorState((s) => {
      s.commands.push(call);
    });
  },

  // stubs
  generateImage: () => {},
  addCharacterMemory: () => {},
  summarize: () => {},
};
