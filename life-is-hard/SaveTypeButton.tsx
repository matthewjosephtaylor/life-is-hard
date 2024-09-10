import { TypeBoxes, toMany } from "@mjtdev/engine";
import { Button } from "@mui/material";
import { useAiplValue } from "./common/useAiplValue";
import { saveSchemaToGamePack } from "./DynamicTypeForm";

export const SaveTypeButton = () => {
  const typeDefinition = useAiplValue("typeDefinition");
  return (
    <Button
      onClick={() => {
        const schema = TypeBoxes.typeTextToSchema(
          toMany(typeDefinition).join("")
        );
        saveSchemaToGamePack(schema);
      }}
    >
      Save Type
    </Button>
  );
};
