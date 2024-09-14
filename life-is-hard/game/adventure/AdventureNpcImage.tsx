import { Bytes, Keys, isDefined, isUndefined } from "@mjtdev/engine";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { memo, useEffect, useState } from "react";
import { useAiplComponentContext } from "../../../src/aipl-components/useAiplComponentContext";
import { AiplClients } from "../../../src/client/AiplClients";
import { getBasicEntityMeta } from "../../common/ifGet";
import { ObjectImage } from "../../ObjectImage";
import type { GameEntity } from "../../state/GameEntity";
import type { GameImage } from "../../state/GameImage";
import { useLihState } from "../../state/LihState";
import { useCurrentLocation } from "../../useCurrentLocation";

export const AdventureNpcImage = memo(({ npcName }: { npcName: string }) => {
  const [state, setState] = useState({
    image: undefined as undefined | GameImage,
    currentLocation: undefined as undefined | GameEntity,
    npcName: undefined as undefined | string,
  });
  const ctx = useAiplComponentContext();
  const currentLocation = useCurrentLocation();
  const { gamePack } = useLihState();
  const entity = gamePack.entities
    .filter((e) => e.category === "npc")
    .find((e) => getBasicEntityMeta(e.meta, (e) => e.name) === npcName);
  if (isUndefined(entity)) {
    console.log(`Could not find entity with name: ${npcName}`);
    console.log(gamePack.entities);
    // createNpcCharacter(npcName);
  }
  const updateImage = async ({ entity }: { entity?: GameEntity }) => {
    if (isUndefined(entity)) {
      return;
    }
    if (isDefined(entity.image)) {
      setState((s) => ({ ...s, image: entity.image }));
      return;
    }
    const client = AiplClients.createAiplClient();

    // const promptRequest = `Create an image generation prompt from the following: ${ADVENTURE_SCENE_TYPE_INFO.schema.$id} with the following properties: ${safe(() => JSON.stringify(componentState), { quiet: true })} `;

    const promptRequest = `Create an image generation prompt from the following ${entity.schemaName}: ${JSON.stringify(entity)}`;

    const prompt = await client.ask({
      userMessage: promptRequest,

      systemMessage: [
        // createAllEntitiesSystemMessage(),
        // `The user/player character is ${nameOfValue(pc?.object)}`,
        // `The user/player is at ${nameOfValue(location?.object)}`,
        // `The NPCs in the scene are ${npcNames?.join(", ")}`,
        // "Focus on what the entire scene looks like, focus on the environment.",
        "use all image generation prompt engineering techniques to generate the best image possible. Only return the prompt itself!",
      ].join(),
    });
    console.log(prompt);

    const imageGenRequest: Partial<SdApiTxt2ImgRequest> = { prompt };
    const blobs = await client.askForGeneratedImages(imageGenRequest);
    console.log(blobs);
    if (!blobs || blobs.length === 0) {
      return;
    }
    const bytes = await Bytes.toArrayBuffer(blobs[0]);
    const image: GameImage = {
      bytes,
      request: imageGenRequest,
    };
    setState((s) => ({ ...s, image }));
  };

  useEffect(() => {
    if (
      state.currentLocation === currentLocation &&
      Keys.stableStringify(npcName) === Keys.stableStringify(state.npcName)
    ) {
      return;
    }
    setState((s) => ({ ...s, currentLocation, npcName }));
    updateImage({
      entity,
    });
  }, [currentLocation, npcName, entity]);

  return (
    <Card>
      <CardContent>
        <Stack>
          <ObjectImage
            style={{
              maxWidth: "3em",
              height: "3em",
              objectFit: "contain",
            }}
            onValueChange={(bytes, request) => {
              setState((s) => ({ ...s, image: { bytes, request } }));
            }}
            object={entity}
            schemaName={ctx?.typeInfo?.schema.$id}
            {...state.image}
          />
          <Typography>{npcName}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
});
