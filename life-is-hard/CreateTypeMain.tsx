import { TypeBoxes, type TypeInfo } from "@mjtdev/engine";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { TextBox } from "./common/TextBox";
import { AiplComponentContext } from "../src/provider/AiplComponentContext";

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

export const CreateTypeMain = () => {
  const [state, setState] = useState({
    typeInfo: TypeBoxes.createTypeInfo((Type) => {
      return Type.Object(
        {
          typeDefinition: Type.String({
            description:
              "The TypeScript type definition the user wants to create. DO NOT respond with the Response type definition, don't get confused.",
          }),
        },
        { $id: "Response" }
      );
    }),
  });
  return (
    <AiplComponentProvider config={{ typeInfo: state.typeInfo }}>
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          {/* <StoryForm /> */}

          <TextBox
            sx={{ minwidth: "40ch" }}
            multiline
            rows={10}
            aiplName="typeDefinition"
          />
          <StartNewAiplChatButton />
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

export const DynamicTypeForm = ({
  schema,
}: {
  schema: TypeInfo<unknown>["schema"];
}) => {
  const typeInfo = TypeBoxes.schemaToTypeInfo(schema);

  return <AiplComponentProvider config={{ typeInfo }}> </AiplComponentProvider>;
};
