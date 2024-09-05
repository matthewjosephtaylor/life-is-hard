import { Colors } from "@mjtdev/engine";
import { Container, Flex, Text } from "@radix-ui/themes";
import { useServiceStatus } from "./status/ServiceStatus";

export const AppLockout = () => {
  const { services } = useServiceStatus();
  if (services.ws !== "error") {
    return <></>;
  }
  return (
    <Flex
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        top: 0,
        left: 0,
        overflow: "hidden",
        zIndex: 100,

        backgroundColor: Colors.from("grey").alpha(0.5).toString(),
      }}
      align={"center"}
    >
      <Flex
        style={{
          width: "100vw",
          // backgroundColor: "blue"
        }}
        align={"center"}
        direction={"column"}
      >
        <Text>Reconnecting to server...</Text>
      </Flex>
    </Flex>
  );
};
