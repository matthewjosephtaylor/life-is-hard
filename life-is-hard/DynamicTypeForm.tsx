import { type TypeInfo, isUndefined, safe, TypeBoxes, toMany } from "@mjtdev/engine";
import { useState, useEffect } from "react";
import { SchemaForm } from "./common/SchemaForm";
import { useAiplValue } from "./common/useAiplValue";
import { storeGamePack } from "./state/GAME_PACK_DB";
import { updateLihState, getLihState } from "./state/LihState";
import type { StoryForm } from "./StoryForm";


export const DynamicTypeForm = ({
  aiplName, ...rest
}: {
  aiplName: string;
} & Parameters<typeof StoryForm>[0]) => {
  const [state, setState] = useState({
    schema: undefined as TypeInfo["schema"] | undefined,
  });
  const value = useAiplValue(aiplName);

  useEffect(() => {
    if (isUndefined(value)) {
      return;
    }
    const schema = safe(
      () => TypeBoxes.typeTextToSchema(toMany(value).join("")),
      { quiet: true }
    );
    setState({ schema });
  }, [value]);

  if (isUndefined(state.schema)) {
    return <></>;
  }

  return (
    <SchemaForm
      key={`${crypto.randomUUID()}`}
      sx={{ margin: "0.5em" }}
      schema={state.schema}
      data={{}}
      onValueChange={(field, value) => {
        console.log("onValueChange", field, value);
      }}
      {...rest} />
  );
};

export const saveSchemaToGamePack = (schema: TypeInfo["schema"]) => {
  updateLihState((s) => {
    const gamePack = s.gamePack;
    if (!gamePack) {
      return;
    }
    gamePack.schemas.push(schema);
  });
  const { gamePack } = getLihState();
  if (!gamePack) {
    return;
  }
  storeGamePack("default", gamePack);
};
