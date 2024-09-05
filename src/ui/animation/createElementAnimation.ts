import type { ElementAnimation } from "./ElementAnimation";
import * as e from "easing-utils";

export const createElementAnimation = (
  draft: Partial<ElementAnimation> = {}
): ElementAnimation => {
  const {
    cssProperty = "opacity",
    delay: delay = 0,
    to: destValue = 1,
    frames = 5 * 60,
    id = `element-animation-${crypto.randomUUID()}`,
    onEnd,
    startFrame,
    from: startValue = 0,
    state,
    easing = e.linear,
  } = draft;
  return {
    id,
    easing,
    cssProperty,
    delay,
    to: destValue,
    frames,
    onEnd,
    startFrame,
    from: startValue,
    state,
  };
};


