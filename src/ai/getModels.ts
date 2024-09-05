import { getAppState } from "../state/app/AppState";

export const getCustomModels = async () => {
  const { aiBaseUrl } = getAppState();
  const result = await fetch(`${aiBaseUrl}/v1/models`, {
    headers: { "Content-Type": "application/json" },
  });
  const resultWrapper = (await result.json()) as {
    data: {
      id: string;
      object: string;
      created: number;
      owned_by: string;
    }[];
  };
  return resultWrapper.data;
};
