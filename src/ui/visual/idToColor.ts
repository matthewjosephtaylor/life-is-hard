import { Colors, Noises, Strings } from "@mjtdev/engine";

export const idToColor = (
  id: string,
  options: Partial<{
    lightness: number;
    saturationl: number;
  }> = {}
) => {
  const hash = Strings.hashFnv32a({ str: id });
  const random = Noises.noiseStream(hash);
  const { lightness = 60, saturationl = 40 } = options;
  return Colors.from("grey")
    .rotate(360 * random())
    .lightness(lightness)
    .saturationl(saturationl)
    .toString();
};
