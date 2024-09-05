import {
  Babs,
  Cameras,
  Colors,
  Lights,
  Materials,
  Meshes,
  Scenes,
  Textures,
  waitTimeout,
  type BabEngine,
} from "@mjtdev/engine";
import { createVoxSps } from "./createVoxSps";
import { waitFor } from "../../common/waitFor";

export const waitUntilReady = async (check: () => boolean, pollMs = 20) => {
  while (!check()) {
    await waitTimeout(pollMs);
    console.log("waiting");
  }
  return;
};

export const WHITE_TEXTURE_NAME = "white-texture";
const whitePixelDataUrl =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjuPLI4D8AB1oC5tBrodsAAAAASUVORK5CYII=";

export const createVoxScene = async ({ engine }: { engine: BabEngine }) => {
  const scene = Scenes.createScene(engine);
  scene.clearColor = Babs.c4(Colors.from("black").alpha(0).toString());
  Cameras.getArcRotateCamera(scene, "Camera", {});

  const light = Lights.getHemisphericLight(scene, "light1", {
    direction: [0, 0, 0],
    intensity: 1,
  });
  light.specular = Babs.c3(Colors.from("black").alpha(0).toString());

  const whiteTex = Textures.getPathTexture(scene, WHITE_TEXTURE_NAME, {
    src: whitePixelDataUrl,
  });

  const orbMat = Materials.getMaterial(scene, "mat", {});
  // await waitUntilReady(() => orbMat.isReady());

  const orbMesh = Meshes.getSphere(scene, "orb", {
    radius: 0.1,
    material: orbMat.name,
    position: [0, 0, 0],
  });
  // orbMat.wireframe = true;
  orbMesh.useVertexColors = true;
  // orbMesh.visibility = 0;
  orbMesh.visibility = 0.01;
  const sps = await createVoxSps({ scene });
  const spsMesh = sps.mesh;
  spsMesh.parent = orbMesh;

  return { scene, sps, orbMesh };

  // return () => {
  //   scene.dispose();
  // };
};
