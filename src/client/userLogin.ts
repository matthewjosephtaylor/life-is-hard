import type { AiplClientContext } from "./AiplClients";
import { call } from "./call";

export const userLogin = async ({
  userName,
  password,
  ctx,
}: {
  userName: string;
  password: string;
  ctx: AiplClientContext;
}) => {
  const authToken = await call(ctx, "auth", { userName, password });

  if (typeof authToken !== "string") {
    console.log("userLogin: no authToken, refusing", { authToken });
    throw new Error("No auth token received");
  }
  ctx.update((s) => {
    s.authToken = authToken;
  });
  return authToken;
};
