import { Stack } from "@mui/material";
import { useEffect } from "react";
import { useAiplComponentContext } from "../../../src/aipl-components/useAiplComponentContext";
import { useLihState } from "../../state/LihState";
import { BASIC_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";
import { updateGameEntityMetadataIfNotExist } from "../updateGameEntityMetadataIfNotExist";
import { CategoryContent } from "./CategoryContent";
import { ButtonGroup } from "../../common/ButtonGroup";
import type { GameEntity } from "../../state/GameEntity";
import { gcCategory } from "./gcCategory";

export const CategoryListContent = ({
  category,
}: {
  category: GameEntity["category"];
}) => {
  const { gamePack } = useLihState();
  const ctx = useAiplComponentContext();
  useEffect(() => {
    const goals = gamePack.entities.filter(
      (entity) => entity.category === category
    );
    goals.forEach((goal) => {
      if (!ctx?.client) {
        return;
      }
      updateGameEntityMetadataIfNotExist({
        client: ctx.client,
        entity: goal,
        metadataTypeInfo: BASIC_ENTITY_METADATA_TYPE_INFO,
      });
    });
  }, [gamePack, ctx]);
  return (
    <Stack direction={"row"} flexWrap={"wrap"}>
      <ButtonGroup
        actions={{
          gc: () => {
            gcCategory(category);
          },
        }}
      />
      {gamePack.entities
        .filter((entity) => entity.category === category)
        .map((goal) => (
          <CategoryContent key={goal.id} entity={goal} />
        ))}
    </Stack>
  );
};


