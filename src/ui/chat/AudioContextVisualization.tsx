import type { CanvasPainter } from "@mjtdev/engine";
import { Animates, Arrays, Canvas, Colors, Maths } from "@mjtdev/engine";
import { memo, type CSSProperties } from "react";
import { useAppState } from "../../state/app/AppState";

type Bar = {
  i: number;
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
};

export const AudioContextVisualization = memo(
  ({
    sourceId = crypto.randomUUID(),
    style,
    audioContext,
    getSource,
    fftSize = 2048,
    color = "green",
  }: {
    sourceId?: string;
    color?: string;
    fftSize?: number;
    style?: CSSProperties;
    audioContext: AudioContext | undefined;
    // source: () => AudioBufferSourceNode | undefined;
    getSource: () =>
      | MediaStreamAudioSourceNode
      | AudioBufferSourceNode
      | undefined;
  }) => {
    const { appearance } = useAppState();
    const painter: CanvasPainter = (canvas) => {
      if (!canvas) {
        console.log("no canvas");
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // const { audioContext } = getTtsState();
      // const audioContext = getAudioContext();
      // const audioContext = new AudioContext();
      if (!audioContext) {
        console.log("NO AC");
        // ctx.fillStyle = "green";
        // ctx.fillRect(0, 0, canvas.width, canvas.height);
        return;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const analyzer = audioContext.createAnalyser();
      // analyzer.fftSize = 2048;
      // analyzer.fftSize = 1024;
      analyzer.fftSize = fftSize;
      const dataArray = new Uint8Array(analyzer.frequencyBinCount / 2);
      const width = canvas.width / dataArray.length;
      const bars: Bar[] = Arrays.from(dataArray.length).map((_, i) => ({
        i,
        x: (i / dataArray.length) * canvas.width,
        // y: canvas.height / 2,
        y: canvas.height,
        color: "",
        height: 0,
        width,
      }));
      // ctx.translate(0, canvas.height / 4);

      ctx.fillStyle = color;
      const ac = Animates.create({
        ticker: () => {
          const currentSource = getSource();
          // const { currentSource } = getTtsState();
          if (currentSource) {
            currentSource.connect(analyzer);
          }
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          analyzer.getByteFrequencyData(dataArray);

          for (const bar of bars) {
            const { i } = bar;
            const sample = dataArray[i] / 256;
            // const sample = dataArray[i] / 16;
            bar.height = Maths.lerp(bar.height, sample, 0.3);
            ctx.fillRect(
              bar.x,
              bar.y,
              bar.width,
              // Math.min(-(bar.height * canvas.height) / 4, -10)
              Math.min(-(bar.height * canvas.height), -10)
            );
          }
        },
      });

      return Promise.resolve(() => {
        ac.abort = true;
      });
    };

    return (
      <Canvas
        key={appearance}
        style={{
          // backgroundColor: 'blue',

          ...style,
        }}
        painter={painter}
      />
    );
  },
  (a, b) => {
    return a.sourceId === b.sourceId;
  }
);
