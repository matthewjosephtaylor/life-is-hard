import { Center, Grid } from "@mjtdev/engine";
import { AppWindow } from "../AppWindow";
import { ChatTextEntry } from "../chat/entry/ChatTextEntry";
import { AudioContextVisualization } from "../chat/AudioContextVisualization";
import { ThoughtCloud } from "./ThoughtCloud";

export const VisualChat = ({
  chatId,
  userId,
}: {
  userId: string | undefined;
  chatId: string | undefined;
}) => {
  if (!chatId || !userId) {
    return <>No chatId or userId</>;
  }
  return (
    <AppWindow title="visual chat">
      <Grid direction="row" cellSize={"min-content"} gap="1em">
        <Center>
          <AudioContextVisualization />
        </Center>
        <Center>
          <ThoughtCloud />
        </Center>
        <Center>
          <ChatTextEntry userId={userId} chatId={chatId} />
        </Center>
      </Grid>
    </AppWindow>
  );
};
