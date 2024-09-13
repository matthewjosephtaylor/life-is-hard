import { isDefined, TypeBoxes } from "@mjtdev/engine";
import { getLihState } from "../../state/LihState";
import { ifGet } from "../../common/ifGet";
import { BASIC_ENTITY_METADATA_TYPE_INFO } from "../ENTITY_METADATA_TYPE_INFO";

const createAdventureSceneTypeInfo = () => {
  const locationNames = getLihState()
    .gamePack.entities.filter((e) => e.category === "location")
    .map((location) =>
      ifGet(BASIC_ENTITY_METADATA_TYPE_INFO, location, (l) => l.name)
    )
    .filter(isDefined);
  return TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        sceneText: Type.String({
          description: "A paragraph of text describing the current scene.",
        }),
        newGoals: Type.Array(Type.Any(), {
          description:
            "A list of new goals for the user to choose from, or empty if no new goals, be sure to fill out the goal objects completely",
        }),
        updatedCharacterStats: Type.Any({
          description:
            "A list of updated character stats, or empty if no updates from last interaction",
        }),
        didExit: Type.Boolean({
          description:
            "A boolean that is true if the user exited the scene in some way",
        }),
        currentLocation: Type.Optional(
          Type.Union(
            locationNames.map((name) => Type.Literal(name)),
            {
              description:
                "The name of the location that the user is currently in (existing locations only)",
            }
          )
        ),
        options: Type.Array(
          Type.Object({
            name: Type.String({ description: "The name of the option." }),
            reason: Type.Optional(
              Type.String({
                description:
                  "The reason for the option based on the abilities of the player character or situation",
              })
            ),
            isExit: Type.Boolean(),
            changedLocation: Type.Optional(
              Type.String({
                description:
                  "The name of the location that the user has moved to (existing locations only)",
              })
            ),
          }),
          {
            description:
              "A list of options for the user to choose from to continue the scene, including one that will exit the scene in some way.",
          }
        ),
      },
      {
        $id: "AdventureSceneState",
        description:
          "the most recent state of the scene after last assistant message, DO NOT USE the PREVIOUS state on response",
      }
    );
  });
};
export const ADVENTURE_SCENE_TYPE_INFO = createAdventureSceneTypeInfo();
