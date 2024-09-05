import { Objects } from "@mjtdev/engine";
import type { AiFunctionDescription} from "ai-worker-common/dist/type/ai-function/AiFunctions";
import { updateAiFunctionState } from "ai-worker-common/dist/type/ai-function/AiFunctions";
import { AI_FUNCTIONS } from "./AI_FUNCTIONS";


export const setupAiFunctions = () => {
  const funcDesc: AiFunctionDescription = {
    name: "openDialog",
    params: [],
    usage: "",
  };

  updateAiFunctionState((state) => {
    state.functions = {
      ...state.functions,
      ...Objects.fromEntries(AI_FUNCTIONS.map((f) => [f.name, f])),
    };
  });
};
