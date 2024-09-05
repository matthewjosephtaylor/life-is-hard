import { Fetches } from "ai-worker-common";
import { openErrorPopup } from "../../error/openErrorPopup";
import { getHomeAuth } from "../getHomeAuth";
import { AppMessagesState } from "../ws/AppMessagesState";
import { storeUserState, updateUserState } from "./UserState";

/** @deprecated authToken no longer has profile TODO remove updateUserProfileAuthtoken */
export const updateUserProfileAuthToken = async (profileId: string) => {
  const { authToken, homeBaseUrl } = getHomeAuth();

  const resp = await Fetches.fetchWithAuth<string>({
    authToken,
    url: homeBaseUrl + "/user/profile",
    data: profileId,
    options: { method: "POST" },
  });
  if (!resp.ok) {
    openErrorPopup(
      `Error updating user profile auth token: ${resp.status} ${resp.statusText}`
    );
    return;
  }
  const updatedAuthToken = await resp.text();

  updateUserState((state) => {
    state.authToken = updatedAuthToken;
  });
  AppMessagesState.dispatch({
    type: "auth",
    detail: updatedAuthToken,
  });
  await storeUserState();
};
