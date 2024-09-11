import { isUndefined, safe, TypeBoxes, type TypeInfo } from "@mjtdev/engine";
import { Button, Select, Stack, TextField } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { CurrentAiplSchemaForm } from "./CurrentAiplSchemaForm";
import { SaveObjectButton } from "./SaveObjectButton";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import { useLihState } from "./state/LihState";
import { DataImage } from "./DataImage";
import type { GameEntity } from "./state/GameEntity";
import type { GameImage } from "./state/GameImage";
import { DropdownList } from "./common/DropdownList";
import { GAME_ENTITY_CATEGORIES } from "./state/GAME_ENTITY_CATEGORIES";

export const CreateObjectMain = () => {
  const { currentSchema, currentObjectId, gamePack } = useLihState();
  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
    defaultComponentState: undefined as undefined | {},
    objectId: undefined as undefined | string,
    image: undefined as undefined | GameImage,
    category: "lore" as GameEntity["category"],
  });
  useEffect(() => {
    const typeInfo = safe(() => TypeBoxes.schemaToTypeInfo(currentSchema!), {
      quiet: true,
    });
    const entity = gamePack.entities.find((e) => e.id === currentObjectId);
    const defaultObject = entity?.object as {};
    console.log(`schema for ${currentObjectId}`, currentSchema);
    console.log(`typeInfo for ${currentObjectId}`, typeInfo);
    setState((s) => ({
      ...s,
      typeInfo: typeInfo,
      defaultComponentState: defaultObject,
      objectId: currentObjectId,
      image: entity?.image,
      category: entity?.category ?? "lore",
    }));
  }, [currentSchema, currentObjectId, gamePack]);

  // const config = useMemo(
  //   () => ({ typeInfo: state.typeInfo }),
  //   [state.typeInfo]
  // );

  if (!state.typeInfo) {
    return <Stack>Failed to create type info</Stack>;
  }
  return (
    <AiplComponentProvider
      config={{ typeInfo: state.typeInfo }}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack gap={"1em"} direction={"row"}>
        <Stack flexGrow={1}>
          <Stack>
            {state.objectId}
            <StartNewAiplChatButton />
            <SaveObjectButton
              disabled={isUndefined(state.objectId)}
              id={state.objectId ?? ""}
              image={state.image}
              category={state.category}
            />
            <DropdownList
              key={`category-${state.objectId}`}
              onChange={(value) => {
                setState((s) => ({ ...s, category: value }));
              }}
              values={GAME_ENTITY_CATEGORIES}
              label={"Category"}
              selectedValue={state.category}
            />
            <DataImage
              key={`image-${state.objectId}`}
              bytes={state.image?.bytes}
              request={state.image?.request}
              onValueChange={(bytes, request) => {
                console.log("onChange", bytes, request);
                setState((s) => ({ ...s, image: { bytes, request } }));
              }}
            />
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
