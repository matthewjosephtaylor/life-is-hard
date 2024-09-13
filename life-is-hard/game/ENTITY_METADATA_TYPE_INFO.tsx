import { TypeBoxes } from "@mjtdev/engine";

export const BASIC_ENTITY_METADATA_TYPE_INFO = TypeBoxes.createTypeInfo(
  (Type) => {
    return Type.Object(
      { name: Type.String(), description: Type.String() },
      { $id: "Metadata" }
    );
  }
);

export const GOAL_ENTITY_METADATA_TYPE_INFO = TypeBoxes.createTypeInfo(
  (Type) => {
    return Type.Object(
      {
        name: Type.String(),
        description: Type.String(),
        rewards: Type.String({
          description: "Brief description of rewards for completing the goal",
        }),
      },
      { $id: "Metadata" }
    );
  }
);
