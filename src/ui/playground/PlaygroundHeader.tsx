import { Button, Flex, Text } from "@radix-ui/themes";
import { AppDropDown } from "../common/AppDropDown";
import { AppTextArea } from "../common/AppTextArea";
import { startNewPlaygroundChat } from "./startNewPlaygroundChat";

export const PlaygroundHeader = () => {
  const appearance = "dark";
  const logoSrc =
    appearance === "dark"
      ? "images/intelligage-white.png"
      : "images/intelligage-black.png";
  return (
    <Flex
      align={"center"}
      style={{
        width: "100%",
      }}
    >
      <Flex style={{ padding: "1em" }} align={"center"} gap="1ch">
        <img style={{ maxHeight: "1em" }} src={logoSrc} />
        <Text>AIPL Playground</Text>
      </Flex>
      <Flex flexGrow={"1"} />
      <Button
        color={"green"}
        onClick={async () => {
          startNewPlaygroundChat();
        }}
      >
        New Chat
      </Button>
      <Flex flexGrow={"1"} />
      {/* <Flex align={"center"} style={{ minWidth: "20em" }}>
        <AppTextArea placeholder="Search" />
      </Flex> */}
      <Flex align={"center"} flexGrow={"1"}>
        <Flex flexGrow={"1"} />
        {/* <Button>Share Your Creation</Button> */}
        <Flex flexGrow={"1"} />
        {/* <AppDropDown
          placeholder={"Find other Playgrounds"}
          title={"Explore"}
          values={["foo", "bar", "baz"]}
        />
        <Flex flexGrow={"1"} /> */}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`https://ai-workforce.intelligage.net`}
        >
          {"Create an AI Workforce account"}
        </a>
        {/* <Button onClick={() => {}}>Login / for private AI Agent</Button> */}
        <Flex flexGrow={"1"} />
      </Flex>
    </Flex>
  );
};
