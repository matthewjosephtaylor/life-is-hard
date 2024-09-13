import { Bytes, Keys, safe } from "@mjtdev/engine";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { memo, useEffect, useState } from "react";
import { useAiplComponentContext } from "../../../src/aipl-components/useAiplComponentContext";
import { AiplClients } from "../../../src/client/AiplClients";
import { nameOfValue } from "../../common/nameOfValue";
import { createAllEntitiesSystemMessage } from "../../entity/createAllEntitiesSystemMessage";
import { ObjectImage } from "../../ObjectImage";
import type { GameEntity } from "../../state/GameEntity";
import type { GameImage } from "../../state/GameImage";
import { useCurrentLocation } from "../../useCurrentLocation";
import { usePc } from "../../usePc";
import { ADVENTURE_SCENE_TYPE_INFO } from "./ADVENTURE_SCENE_TYPE_INFO";

export const AdventureSceneImage = memo(
  ({ npcNames }: { npcNames?: string[] }) => {
    const [state, setState] = useState({
      image: undefined as undefined | GameImage,
      currentLocation: undefined as undefined | GameEntity,
      npcNames: undefined as undefined | string[],
    });
    const ctx = useAiplComponentContext();
    const pc = usePc();
    const currentLocation = useCurrentLocation();
    const updateImage = async ({
      location,
      pc,
      componentState,
    }: {
      componentState?: typeof ADVENTURE_SCENE_TYPE_INFO.type;
      location?: GameEntity;
      pc?: GameEntity;
    }) => {
      const client = AiplClients.createAiplClient();

      const promptRequest = `Create an image generation prompt from the following: ${ADVENTURE_SCENE_TYPE_INFO.schema.$id} with the following properties: ${safe(() => JSON.stringify(componentState), { quiet: true })} `;
      const prompt = await client.ask({
        userMessage: promptRequest,

        systemMessage: [
          createAllEntitiesSystemMessage(),
          `The user/player character is ${nameOfValue(pc?.object)}`,
          `The user/player is at ${nameOfValue(location?.object)}`,
          `The NPCs in the scene are ${npcNames?.join(", ")}`,
          "Focus on what the entire scene looks like, focus on the environment.",
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
        Keys.stableStringify(npcNames) === Keys.stableStringify(state.npcNames)
      ) {
        return;
      }
      setState((s) => ({ ...s, currentLocation, npcNames }));
      const componentState =
        ctx?.componentState as unknown as typeof ADVENTURE_SCENE_TYPE_INFO.type;
      updateImage({
        location: currentLocation,
        pc,
        componentState,
      });
    }, [
      Keys.stableStringify([currentLocation, ctx?.componentState, npcNames]),
    ]);

    return (
      <ObjectImage
        onValueChange={(bytes, request) => {
          setState((s) => ({ ...s, image: { bytes, request } }));
        }}
        object={ctx}
        schemaName={ctx?.typeInfo?.schema.$id}
        {...state.image}
      />
    );
  }
);
