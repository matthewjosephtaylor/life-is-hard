import { TypeBoxes, toMany } from "@mjtdev/engine";
import { Button } from "@mui/material";
import { useAiplValue } from "./common/useAiplValue";
import { saveSchemaToGamePack } from "./DynamicTypeForm";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { updateLihState } from "./state/LihState";

export const SaveTypeButton = () => {
  const typeDefinition = useAiplValue("typeDefinition");
  return (
    <Button
      onClick={() => {
        console.log("typeDefinition", typeDefinition);
        const schema = TypeBoxes.typeTextToSchema(
          toMany(typeDefinition).join("")
        );
        console.log(schema);
        saveSchemaToGamePack(schema);
      }}
    >
      Save Type
    </Button>
  );
};


