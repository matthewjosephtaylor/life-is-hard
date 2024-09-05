import { getUserState } from "./user/UserState";
import { getAppState } from "./app/AppState";

export const getHomeAuth = () => {
  const { authToken } = getUserState();
  const { aiBaseUrl: homeBaseUrl } = getAppState();
  return { authToken, homeBaseUrl };
};
