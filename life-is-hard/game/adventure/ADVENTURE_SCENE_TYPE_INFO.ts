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
        sceneSummary: Type.String({
          description:
            "A short text describing the current scene as of the last interaction.",
        }),
        // commands: Type.Array(Type.Any(), {
        //   description:
        //     "A list of command style objects used to update the entities inside the scene.",
        // }),
        commands: Type.Array(
          Type.Object(
            {
              action: Type.Union([
                Type.Literal("update"),
                Type.Literal("add"),
                Type.Literal("remove"),
              ]),
              targetEntityName: Type.String({
                description:
                  "The name of the existing entity to update, add, or remove.",
              }),
              // changes: Type.Record(Type.String(), Type.Any()),
              changes: Type.Any(),
            },
            {
              description:
                "A list of command objects used to update the entity, or add/remove entities inside the scene from the players last interaction.",
            }
          )
        ),
        npcNames: Type.Array(
          Type.Union([
            ...npcNames.map((name) => Type.Literal(name)),
            Type.String(),
          ]),
          {
            description: "NPC names that are present in the scene",
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
        $id: "UpdatedSceneState",
      }
    );
  });
};
export const ADVENTURE_SCENE_TYPE_INFO = createAdventureSceneTypeInfo();
