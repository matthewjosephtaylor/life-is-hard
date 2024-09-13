import { isDefined } from "@mjtdev/engine";
import type { GameEntity } from "./state/GameEntity";
import { getLihState } from "./state/LihState";

export const valueToCategoryEntity = ({
  value,
  category,
}: {
  value: unknown;
  category: GameEntity["category"];
}) => {
  const schemas = getLihState()
    .gamePack.entities.filter((entity) => entity.category === category)
    .map((entity) =>
      getLihState().gamePack.schemas.find(
        (schema) => schema.$id === entity.schemaName
      )
    )
    .filter(isDefined);
  return schemas
    .map((schema) => {
      // TODO validation isn't working
      // const typeInfo = TypeBoxes.schemaToTypeInfo(schema);
      // console.log(`typeInfo for ${schema.$id}`, { typeInfo, schema, value });
      // if (!typeInfo.validate(value)) {
      //   console.error("value does not validate", { value, schema });
      //   return undefined;
      // }
      // console.log("value validates", { value, schema });
      return {
        id: `${schema.$id}-${Date.now()}-${crypto.randomUUID()}`,
        category,
        object: value,
        schemaName: schema.$id,
      } satisfies GameEntity;
    })
    .filter(isDefined);
};
