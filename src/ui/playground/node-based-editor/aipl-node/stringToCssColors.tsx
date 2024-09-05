import { Colors } from "@mjtdev/engine";
import { idToColor } from "../../../visual/idToColor";

export const stringToCssColors = (
  value: string,
  updater: (value: string) => string = (v) => v
) => {
  const backgroundColor = Colors.from(idToColor(value))
    .desaturate(0.7)
    // .darken(0.2)
    .toString();
  const updatedBackgroundColor = updater(backgroundColor);
  const color = Colors.textColor([updatedBackgroundColor]);
  return { backgroundColor: updatedBackgroundColor, color };
};
