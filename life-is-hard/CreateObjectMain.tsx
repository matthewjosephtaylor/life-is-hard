import {
  isUndefined,
  Keys,
  safe,
  TypeBoxes,
  type TypeInfo,
} from "@mjtdev/engine";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { CurrentAiplSchemaForm } from "./CurrentAiplSchemaForm";
import { SaveObjectButton } from "./SaveObjectButton";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import { useLihState } from "./state/LihState";

export const CreateObjectMain = () => {
  const { currentSchema } = useLihState();
  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
    defaultComponentState: undefined as undefined | {},
  });
  const { gamePack, currentObjectId } = useLihState();
  useEffect(() => {
    const typeInfo = safe(() => TypeBoxes.schemaToTypeInfo(currentSchema!), {
      quiet: true,
    });
    console.log(
      `CreateObjectMain: typeInfo schema id: ${typeInfo?.schema.$id}`,
      typeInfo
    );
    const defaultComponentState = gamePack.entities.find(
      (e) => e.id === currentObjectId
    )?.object as {};
    console.log(
      "CreateObjectMain: default component state",
      defaultComponentState
    );
    setState((s) => ({ ...s, typeInfo: typeInfo, defaultComponentState }));
  }, [currentSchema, currentObjectId, gamePack]);

  if (!state.typeInfo) {
    return <Stack>Failed to create type info</Stack>;
  }
  return (
    <AiplComponentProvider
      key={Keys.stableStringify([state.typeInfo, state.defaultComponentState])}
      config={{ typeInfo: state.typeInfo }}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <Stack>
            <StartNewAiplChatButton />
            <SaveObjectButton
              disabled={isUndefined(currentObjectId)}
              id={currentObjectId ?? ""}
            />
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
