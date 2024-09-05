import { Colors, Noises, Strings } from "@mjtdev/engine";

export const aiplTokenNameToColor = (value: string, seed = "") => {
  const hash = Strings.hashFnv32a({ str: `${value}${seed}` });
  const random = Noises.noiseStream(hash);
  return Colors.from(Colors.randomColor(random))
    .saturationl(100)
    .lightness(60)
    .hex();
};
