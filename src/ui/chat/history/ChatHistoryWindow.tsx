import { Container, Flex, Section, Separator, Strong } from "@radix-ui/themes";
import { AppModes } from "../../../state/location/AppModes";
import { ChatHistory } from "./ChatHistory";

export const ChatHistoryWindow = () => {
  const { hashParams, modes } = AppModes.useAppModesAndParams();
  const { characterId } = hashParams;

  return (
    <Section style={{ height: "100%", padding: "2em" }}>
      <Container style={{ height: "100%" }}>
        <Flex
          style={{
            height: "100%",
            // maxWidth: "90vw",
            // maxHeight: "calc(100vh - 15em)",
          }}
          direction={"column"}
          align={"center"}
          gap="2"
        >
          <Strong>Chat History</Strong>
          <Separator size={"4"} />
          <ChatHistory characterId={characterId} />
        </Flex>
      </Container>
    </Section>
  );
};
