import { Accesses, type AccessInfo } from "ai-worker-common";

export const isAccessInfoWorldReadable = (
  accessInfo: AccessInfo | undefined
) => {
  if (!accessInfo) {
    return false;
  }
  return Accesses.hasAccess({ id: "", groups: [] }, accessInfo);
};
