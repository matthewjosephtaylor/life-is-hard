import {
  Bytes,
  isDefined,
  safe,
  TypeBoxes,
  type TypeInfo,
} from "@mjtdev/engine";
import { Stack } from "@mui/material";
import type { SdApiTxt2ImgRequest } from "ai-worker-common";
import { useEffect, useState } from "react";
import { AiplChatWindow } from "../src/aipl-components/AiplChatWindow";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import JsonDisplay from "./common/JsonDisplay";
import { nameOfValue } from "./common/nameOfValue";
import { TextBox } from "./common/TextBox";
import { createOtherEntitiesSystemMessage } from "./createOtherEntitiesSystemMessage";
import { DataImage } from "./DataImage";
import { StartNewAiplChatButton } from "./StartNewAiplChatButton";
import type { GameImage } from "./state/GameImage";
import { useCurrentLocation } from "./useCurrentLocation";
import { usePc } from "./usePc";
import { createOtherTypesSystemMessage } from "./createOtherTypesSystemMessage";
import { createAllTypesSystemMessage } from "./createAllTypesSystemMessage";
import { createAllEntitiesSystemMessage } from "./createAllEntitiesSystemMessage";

const createAdventureSceneTypeInfo = () => {
  return TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        sceneText: Type.String({
          description: "A paragraph of text describing the scene.",
        }),
        newGoals: Type.Array(
          Type.Any(),
          // Type.Object({
          //   goalName: Type.String({ description: "The name of the action." }),
          //   goalDescription: Type.String({
          //     description: "A description of the action.",
          //   }),
          //   goalCompetionAmount: Type.Number({
          //     description:
          //       "The amount of completion needed to complete the goal. from 0 to 100",
          //   }),
          //   goalReward: Type.Object({
          //     rewardName: Type.String({
          //       description: "The name of the reward.",
          //     }),
          //     rewardDescription: Type.String({
          //       description: "A description of the reward.",
          //     }),
          //   }

          // ),
          // }
          // ),
          {
            description:
              "A list of new goals for the user to choose from, or empty if no new goals, be sure to fill out the goal objects completely",
          }
        ),
      },
      { $id: "AdventureScene" }
    );
  });
};
const ADVENTURE_SCENE_TYPE_INFO = createAdventureSceneTypeInfo();

// export const AdventureButtons = ({
//   data,
// }: {
//   data?: typeof ADVENTURE_SCENE_TYPE_INFO.type;
// }) => {
//   console.log("AdventureButtons", data);
//   if (!data) {
//     return <></>;
//   }
//   const ctx = useAiplComponentContext();
//   if (!ctx) {
//     return <></>;
//   }
//   const toolConfig = useToolConfig();
//   const buttons = data?.goalActions?.map((action) => {
//     return (
//       <Stack>
//         <Tooltip title={action?.actionDescription}>
//           <Button
//             onClick={(evt) => {
//               console.log("onClick action", action);
//               console.log("onClick toolConfig", toolConfig);
//               ctx.client?.addChatUserMessage({
//                 text: action.actionDescription,
//                 toolConfig,
//               });
//             }}
//           >
//             {action?.actionName}
//           </Button>
//         </Tooltip>
//       </Stack>
//     );
//   });
//   return (
//     <Stack flexWrap={"wrap"} direction={"row"}>
//       {buttons}
//     </Stack>
//   );
// };

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
      typeInfo: createAdventureSceneTypeInfo(),
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
          {/* <TextBox
            sx={{
              minWidth: "40ch",
            }}
            aiplName="sceneText"
            multiline
            rows={20}
          /> */}
          {/* <AdventureButtons
            data={state.data as typeof ADVENTURE_SCENE_TYPE_INFO.type}
          /> */}
          <Stack>
            <DataImage
              onValueChange={(bytes, request) => {
                console.log("onChange", bytes, request);
                setState((s) => ({ ...s, image: { bytes, request } }));
              }}
              {...state.image}
            />
          </Stack>
          <JsonDisplay data={state.data} />
          <StartNewAiplChatButton
            systemMessage={[
              createAllTypesSystemMessage(),
              createAllEntitiesSystemMessage(),
              `The user/player character is ${nameOfValue(pc?.object)}`,
              `The user/player is at ${nameOfValue(location?.object)}`,
              "You are the game master for this adventure.",
              "be creative and have the user/player character interact with the world.",
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
