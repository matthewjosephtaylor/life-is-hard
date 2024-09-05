import { Babs, Colors, type BabSolidParticle } from "@mjtdev/engine";
import { v3 } from "@mjtdev/engine/packages/mjtdev-babs/dist/bab/v3";

export const updateParticlesWithAudioContext = ({
  analyzer,
  dataArray,
  particles,
  color,
}: {
  particles: BabSolidParticle[];
  dataArray: Uint8Array;
  analyzer?: AnalyserNode;
  color: string;
}) => {
  if (!analyzer) {
    return;
  }
  analyzer.getByteFrequencyData(dataArray);

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    const sample = dataArray[i] / 256;
    const scale = sample * 2;
    particle.scale = v3(scale, scale, scale);
    // particle.position.x = particle.position.x + scale;
    particle.position.y = scale * 0.3;
    // particle.position.z = scale * 0.1;
    particle.color = Babs.c4(
      Colors.from(color)
        .rotate((i / particles.length) * 90)
        .lighten(i / particles.length / 2)
        .toString()
    );
  }
};
