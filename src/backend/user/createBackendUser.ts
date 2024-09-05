import type { UserCreateRequest } from "ai-worker-common";
import { fetchWithJson } from "../../fetch/fetchWithJson";
import { getAppState } from "../../state/app/AppState";
import { openErrorPopup } from "../../error/openErrorPopup";
import { userLogin } from "./userLogin";

export const createBackendUser = async ({
  userName,
  password,
  accessToken,
}: {
  userName: string;
  password: string;
  accessToken: string;
}) => {
  const { aiBaseUrl } = getAppState();
  const resp = await fetchWithJson<UserCreateRequest>(
    `${aiBaseUrl}/user/create`,
    {
      userName,
      password,
      accessToken,
    }
  );
  if (!resp.ok) {
    openErrorPopup(`Error creating user: ${resp.status} ${resp.statusText}`);
    return;
  }

  await userLogin({ userName, password });
};
