import { Animates, Babs, waitTimeout, type BabEngine } from "@mjtdev/engine";
import { createVoxScene } from "./createVoxScene";
import { createVoxTicker } from "./createVoxTicker";

export const voxPainter = async ({
  engine,
  micAudioContext,
  micSource,
}: {
  engine: BabEngine;
  micAudioContext?: AudioContext;
  micSource?: MediaStreamAudioSourceNode;
}) => {
  engine.enableOfflineSupport = false;
  const observer = new ResizeObserver(() => {
    engine.resize();
  });

  const resizeTarget = engine.getRenderingCanvas()?.parentElement;
  if (resizeTarget) {
    observer.observe(resizeTarget);
  }
  engine.resize();
  const { scene, sps } = await createVoxScene({ engine });
  console.log("vox scene created!");
  const ticker = await createVoxTicker({
    scene,
    sps,
    micAudioContext,
    micSource,
  });
  // const start = performance.now();
  // console.log("calling ticker...");
  // for (let i = 0; i < 100; i++) {
  //   ticker();
  // }
  // await waitTimeout(1 * 1000);
  // const end = performance.now();
  // console.log(`called ticker...: ${end - start}`);
  // scene.render();
  const animator = Animates.create({ ticker });

  return () => {
    console.log("disposing of visualizer");
    animator.destroy();
    engine.dispose();
    observer.disconnect();
  };
};
