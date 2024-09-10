import { Button } from "@mui/material";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { getLihState, updateLihState } from "./state/LihState";
import { storeGamePack } from "./state/GAME_PACK_DB";

export const CreateObjectButton = () => {
  const ctx = useAiplComponentContext();
  if (!ctx?.typeInfo?.schema) {
    return <></>;
  }
  return (
    <Button
      onClick={() => {
        const schema = ctx?.typeInfo?.schema;
        if (!schema) {
          return;
        }
        updateLihState((s) => {
          s.gamePack.entities.push({
            id: `${schema.$id}-${Date.now()}-${crypto.randomUUID()}`,
            schemaName: schema.$id,
            object: ctx.componentState,
          });
        });
        storeGamePack("default", getLihState().gamePack);
      }}
    >
      Create {ctx.typeInfo.schema.$id} Object
    </Button>
  );
};
