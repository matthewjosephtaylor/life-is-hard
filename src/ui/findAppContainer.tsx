import { Htmls } from "@mjtdev/engine";

export const findAppContainer = () => {
  const appContainer =
    document.querySelector<HTMLDivElement>("div#ai-workforce") ??
    Htmls.from("div", {
      parent: document.body,
      id: "ai-workforce-overlay",
      style: {
        position: "absolute",
        zIndex: 1000,
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      },
    });

  return appContainer;
};
