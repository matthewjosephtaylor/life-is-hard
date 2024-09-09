import { Stack } from "@mui/material";
import { StoryForm } from "./StoryForm";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { StoryTypeInfo } from "./domain/StoryTypeInfo";

export const CreateStoryMain = () => {
  return (
    <AiplComponentProvider config={{ typeInfo: StoryTypeInfo }}>
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <StoryForm />
        </Stack>
        <Stack sx={{ minWidth: "40ch" }}>
          <AiplChatWindow
            style={{
              minWidth: "40ch",
              maxWidth: "80ch",
              width: "100%",
              flexShrink: 1,
            }}
            onUpdate={async (ctx) => {
              console.log("--- updated ---");
              console.log(ctx.componentState);
            }}
          />
        </Stack>
      </Stack>
    </AiplComponentProvider>
  );
};
