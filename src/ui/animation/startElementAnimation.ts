import type { Tick } from "@mjtdev/engine";
import { Animates } from "@mjtdev/engine";
import { updateElementAnimation } from "./updateElementAnimation";

export const startElementAnimation = ({
  thoughtId,
  animationId,
  element,
}: {
  animationId?: string;
  thoughtId: string;
  element: HTMLElement;
}) => {
  if (!animationId) {
    return;
  }
  // console.log(`starting thought animation: ${id}`);
  const animator = Animates.create({});
  const ticker = (tick: Tick) => {
    updateElementAnimation({ animationId, animator, element, thoughtId, tick });
  };
  animator.tickers.push(ticker);

  return () => {
    // console.log(`ending thought animation: ${thoughtId}/${animationId}`);
    animator.abort = true;
  };
};
