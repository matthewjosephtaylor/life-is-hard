import { Button } from "@mui/material";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";

export const StartNewAiplChatButton = () => {
  const ctx = useAiplComponentContext();
  return (
    <Button
      onClick={() => {
        console.log("start chat", ctx?.client);
        ctx?.client?.startChat();
      }}
    >
      Start New Chat
    </Button>
  );
};
