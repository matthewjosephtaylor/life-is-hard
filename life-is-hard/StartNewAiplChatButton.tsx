import { Button } from "@mui/material";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import type { TypeInfo } from "@mjtdev/engine";

export const StartNewAiplChatButton = ({
  systemMessage,
  params,
  schema,
}: Partial<{
  params: Record<string, string>;
  schema: TypeInfo["schema"];
  systemMessage: string;
}>) => {
  const ctx = useAiplComponentContext();
  return (
    <Button
      onClick={() => {
        console.log("start AIPL chat", { systemMessage, params, schema });
        ctx?.client?.startChat({ systemMessage, params, schema });
      }}
    >
      Start New Chat
    </Button>
  );
};
