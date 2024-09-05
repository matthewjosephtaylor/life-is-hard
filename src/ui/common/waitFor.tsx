import { closePopup, createState, openPopup } from "@mjtdev/engine";
import { WaitDisplay } from "./WaitDisplay";
import { openErrorPopup } from "../../error/openErrorPopup";

export const [useWaitState, updateWaitState, getWaitState] = createState({
  actives: [] as string[],
});

export const waitFor = async <T extends object | string | void | boolean>(
  functionOrValue: T | (() => Promise<T> | T),
  options: Partial<{
    name: string;
    message: string;
    mouseCursor: CSSStyleDeclaration["cursor"];
  }> = {}
): Promise<T> => {
  const { bottom } = document.body.getBoundingClientRect();
  const {
    message = "waiting...",
    name = crypto.randomUUID(),
    mouseCursor = false,
  } = options;
  if (mouseCursor) {
    document.body.style.cursor = mouseCursor;
  }
  try {
    updateWaitState((state) => {
      state.actives.push(name);
    });
    const { actives } = getWaitState();
    // const y = bottom - 30 * (actives.length + 1);
    const y = 0 + 30 * (actives.length + 1);
    openPopup(<WaitDisplay name={name}>{message}</WaitDisplay>, {
      showFrame: false,
      name,
      right: "1em",
      y,
    });

    const value =
      typeof functionOrValue === "function"
        ? await (functionOrValue as () => Promise<T> | T)()
        : await functionOrValue;
    return value;
  } catch (err) {
    // openErrorPopup(err);
    console.error(err);
    throw err;
  } finally {
    if (mouseCursor) {
      document.body.style.cursor = "auto";
    }
    closePopup(name);
    updateWaitState((state) => {
      state.actives = state.actives.filter((a) => a !== name);
    });
  }
};
