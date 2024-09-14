import { isDefined, isUndefined, Keys, safe, TypeBoxes } from "@mjtdev/engine";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { AiplClients } from "../../../src/client/AiplClients";
import { getBasicEntityMeta } from "../../common/ifGet";
import JsonDisplay from "../../common/JsonDisplay";
import { createAllEntitiesSystemMessage } from "../../entity/createAllEntitiesSystemMessage";
import { createAllTypesSystemMessage } from "../../entity/createAllTypesSystemMessage";
import { GAME_ENTITY_CATEGORIES } from "../../state/GAME_ENTITY_CATEGORIES";
import type { GameEntity } from "../../state/GameEntity";
import { getLihState, updateLihState } from "../../state/LihState";

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
        replacedEntities: Type.Record(
          Type.String({ description: "name of the entity" }),
          Type.Any(),
          {
            description:
              "The updated entity content for updates, the key is the name",
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
            // schemaName: Type.String({
            //   description: "The type of the entity (must be an existing type)",
            // }),
            entityObject: Type.Any(),
          }),
          {
            description:
              "The added entities, the key is the name, be sure to fill out the category and entityObject as separate fields",
          }
        ),
      },
      {
        $id: "EntityChanges",
        description:
          "All typed objects are considered entities, be sure to include the full new object details for updates or adds",
      }
    );
  });
  const systemMessage = [
    createAllTypesSystemMessage(),
    createAllEntitiesSystemMessage(),
    `Result type:`,
    typeInfo.typeDeclaration,
  ].join("\n");
  const userMessage = [
    `JSON output only. create a ${typeInfo.schema.$id} object from the following command: \n\`\`\`json\n${JSON.stringify(command)}\`\`\``,
  ].join("\n");
  const ans = await client.ask({
    systemMessage,
    userMessage,
    toolConfig: { schema: typeInfo.schema },
  });
  console.log(ans);
  const json = safe(() => JSON.parse(ans), {
    quiet: true,
  }) as typeof typeInfo.type;
  console.log(json);
  if (isUndefined(json)) {
    return;
  }

  // update entities
  for (const [name, entity] of Object.entries(json.replacedEntities ?? {})) {
    updateLihState((s) => {
      s.gamePack.entities = s.gamePack.entities.map((e) => {
        if (getBasicEntityMeta(e.meta, (e) => e.name) === name) {
          e.object = entity;
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

export const UpdateWorldContent = ({
  commands: commands,
}: {
  commands?: unknown[];
}) => {
  const [state, setState] = useState({
    commands: undefined as undefined | unknown[],
    prevEntities: undefined as undefined | GameEntity[],
  });
  // const pc = usePc();
  useEffect(() => {
    setState((s) => ({ ...s, commands: commands }));
  }, [Keys.stableStringify([commands])]);

  return (
    <Stack flexWrap={"wrap"} direction={"row"}>
      {state.commands ? (
        <Stack>
          <Button
            onClick={async () => {
              console.log("ACCEPTING");
              if (!state.commands || !Array.isArray(commands)) {
                return;
              }
              setState((s) => ({
                ...s,
                prevEntities: getLihState().gamePack.entities,
              }));
              for (const command of state.commands) {
                updateWorldWithCommand(command);
              }
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              updateLihState((s) => {
                s.gamePack.entities = state.prevEntities ?? s.gamePack.entities;
              });
              setState((s) => ({ ...s, prevEntities: undefined }));
            }}
            disabled={isUndefined(state.prevEntities)}
          >
            Undo
          </Button>
        </Stack>
      ) : undefined}
      <Stack sx={{ height: "30vh", overflow: "auto" }}>
        <JsonDisplay data={state.commands} />
      </Stack>
    </Stack>
  );
};
