import { Bytes, isDefined, safe, type TypeInfo } from "@mjtdev/engine";
import { Divider, Stack } from "@mui/material";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../../../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../../../src/provider/AiplComponentProvider";
import { nameOfValue } from "../../common/nameOfValue";
import { createOtherEntitiesSystemMessage } from "../../createOtherEntitiesSystemMessage";
import { DataImage } from "../../DataImage";
import { createActiveGoalsEntitiesSystemMessage } from "../../entity/createActiveGoalsEntitiesSystemMessage";
import { createAllEntitiesSystemMessage } from "../../entity/createAllEntitiesSystemMessage";
import { createAllTypesSystemMessage } from "../../entity/createAllTypesSystemMessage";
import { GoalAcceptContent } from "../../GoalAcceptContent";
import { StartNewAiplChatButton } from "../../StartNewAiplChatButton";
import type { GameImage } from "../../state/GameImage";
import { UpdatePcStatsContent } from "../../UpdatePcStatsContent";
import { useCurrentLocation } from "../../useCurrentLocation";
import { usePc } from "../../usePc";
import { ADVENTURE_SCENE_TYPE_INFO } from "./ADVENTURE_SCENE_TYPE_INFO";

export const AdventureMainContent = () => {
  const pc = usePc();
  const location = useCurrentLocation();

  const [state, setState] = useState({
    typeInfo: undefined as undefined | TypeInfo,
    defaultComponentState: undefined as undefined | {},
    image: undefined as undefined | GameImage,
    data: undefined as undefined | typeof ADVENTURE_SCENE_TYPE_INFO.type,
  });
  useEffect(() => {
    setState((s) => ({
      ...s,
      typeInfo: ADVENTURE_SCENE_TYPE_INFO,
      defaultComponentState: {},
    }));
  }, []);

  if (!state.typeInfo) {
    return <></>;
  }

  return (
    <AiplComponentProvider
      config={{ typeInfo: state.typeInfo }}
      defaultComponentState={state.defaultComponentState}
    >
      <Stack
        sx={{ width: "100%", overflow: "auto" }}
        direction={"row"}
        gap="1em"
      >
        <Stack sx={{ maxHeight: "100vh", overflow: "auto" }} flexGrow={1}>
          <Stack>
            <DataImage
              onValueChange={(bytes, request) => {
                console.log("onChange", bytes, request);
                setState((s) => ({ ...s, image: { bytes, request } }));
              }}
              {...state.image}
            />
          </Stack>
          <GoalAcceptContent newGoals={state.data?.newGoals} />
          <Divider />
          {/* <JsonDisplay data={state.data?.updatedCharacterStats} /> */}
          <UpdatePcStatsContent
            updatedStats={state.data?.updatedCharacterStats}
          />
          <StartNewAiplChatButton
            systemMessage={[
              createAllTypesSystemMessage(),
              createAllEntitiesSystemMessage(),
              createActiveGoalsEntitiesSystemMessage(),
              `The user/player character is ${nameOfValue(pc?.object)}`,
              `The user/player is at ${nameOfValue(location?.object)}`,
              "You are the game master for this adventure.",
              "be creative and have the user/player character interact with the world.",
              "Use natural language only when communicating with the user/player character unless specifically asked for JSON.",
            ].join("\n")}
          />
        </Stack>
        <Stack sx={{ minWidth: "40ch" }}>
          <AiplChatWindow
            style={{
              minWidth: "40ch",
              maxWidth: "80ch",
              width: "100%",
              flexShrink: 1,
            }}
            onUpdate={async (ctx) => {
              console.log(ctx.componentState);
              setState((s) => ({
                ...s,
                data: ctx.componentState as unknown as typeof ADVENTURE_SCENE_TYPE_INFO.type,
              }));
              if (isDefined(state.image)) {
                return;
              }

              const promptRequest = `Create an image generation prompt from the following: ${ctx.typeInfo?.schema.$id} with the following properties: ${safe(() => JSON.stringify(ctx.componentState), { quiet: true })} `;
              const prompt = await ctx?.client?.ask({
                userMessage: promptRequest,

                systemMessage: [
                  createOtherEntitiesSystemMessage(),
                  `The user/player character is ${nameOfValue(pc?.object)}`,
                  `The user/player is at ${nameOfValue(location?.object)}`,
                  "Focus on what the entire scene looks like, focus on the environment.",
                  "use all image generation prompt engineering techniques to generate the best image possible. Only return the prompt itself!",
                ].join(),
              });
              console.log(prompt);

              const imageGenRequest: Partial<SdApiTxt2ImgRequest> = { prompt };
              const blobs =
                await ctx?.client?.askForGeneratedImages(imageGenRequest);
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
            }}
          />
        </Stack>
      </Stack>
    </AiplComponentProvider>
  );
};
