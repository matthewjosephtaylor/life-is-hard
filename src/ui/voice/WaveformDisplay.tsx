import type { ByteLike } from "@mjtdev/engine";
import { Bytes, Colors } from "@mjtdev/engine";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type CanvasHTMLAttributes,
} from "react";
import { useAppState } from "../../state/app/AppState";

export const WaveformDisplay = ({
  audio,
  style,
}: {
  audio: ByteLike | undefined;
  style?: CSSProperties;
}) => {
  const { appearance = "dark" } = useAppState();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawWaveform = (audioBuffer: AudioBuffer) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const width = canvas.width;
    const height = canvas.height;
    const channelData = audioBuffer.getChannelData(0); // Get data from the first channel
    const step = Math.ceil(channelData.length / width);
    const amp = height / 2;

    ctx.fillStyle = Colors.from("black").alpha(0).toString();
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = appearance === "dark" ? "white" : "black";
    ctx.beginPath();

    for (let i = 0; i < width; i++) {
      let min = 1.0;
      let max = -1.0;
      for (let j = 0; j < step; j++) {
        const datum = channelData[i * step + j];
        if (datum < min) min = datum;
        if (datum > max) max = datum;
      }
      ctx.moveTo(i, (1 + min) * amp);
      ctx.lineTo(i, (1 + max) * amp);
    }
    ctx.stroke();
  };

  useEffect(() => {
    if (!audio) {
      return;
    }
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    Bytes.toArrayBuffer(audio).then((audioBuffer) => {
      audioCtx.decodeAudioData(
        audioBuffer.slice(0),
        (decodedData) => {
          drawWaveform(decodedData);
        },
        (error) => console.error("Error with decoding audio data", error)
      );
    });
  }, [audio]);

  return <canvas style={style} ref={canvasRef} width="400" height="150" />;
};
