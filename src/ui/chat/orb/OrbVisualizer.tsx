import { Babs, Cameras, Canvas, Colors, Htmls, Scenes } from "@mjtdev/engine";
import { Flex } from "@radix-ui/themes";
import { memo } from "react";
import { createVoxSps } from "./createVoxSps";
import { voxPainter } from "./voxPainter";
import { useAsrState } from "../../../asr-webkit/AsrState";
import { useCustomAsrState } from "../../../asr-custom/updateCustomAsrState";

export const OrbVisualizer = memo(() => {
  const { micContext, micSource } = useCustomAsrState();
  return (
    <Flex flexGrow={"1"} direction={"column"} align={"center"}>
      <Canvas
        style={{ maxHeight: "50vh" }}
        painter={async (canvas) => {
          /**
           * HACK! Babylonjs does something evil on init of SPS?
           * No idea why but have to create/dispose of the _first_ SPS
           * Huge performance penalties on first SPS for unknown reason
           * All subsequent are fine
           */
          const engine = Babs.createEngine({
            canvas,
            doNotHandleContextLost: true,
            audioEngine: false,
          });
          {
            const scene = Scenes.createScene(engine);
            scene.clearColor = Babs.c4(
              Colors.from("black").alpha(0).toString()
            );
            Cameras.getArcRotateCamera(scene, "Camera", {});

            const sps = await createVoxSps({ scene });
            scene.render();

            scene.dispose();
          }

          return voxPainter({
            engine,
            micAudioContext: micContext,
            micSource: micSource,
          });
        }}
      />
    </Flex>
  );
});
