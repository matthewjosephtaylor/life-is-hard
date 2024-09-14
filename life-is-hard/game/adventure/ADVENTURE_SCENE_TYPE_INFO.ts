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
        commands: Type.Array(
          Type.Object(
            {
              action: Type.Union([
                Type.Literal("update"),
                Type.Literal("add"),
                Type.Literal("remove"),
              ]),
              target: Type.String({
                description:
                  "The name of the entity to update, add, or remove.",
              }),
              changes: Type.Record(Type.String(), Type.Any()),
            },
            {
              description:
                "A list of commands to update the game state, including adding, removing, or updating entities. Only create commands for the last Assistant response! Clear out any previous commands! All game types/objects are also known as entities.",
            }
          )
        ),
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
        $id: "SceneUpdate",
        description:
          "Update of the scene, including new commands. MUST BE A correct JSON OBJECT! DO NOT include any comments or extra text! Follow the TypeScript type exactly!",
      }
    );
  });
};
export const ADVENTURE_SCENE_TYPE_INFO = createAdventureSceneTypeInfo();
