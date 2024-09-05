import { Border } from "@mjtdev/engine";
import type { CSSProperties, ReactNode } from "react";

export const AppBorder = ({
  title,
  children,
  resizable = false,
  style = {},
  collapsable,
  defaultDisclosed,
}: {
  style?: CSSProperties;
  resizable?: boolean;
  collapsable?: boolean;
  title: ReactNode;
  children?: ReactNode;
  defaultDisclosed?: boolean;
}) => {
  return (
    <Border
      resizable={resizable}
      collapsable={collapsable}
      defaultDisclosed={defaultDisclosed}
      style={{ backgroundColor: "black", ...style }}
      title={
        <span style={{ whiteSpace: "nowrap", backgroundColor: "black" }}>
          {title}
        </span>
      }
    >
      {children}
    </Border>
  );
};
