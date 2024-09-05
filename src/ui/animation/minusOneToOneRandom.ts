import type { NextRandom} from "@mjtdev/engine";
import { Randoms } from "@mjtdev/engine";

export const minusOneToOneRandom = (
  random: NextRandom = Randoms.globalRandom
) => {
  return 2 * random() - 1;
};
