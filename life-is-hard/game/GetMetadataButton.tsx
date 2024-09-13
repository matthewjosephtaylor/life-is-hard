import { type TypeInfo, isUndefined } from "@mjtdev/engine";
import { Button } from "@mui/material";
import { useAiplComponentContext } from "../../src/aipl-components/useAiplComponentContext";
import { askForMetadata } from "../common/askForMetadata";
import type { GameEntity } from "../state/GameEntity";

export const GetMetadataButton = ({
  entity,
  metadataTypeInfo,
  onUpdate,
}: {
  entity: GameEntity;
  metadataTypeInfo: TypeInfo;
  onUpdate: (metadata: typeof metadataTypeInfo.type) => void;
}) => {
  const ctx = useAiplComponentContext();
  return (
    <Button
      onClick={async () => {
        const metadata = await askForMetadata({
          client: ctx?.client,
          object: entity.object,
          metadataTypeInfo,
        });
        if (isUndefined(metadata)) {
          return;
        }
        onUpdate(metadata);
      }}
    >
      Metadata
    </Button>
  );
};
