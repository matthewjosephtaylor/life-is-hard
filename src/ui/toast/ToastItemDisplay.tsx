import { Flex, Text } from "@radix-ui/themes";
import type { ToastItem } from "./ToastItem";

export const ToastItemDisplay = ({ toast }: { toast: ToastItem }) => (
  <Flex
    onClick={() => {}}
    style={{
      margin: "0.5em",
      textAlign: "center",
      border: "1px solid grey",
      padding: "0.5em",
      borderRadius: "1em",
      maxWidth: "20em",
      textOverflow: "ellipsis",
      overflow: "hidden",
      backgroundColor: "black",
      userSelect: "none",
      pointerEvents: "none",
      opacity: 1,
    }}
  >
    <Text>{toast.text}</Text>
  </Flex>
);
