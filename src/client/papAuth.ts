import type { AiplClientContext } from "./AiplClients";
import { call } from "./call";

export const papAuth = async ({
  accessPointId,
  ctx,
}: {
  accessPointId: string;
  ctx: AiplClientContext;
}) => {
  const resp = (await call(ctx, "pap:auth", {
    accessPointId,
    params: {},
  })) as { authToken: string };

  const { authToken } = resp;
  console.log("papAuth: authToken", { authToken });

  if (typeof authToken !== "string") {
    console.log("userLogin: no authToken, refusing", { authToken });
    throw new Error("No auth token received");
  }
  ctx.update((s) => {
    s.authToken = authToken;
  });
  return authToken;
};
