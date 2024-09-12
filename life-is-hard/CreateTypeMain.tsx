import { TypeBoxes } from "@mjtdev/engine";
import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { TextBox } from "./common/TextBox";
import { DynamicTypeForm } from "./DynamicTypeForm";
import { SaveTypeButton } from "./SaveTypeButton";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import { useLihState } from "./state/LihState";
import { createOtherTypesSystemMessage } from "./createOtherTypesSystemMessage";

const createInternalResponseTypeInfo = () => {
  return TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        typeDefinition: Type.String({
          description:
            "The TypeScript type definition the user wants to create. DO NOT reference the InternalResponse type definition.",
        }),
      },
      { $id: "InternalResponse" }
    );
  });
};

export const CreateTypeMain = () => {
  const [state, setState] = useState({
    defaultComponentState: { typeDefinition: "" },
    typeInfo: createInternalResponseTypeInfo(),
  });
  const { currentSchema } = useLihState();
  useEffect(() => {
    if (!currentSchema) {
      setState((s) => {
        return {
          ...s,
          typeInfo: createInternalResponseTypeInfo(),
          defaultComponentState: { typeDefinition: "" },
        };
      });
      return;
    }
    const typeInfo = TypeBoxes.schemaToTypeInfo(currentSchema);
    if (!typeInfo) {
      setState((s) => {
        return {
          ...s,
          typeInfo: createInternalResponseTypeInfo(),
          defaultComponentState: { typeDefinition: "" },
        };
      });
      return;
    }
    setState((s) => {
      return {
        ...s,
        typeInfo: createInternalResponseTypeInfo(),
        defaultComponentState: { typeDefinition: typeInfo.typeDeclaration },
      };
    });
  }, [currentSchema]);
  return (
    <AiplComponentProvider
      config={{ typeInfo: state.typeInfo }}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <StartNewAiplChatButton
            systemMessage={createOtherTypesSystemMessage()}
          />
          <SaveTypeButton />
          <Typography variant="h6">
            {currentSchema?.$id
              ? `Update ${currentSchema.$id} Type`
              : "Create New Type"}
          </Typography>
          Create {currentSchema?.$id}
          <TextBox
            sx={{ minwidth: "40ch" }}
            multiline
            rows={10}
            aiplName="typeDefinition"
            key={state.typeInfo.schema.$id ?? ""}
          />
          <DynamicTypeForm aiplName={"typeDefinition"} />
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
