import { TypeBoxes } from "@mjtdev/engine";
import type { AiplComponentContextConfig } from "../src/aipl-components/AiplComponentContextState";

export const lifeIsHardConfig: Partial<AiplComponentContextConfig> = {
  typeInfo: TypeBoxes.createTypeInfo((Type) => {
    return Type.Object(
      {
        setting: Type.String({ description: "The setting of the story" }),
      },
      { $id: "Story" }
    );
  }),
};
