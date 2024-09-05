import { startElementAnimation } from "./startElementAnimation";
import { isDefined } from "@mjtdev/engine";


export const startElementAnimations = ({
  animationIds, thoughtId, element,
}: {
  animationIds: string[];
  thoughtId: string;
  element: HTMLElement;
}) => {
  const disposers = animationIds
    .map((animationId) => startElementAnimation({ animationId, thoughtId, element })
    )
    .filter(isDefined);

  return () => {
    disposers.forEach((d) => d());
  };
};
