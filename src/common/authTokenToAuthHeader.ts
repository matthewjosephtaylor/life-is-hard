import { isDefined } from "@mjtdev/engine";

export const authTokenToAuthHeader = (authToken: string) => {
  return { Authorization: `Bearer ${authToken}` };
};
