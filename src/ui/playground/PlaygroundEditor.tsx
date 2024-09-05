import { isDefined, isUndefined } from "@mjtdev/engine";
import { Flex, type FlexProps } from "@radix-ui/themes";
import type { AppCharacter } from "ai-worker-common";
import { produce } from "immer";
import { useEffect, useMemo, useState } from "react";
import { createSettler } from "../../common/createSettler";
import { DataObjectStates } from "../../state/data-object/DataObjectStates";
import { AppModes } from "../../state/location/AppModes";
import { AiplEditor } from "../aipl/AiplEditor";

export const PlaygroundEditor = (props: FlexProps) => {
  const assistantCharacterId = AppModes.useAppHashParam("assistantId");
  const assistantCharacter =
    DataObjectStates.useDataObject<AppCharacter>(assistantCharacterId);
  const [state, setState] = useState(
    produce(
      {
        assistantCharacter,
      },
      () => {}
    )
  );
  useEffect(() => {
    setState(
      produce(
        {
          assistantCharacter,
        },
        () => {}
      )
    );
  }, [assistantCharacter]);

  const settler = useMemo(
    () =>
      createSettler<AppCharacter>({
        settleAction: (character) => {
          console.log("settleAction", { character });
          DataObjectStates.upsertDataObject({
            objectType: "app-character",
            draft: character,
          });
        },
        settledAfterMs: 1000,
      }),
    []
  );

  return (
    <Flex flexGrow={"1"} gap="0.5em" direction={"column"} {...props}>
      <Flex
        flexGrow={"1"}
        style={{
          // minHeight: "30vh",
          minWidth: "30vw",
          height: "100%",
          width: "100%",
        }}
      >
        <AiplEditor
          characterId={assistantCharacterId}
          fieldName={"description"}
          onChange={(value) => {
            const updated = produce(state, (s) => {
              if (isUndefined(s.assistantCharacter)) {
                return;
              }
              s.assistantCharacter.card.data.description = value;
            });
            setState(updated);
            if (isDefined(updated.assistantCharacter)) {
              settler.update(updated.assistantCharacter);
            }
          }}
          defaultValue={state.assistantCharacter?.card.data.description}
        />
      </Flex>
    </Flex>
  );
};
