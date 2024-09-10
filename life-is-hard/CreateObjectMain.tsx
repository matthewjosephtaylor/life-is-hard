import {
  isUndefined,
  Keys,
  safe,
  TypeBoxes,
  type TypeInfo,
} from "@mjtdev/engine";
import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { CurrentAiplSchemaForm } from "./CurrentAiplSchemaForm";
import { SaveObjectButton } from "./SaveObjectButton";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import { useLihState } from "./state/LihState";

export const CreateObjectMain = () => {
  const { currentSchema, currentObjectId, gamePack } = useLihState();
  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
    defaultComponentState: undefined as undefined | {},
    objectId: undefined as undefined | string,
  });
  useEffect(() => {
    console.log("!!!!!!!!!!!!!!!!!!currentSchema CHANGED!!!!!!", currentSchema);
    const typeInfo = safe(() => TypeBoxes.schemaToTypeInfo(currentSchema!), {
      quiet: true,
    });
    const defaultComponentState = gamePack.entities.find(
      (e) => e.id === currentObjectId
    )?.object as {};
    setState((s) => ({
      ...s,
      typeInfo: typeInfo,
      defaultComponentState,
      objectId: currentObjectId,
    }));
  }, [currentSchema, currentObjectId]);
  const config = useMemo(
    () => ({ typeInfo: state.typeInfo }),
    [state.typeInfo]
  );
  if (!state.typeInfo) {
    return <Stack>Failed to create type info</Stack>;
  }
  console.log("state.defaultComponentState", state.defaultComponentState);
  return (
    <AiplComponentProvider
      // config={{ typeInfo: state.typeInfo }}
      config={config}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <Stack>
            <StartNewAiplChatButton />
            <SaveObjectButton
              disabled={isUndefined(state.objectId)}
              id={state.objectId ?? ""}
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
