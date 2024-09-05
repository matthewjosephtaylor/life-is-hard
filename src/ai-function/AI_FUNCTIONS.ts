import {
  closeBrowserAiFunction,
  generateImage,
  openBrowserAiFunction,
  openDialogAiFunction,
  selfDestructAiFunction,
} from "./setupAiFunctions";

export const AI_FUNCTIONS = [
  {
    name: "generateImage",
    usage: "image generateion",
    params: {
      name: "prompt",
      description: "an image generation prompt",
    },
    func: generateImage,
  },
  {
    name: "openDialog",
    usage: "opening a dialog box",
    params: {
      name: "message",
      description: "message to display",
    },
    func: openDialogAiFunction,
  },
  {
    name: "closeDialog",
    usage: "closing a dialog box",
  },
  {
    name: "openBrowser",
    usage: "opening a browser window",
    params: {
      name: "url",
      description: "URL to navigate to",
    },
    func: openBrowserAiFunction,
  },
  {
    name: "closeBrowser",
    usage: "closing a browser window",
    params: {
      name: "url",
      description: "URL to close, default to last URL opened",
    },
    func: closeBrowserAiFunction,
  },
  // {
  //   name: "switchTab",
  //   usage: "switching to an application tab",
  //   params: {
  //     name: "name",
  //     description: "name of the tab to switch to",
  //   },
  //   func: switchTabAiFunction,
  // },
  {
    name: "cancel",
    usage: "cancelling",
  },
  {
    name: "selfDestruct",
    usage: "self destruction",
    params: {
      name: "seconds",
      description: "seconds until self destruct, default to 42",
      type: "number",
    },
    func: selfDestructAiFunction,
  },
];
