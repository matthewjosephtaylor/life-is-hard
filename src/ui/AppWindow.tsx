import type { CSSProperties, ReactNode } from "react";
import { AppBorder } from "./agent/AppBorder";
import { Box, Section } from "@radix-ui/themes";

export const AppWindow = ({
  title,
  children,
  style = {},
}: {
  title: string;
  children?: ReactNode;
  style?: CSSProperties;
}) => {
  return <Box>{children}</Box>;
  // return <Section>{children}</Section>
  // return (
  //   <AppBorder
  //     style={{
  //       marginTop: "1em",
  //       width: "calc(100vw - 5em)",
  //       height: "calc(100vh - 10em)",
  //       overflow: "auto",
  //       ...style,
  //     }}
  //     title={title}
  //   >
  //     {children}
  //   </AppBorder>
  // );
};
