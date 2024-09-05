import type { Ticker} from "@mjtdev/engine";
import { Animates, toMany } from "@mjtdev/engine";
import type { HTMLProps} from "react";
import { useEffect, useRef } from "react";
import type { ElementAnimation } from "./ElementAnimation";
import { updateElementAnimation } from "./updateElementAnimation";

export const AnimatableDiv = (
  props: HTMLProps<HTMLDivElement> & {
    animations: ElementAnimation | ElementAnimation[];
  }
) => {
  const ref = useRef<HTMLDivElement>(null);
  const { children, animations: animationOrAnimations, ...rest } = props;
  const animations = toMany(animationOrAnimations);
  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const disposers: (() => void)[] = [];

    for (const animation of animations) {
      const abortController = new AbortController();
      const animator = Animates.create({
        signal: abortController.signal,
      });

      const ticker: Ticker = (tick) => {
        updateElementAnimation({
          animator,
          element,
          tick,
          animation,
        });
      };
      animator.tickers.push(ticker);
      disposers.push(() => abortController.abort());
    }
    return () => {
      disposers.forEach((d) => d());
    };
  }, [ref]);
  return (
    <div {...rest} ref={ref}>
      {children}
    </div>
  );
};
