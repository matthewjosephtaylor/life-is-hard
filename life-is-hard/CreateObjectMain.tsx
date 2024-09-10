import { safe, TypeBoxes, type TypeInfo } from "@mjtdev/engine";
import { Stack } from "@mui/material";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import { SchemaForm } from "./common/SchemaForm";
import { useLihState } from "./state/LihState";
import { CurrentAiplSchemaForm } from "./CurrentAiplSchemaForm";
import { CreateObjectButton } from "./CreateObjectButton";
import { useEffect, useState } from "react";

export const CreateObjectMain = () => {
  const {
    currentSchema,
    currentObjectId = `${currentSchema?.$id ?? "entity"}-${Date.now()}-${crypto.randomUUID()}`,
  } = useLihState();
  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
  });
  useEffect(() => {
    const typeInfo = safe(() => TypeBoxes.schemaToTypeInfo(currentSchema!), {
      quiet: true,
    });
    console.log(
      `CreateObjectMain: typeInfo schema id: ${typeInfo?.schema.$id}`,
      typeInfo
    );
    setState({ typeInfo: typeInfo });
  }, [currentSchema]);

  if (!state.typeInfo) {
    return <Stack>Failed to create type info</Stack>;
  }
  return (
    <AiplComponentProvider
      key={state.typeInfo.schema.$id}
      config={{ typeInfo: state.typeInfo }}
    >
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <Stack>
            <StartNewAiplChatButton />
            <CreateObjectButton />
            {currentSchema?.$id}
            {currentObjectId}

            <CurrentAiplSchemaForm
              sx={{ paddingTop: "1em", maxHeight: "90vh", overflow: "auto" }}
            />
          </Stack>
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
