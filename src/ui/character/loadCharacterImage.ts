import type { AppCharacter} from "ai-worker-common";
import { Apps, Datas } from "ai-worker-common";
import { getHomeAuth } from "../../state/getHomeAuth";


export const loadCharacterImage = async (character: AppCharacter) => {
  if (!character.imageDataId) {
    return undefined;
  }
  const resp = await Datas.getRemoteData({
    id: character.imageDataId,
    ...getHomeAuth(),
  });
  if (!resp.ok) {
    return Apps.error(resp);
  }
  return resp.blob();
};
