import type { Vec2 } from "@mjtdev/engine";
import { updateThoughtCloudState } from "../visual/ThoughtCloudState";
import { createElementAnimation } from "./createElementAnimation";

export const createFloatToPostionAnimations = ({
  thoughtId,
  targetPos,
  startPos,
  frames,
  delay = 0,
  onEnd,
}: {
  delay?: number;
  frames: number;
  thoughtId: string;
  targetPos: Vec2;
  startPos: Vec2;
  onEnd: () => void;
}) => {
  const [sx, sy] = startPos;
  const [x, y] = targetPos;
  const xAnim = createElementAnimation({
    delay,
    frames,
    cssProperty: "left",
    from: sx,
    to: x,
    // easing: easeInExpo,
  });
  const yAnim = createElementAnimation({
    delay,
    frames,
    cssProperty: "top",
    from: sy,
    to: y,
    // easing: easeInExpo,
  });
  const aAnim = createElementAnimation({
    delay,
    cssProperty: "opacity",
    // frames: frames * 2,
    frames,
    to: 1,
  });

  const fadeOutAnim = createElementAnimation({
    delay: delay + frames,
    cssProperty: "opacity",
    from: 1,
    to: 0,
    frames: frames,
    // easing: (t) => linear(-t),

    onEnd: () => {
      // HACK? insure update on next render loop
      onEnd();
      setTimeout(() => {
        updateThoughtCloudState((s) => {
          s.thoughts = s.thoughts.filter((t) => t.id !== thoughtId);
        });
      }, 0);
    },
  });

  return [xAnim, yAnim, aAnim, fadeOutAnim];
};
