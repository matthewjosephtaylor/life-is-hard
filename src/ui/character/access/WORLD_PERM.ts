import { Accesses, PermissionLevel } from "ai-worker-common";

export const WORLD_READABLE_PERM = Accesses.calcOctalPermissions({
  user: PermissionLevel.WRITE,
  group: PermissionLevel.READ,
  world: PermissionLevel.READ,
});
export const WORLD_NONE_PERM = Accesses.calcOctalPermissions({
  user: PermissionLevel.WRITE,
  group: PermissionLevel.READ,
  world: PermissionLevel.NONE,
});

