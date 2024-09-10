import { TypeBoxes } from "@mjtdev/engine";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { TextBox } from "./common/TextBox";
import { DynamicTypeForm } from "./DynamicTypeForm";
import { SaveTypeButton } from "./SaveTypeButton";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import { useLihState } from "./state/LihState";

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
  const { currentSchema } = useLihState();
  useEffect(() => {
    if (!currentSchema) {
      return;
    }
    const typeDef = TypeBoxes.schemaToTypeInfo(currentSchema);
    if (!typeDef) {
      return;
    }
  }, [currentSchema]);
  return (
    <AiplComponentProvider config={{ typeInfo: state.typeInfo }}>
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <StartNewAiplChatButton />
          Create {currentSchema?.$id}
          <TextBox
            sx={{ minwidth: "40ch" }}
            multiline
            rows={10}
            aiplName="typeDefinition"
          />
          <DynamicTypeForm aiplName={"typeDefinition"} />
          <SaveTypeButton />
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
