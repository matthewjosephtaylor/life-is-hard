import { TypeBoxes } from "@mjtdev/engine";

const createAdventureSceneTypeInfo = () => {
  return TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        sceneText: Type.String({
          description: "A paragraph of text describing the scene.",
        }),
        newGoals: Type.Array(Type.Any(), {
          description:
            "A list of new goals for the user to choose from, or empty if no new goals, be sure to fill out the goal objects completely",
        }),
        updatedCharacterStats: Type.Any({
          description:
            "A list of updated character stats, or empty if no updates from last interaction",
        }),
      },
      {
        $id: "AdventureSceneNextState",
        description:
          "the most recent state of the scene after last user interaction, DO NOT USE the PREVIOUS state on response",
      }
    );
  });
};
export const ADVENTURE_SCENE_TYPE_INFO = createAdventureSceneTypeInfo();
