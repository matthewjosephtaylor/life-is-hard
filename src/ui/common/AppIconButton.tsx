import { IconButton, Tooltip } from "@radix-ui/themes";
import type { IconButtonProps } from "@radix-ui/themes/dist/cjs/components/icon-button";
import type { ReactNode } from "react";

export const AppIconButton = ({
  children,
  tooltip = "",
  ...rest
}: IconButtonProps & {
  children: ReactNode;
  tooltip?: NonNullable<ReactNode>;
}) => {
  return (
    <Tooltip style={{ pointerEvents: "none" }} content={tooltip}>
      <IconButton {...rest}>{children}</IconButton>
    </Tooltip>
  );
};
