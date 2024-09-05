import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

export const reactRender = (
  node: ReactNode | ReactNode[],
  parent = document.body,
  container = document.createElement("div")
) => {
  parent.appendChild(container);
  const root = createRoot(container);
  root.render(node);
  const dispose = () => {
    root.unmount();
    container.remove();
  };
  return { dispose, root, container };
};
