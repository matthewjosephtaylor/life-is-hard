import { Button, type ButtonProps } from "@mui/material";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { getLihState, updateLihState } from "./state/LihState";
import { storeGamePack } from "./state/GAME_PACK_DB";

export const SaveObjectButton = ({
  id,
  ...rest
}: { id: string } & ButtonProps) => {
  const ctx = useAiplComponentContext();
  if (!ctx?.typeInfo?.schema) {
    return <></>;
  }
  return (
    <Button
      onClick={() => {
        
        const schema = ctx?.typeInfo?.schema;
        console.log("schema", schema);
        if (!schema) {
          console.error("No schema found in context", ctx);
          return;
        }
        updateLihState((s) => {
          // replace the object in the game pack if it already exists
          const existingEntityIdx = s.gamePack.entities.findIndex(
            (e) => e.id === id
          );
          if (existingEntityIdx !== -1) {
            console.log(
              `Replacing existing entity ${ctx.componentState.id}`,
              ctx.componentState
            );
            s.gamePack.entities[existingEntityIdx] = {
              id,
              schemaName: schema.$id,
              object: ctx.componentState,
            };
            return;
          }

          s.gamePack.entities.push({
            id: `${schema.$id}-${Date.now()}-${crypto.randomUUID()}`,
            schemaName: schema.$id,
            object: ctx.componentState,
          });
        });
        const gamePack = getLihState().gamePack;

        console.log("gamePack", gamePack);
        storeGamePack(gamePack);
      }}
      {...rest}
    >
      Save {ctx.typeInfo.schema.$id} Object
    </Button>
  );
};
