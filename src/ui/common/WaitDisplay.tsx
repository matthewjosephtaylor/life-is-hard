import { Colors, Grid } from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import type { ReactNode } from "react";

export const WaitDisplay = ({
  name,
  children,
}: {
  name: string;
  children: ReactNode;
}) => {
  return (
    <Flex
      style={{
        backgroundColor: Colors.from("blue")
          .darken(0.8)
          .desaturate(0.5)
          .alpha(0.9)
          .toString(),
      }}
    >
      <Flex
        // cellSize={["1.5em", "1fr"]}
        style={{
          borderRadius: "1em",
        }}
      >
        <div>🔴</div>
        {children}
      </Flex>
    </Flex>
  );
};
