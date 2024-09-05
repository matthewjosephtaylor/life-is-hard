import { Colors, isDefined } from "@mjtdev/engine";
import { Flex, Strong, type FlexProps } from "@radix-ui/themes";
import type { AiplNode } from "ai-worker-common";
import { type ReactNode } from "react";
import { stringToCssColors } from "./stringToCssColors";

export const StyledNode = ({
  aiplNode,
  active,
  type = aiplNode?.type ?? "",
  children,
  style,
  ...rest
}: FlexProps & {
  aiplNode?: AiplNode;
  active?: boolean;
  type?: string;
  children?: ReactNode;
}) => {
  const activeStyle = {
    ...stringToCssColors(type, (cur) => {
      if (active) {
        return Colors.from(cur).desaturate(0.5).toString();
      }
      return Colors.from(cur).desaturate(0.5).darken(0.5).toString();
    }),
    borderRadius: "1em",
    overflow: "auto",
    minheight: "20em",
    padding: "0.5em",
  };

  const locStart = `${aiplNode?.loc?.start.offset ?? ""}`;
  const locEnd = `${aiplNode?.loc?.end.offset ?? ""}`;

  return (
    <Flex
      className={
        isDefined(active) ? (active ? "active" : "inactive") : undefined
      }
      wrap={"wrap"}
      style={{ ...activeStyle, ...style }}
      {...rest}
    >
      <Strong style={{ paddingRight: "1ch" }}>
        ({locStart} - {locEnd})
      </Strong>
      {children}
    </Flex>
  );
};
