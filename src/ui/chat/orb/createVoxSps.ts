import {
  Materials,
  Meshes,
  Particles,
  type BabScene
} from "@mjtdev/engine";
import { v3 } from "@mjtdev/engine/packages/mjtdev-babs/dist/bab/v3";
import { WHITE_TEXTURE_NAME } from "./createVoxScene";
import { getPositionOnCircle } from "./getPositionOnCircle";

export const createVoxSps = async ({ scene }: { scene: BabScene }) => {
  const sps = Particles.getSolidParticleSystem(scene, "particles");
  const particleMat = Materials.getMaterial(scene, "sps-mat", {
    emissiveTexture: WHITE_TEXTURE_NAME,
  });
  const particleMesh = Meshes.getSphere(scene, "particle", {
    radius: 0.025,
  });
  particleMesh.useVertexColors = true;
  const particleCount = 32;
  sps.addShape(particleMesh, particleCount);
  // particleMesh.visibility = 0;
  particleMesh.dispose();
  const spsMesh = sps.buildMesh();
  spsMesh.useVertexColors = true;
  spsMesh.material = particleMat;

  sps.particles.forEach((particle, index) => {
    particle.scale = v3(Math.random(), Math.random(), Math.random());
    const { x, y } = getPositionOnCircle({
      startAngle: Math.PI - Math.PI / 2,
      radius: 0.5,
      index,
      totalItems: sps.particles.length,
      direction: -1,
    });
    particle.position.x = x;
    particle.position.z = y;
    particle.scale = v3(0, 0, 0);
  });
  sps.setParticles();
  spsMesh.material.wireframe = true;

  return sps;
};
