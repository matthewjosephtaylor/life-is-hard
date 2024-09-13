import type { TypeInfo } from "@mjtdev/engine";
import type { AiplClient } from "../../src/client/AiplClients";
import { askForMetadata } from "../common/askForMetadata";
import type { GameEntity } from "../state/GameEntity";
import { updateLihState } from "../state/LihState";

export const updateGameEntityMetadataIfNotExist = async ({
  client,
  entity,
  metadataTypeInfo,
}: {
  client: AiplClient;
  entity: GameEntity;
  metadataTypeInfo: TypeInfo;
}) => {
  if (metadataTypeInfo.validate(entity.meta)) {
    return entity;
  }
  const metadata = await askForMetadata({
    client,
    object: entity.object,
    metadataTypeInfo,
  });
  // if (!metadataTypeInfo.validate(metadata)) {
  //   return entity;
  // }
  updateLihState((s) => ({
    ...s,
    gamePack: {
      ...s.gamePack,
      entities: s.gamePack.entities.map((e) =>
        e.id === entity.id ? { ...e, meta: metadata } : e
      ),
    },
  }));
  return { ...entity, meta: metadata };
};
