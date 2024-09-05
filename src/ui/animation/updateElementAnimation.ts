import type { AnimateState, Tick } from "@mjtdev/engine";
import { Maths } from "@mjtdev/engine";
import type { ElementAnimation } from "./ElementAnimation";
import { extractCssUnit } from "./extractCssUnit";
import { parseCssValue } from "./parseCssValue";

export const updateElementAnimation = ({
  animator,
  tick,
  element,
  animation,
}: {
  animation?: ElementAnimation;
  tick: Tick;
  animator: AnimateState;
  element: HTMLElement;
}) => {
  if (!animation) {
    animator.abort = true;
    return;
  }

  if (!animation) {
    animator.abort = true;
    return;
  }
  const {
    startFrame = tick.frameCount,
    delay,
    from,
    to,
    frames,
    cssProperty,
    onEnd,
    easing,
  } = animation;

  if (!element) {
    animator.abort = true;
    return;
  }
  if (!animation.startFrame) {
    animation.startFrame = startFrame;
  }
  if (tick.frameCount < startFrame + delay) {
    return;
  }
  if (!animation.state) {
    animation.state = "started";
    element.style.setProperty(cssProperty, `${from}`);
  }
  if (animation.state === "ended") {
    return;
  }

  const toUnit = extractCssUnit(to);
  const toValue = parseCssValue(to);
  const fromValue = parseCssValue(from);

  const currentFrame = tick.frameCount - startFrame - delay;

  const alpha = easing(currentFrame / frames);

  const updatedValue = Maths.lerp(fromValue, toValue, alpha);

  const updatedPropertyValue = `${updatedValue}${toUnit}`;
  // console.log(
  //   `${element.nodeName} prop: ${cssProperty} value: ${updatedValue} unit: ${toUnit}`
  // );
  element.style.setProperty(cssProperty, updatedPropertyValue);
  if (tick.frameCount > frames + startFrame + delay) {
    animation.state = "ended";
    animator.abort = true;
    if (onEnd) {
      onEnd();
    }
  }
};
