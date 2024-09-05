import { Flex } from "@radix-ui/themes";

export const Blame = () => {
  return (
    <Flex
      style={{
        position: "absolute",
        right: "1em",
        bottom: "0.5em",
        fontSize: "0.3em",
      }}
      align={"center"}
      gap="0.2em"
    >
      <a
        href="https://intelligage.io"
        target="_blank"
        rel="noopener noreferrer"
      >
        Copyright 2024 Intelligage
      </a>
    </Flex>
  );
};
