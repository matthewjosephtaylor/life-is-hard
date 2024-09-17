import { isDefined, isUndefined, safe, TypeBoxes } from "@mjtdev/engine";
import YAML from "yaml";
import { AiplClients } from "../../../src/client/AiplClients";
import { getBasicEntityMeta } from "../../common/ifGet";
import { createAllEntitiesSystemMessage } from "../../entity/createAllEntitiesSystemMessage";
import { GAME_ENTITY_CATEGORIES } from "../../state/GAME_ENTITY_CATEGORIES";
import type { GameEntity } from "../../state/GameEntity";
import { getLihState, updateLihState } from "../../state/LihState";
import { uglyJsonObjectToCleanObject } from "../../common/uglyJsonObjectToCleanObject";

export const updateWorldWithCommand = async (command: unknown) => {
  console.log("command", command);
  if (isUndefined(command)) {
    return;
  }
  const client = AiplClients.createAiplClient();
  const { gamePack } = getLihState();
  const typeInfo = TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        updatedEntities: Type.Record(
          Type.String({ description: "name of the entity" }),
          Type.Any({}),
          {
            description: "The updated entity object",
          }
        ),
        removedEntityNames: Type.Array(Type.String(), {
          description: "The names of the removed entities",
        }),
        addedEntities: Type.Record(
          Type.String({ description: "name of the entity" }),
          Type.Object({
            category: Type.Union(
              GAME_ENTITY_CATEGORIES.map((cat) => Type.Literal(cat)),
              { description: "The category of the entity" }
            ),
            entityObject: Type.Any(),
          }),
          {
            description:
              "The added entities, the key is the name, be sure to fill out the category and entityObject as separate fields, NOTE the full entityObject must be included!",
          }
        ),
      },
      {
        $id: "WorldEntityChanges",
        description:
          "All world objects are considered entities, with the full new object details for added entities",
      }
    );
  });

  const commandType = TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
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
          "A list of command objects used to update the entity, or add/remove entities inside the scene.",
      }
    );
  });

  const typeName = typeInfo.schema.$id!;
  const systemMessage = [
    // createAllTypesSystemMessage(),
    createAllEntitiesSystemMessage(),
    "```typescript",
    typeInfo.typeDeclaration,
    commandType.typeDeclaration,
    "```",
    // `YAML only.`,
    // "Complete and correct objects only",
    `As a system designed to create ${typeName} YAML responses only`,
    `Create a YAML markdown snippet object that closely follows the ${typeName} type`,
    `Follow the ${typeName} type exactly`,
    `Be sure to start all responses with \`\`\`yaml`,
    // `update the current ${typeName} following the instruction or or output an error or nothing if the user wants something not possible, or there are no changes.`,
  ].join("\n");
  const userMessage = [
    // "Use the existing entities ",
    `YAML markdown snippet beginning \`\`\`yaml only. Use the existing entities and the following ${commandType.schema.$id} to create a ${typeName}: \n\`\`\`json\n${JSON.stringify(command)}\n\`\`\``,
  ].join("\n");
  const ans = await client.ask({
    systemMessage,
    userMessage,
    toolConfig: { schema: typeInfo.schema },
  });
  console.log(ans);
  const json = safe(
    () => uglyJsonObjectToCleanObject(YAML.parse(ans), typeName),
    {
      // quiet: true,
    }
  ) as typeof typeInfo.type;
  console.log(json);
  if (isUndefined(json)) {
    return;
  }
  // if (isDefined((json as any)[typeName])) {
  //   console.log("found type name as top object, rewriting json");
  //   json = (json as any)[typeName];
  // }

  // update entities
  for (const [name, entity] of Object.entries(json.updatedEntities ?? {})) {
    console.log(`updating entity: ${name}`, entity);
    updateLihState((s) => {
      s.gamePack.entities = s.gamePack.entities.map((e) => {
        if (getBasicEntityMeta(e.meta, (e) => e.name) === name) {
          e.object = { ...(e.object ?? {}), ...entity };
        }
        return e;
      });
    });
  }
  // add entities
  for (const [name, categorizedEntity] of Object.entries(
    json.addedEntities ?? {}
  )) {
    if (
      isDefined(
        gamePack.entities.find(
          (e) => getBasicEntityMeta(e.meta, (e) => e.name) === name
        )
      )
    ) {
      console.log(`Entity with name ${name} already exists`);
      continue;
    }
    updateLihState((s) => {
      const schemaName = gamePack.entities.find(
        (e) => e.category === categorizedEntity.category
      )?.schemaName;
      if (isUndefined(schemaName)) {
        console.error(
          `No schema found for category ${categorizedEntity.category}`
        );
        console.log("categorizedEntity", categorizedEntity);
        return;
      }
      const entity: GameEntity = {
        id: `${schemaName}-${Date.now()}-${crypto.randomUUID()}`,
        category: categorizedEntity.category,
        meta: { name },
        object: categorizedEntity.entityObject,
      };
      console.log("adding entity", entity);
      s.gamePack.entities.push(entity);
    });
  }

  // remove entities
  for (const name of json.removedEntityNames ?? []) {
    console.log("removing entity", name);
    updateLihState((s) => {
      s.gamePack.entities = s.gamePack.entities.filter(
        (e) => getBasicEntityMeta(e.meta, (e) => e.name) !== name
      );
    });
  }
};
