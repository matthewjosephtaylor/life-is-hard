import { isDefined, TypeBoxes } from "@mjtdev/engine";
import { getBasicEntityMeta } from "../../common/ifGet";
import { getLihState } from "../../state/LihState";

const createAdventureSceneTypeInfo = () => {
  const { gamePack } = getLihState();
  const locationNames = gamePack.entities
    .filter((e) => e.category === "location")
    .map((location) => getBasicEntityMeta(location.meta, (l) => l.name))
    .filter(isDefined);
  const npcNames = gamePack.entities
    .filter((e) => e.category === "npc")
    .map((npc) => getBasicEntityMeta(npc.meta, (l) => l.name))
    .filter(isDefined);

  return TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        sceneText: Type.String({
          description:
            "A paragraph of text describing the current scene as of the last interaction.",
        }),
        newGoals: Type.Array(Type.Any(), {
          description:
            "A list of new goals for the user to choose from, or empty if no new goals, be sure to fill out the goal objects completely",
        }),
        updatedPlayerCharacterStats: Type.Any({
          description:
            "A list of updated player character stats, or empty if no updates from last interaction",
        }),
        didExit: Type.Boolean({
          description:
            "A boolean that is true if the user exited the scene without changing location",
        }),
        npcs: Type.Array(
          Type.Union([
            ...npcNames.map((name) => Type.Literal(name)),
            Type.String(),
          ]),
          {
            description:
              "NPCs that are present in the scene, Names ONLY, it is OK to have an unknown character, MUST be a unique character name, not generic!",
          }
        ),
        currentLocation: Type.Optional(
          Type.Union(
            locationNames.map((name) => Type.Literal(name)),
            {
              description:
                "The name of the location that the user is currently in Names ONLY",
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
        $id: "SceneAndPlayerCharacterStateUpdate",
        description:
          "the most recent state of the scene and player after last assistant message, update the goals and stats as needed if there are new ones from the last interaction",
      }
    );
  });
};
export const ADVENTURE_SCENE_TYPE_INFO = createAdventureSceneTypeInfo();
