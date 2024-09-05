import { isDefined } from "@mjtdev/engine";
import { getUserState, useUserState } from "../state/user/UserState";

export const isLoggedIn = () => {
  return isDefined(getUserState().authToken);
};
export const useIsLoggedIn = () => {
  return isDefined(useUserState().authToken);
};
