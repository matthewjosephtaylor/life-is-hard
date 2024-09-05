import type { TavernCardV2 } from "ai-worker-common";

export const createTavernCard = (
  draft: Partial<TavernCardV2> = {}
): TavernCardV2 => {
  const { data = {}, spec, spec_version } = draft;

  return {
    data,
    spec: "chara_card_v2",
    spec_version: "2.0",
  };
};
