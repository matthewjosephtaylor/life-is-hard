import { useUserState } from "./user/UserState";
import { useAppState } from "./app/AppState";



export const useHomeAuth = () => {
  const { authToken } = useUserState();
  const { aiBaseUrl: homeBaseUrl } = useAppState();
  return { authToken, homeBaseUrl };
};
