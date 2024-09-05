import { createState } from "@mjtdev/engine";
import type { ToastItem } from "./ToastItem";


export const [useToastState, updateToastState, getToastState] = createState({
  toasts: [] as ToastItem[],
});
