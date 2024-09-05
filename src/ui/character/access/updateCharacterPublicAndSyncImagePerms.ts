// import { Datas, type AccessInfo } from "ai-worker-common";
// import { getAppState } from "../../../state/app/AppState";
// import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
// import { getUserState } from "../../../state/user/UserState";
// import { WORLD_NONE_PERM, WORLD_READABLE_PERM } from "./WORLD_PERM";
// import { getActiveGroup } from "../../../state/user/getActiveGroup";

// export const updateCharacterPublicAndSyncImagePerms = async ({
//   characterId,
//   imageDataId,
//   activeGroupId,
// }: {
//   characterId: string;
//   imageDataId: string;
//   activeGroupId: string;
// }) => {
//   // const permissions = isPublic ? WORLD_READABLE_PERM : WORLD_NONE_PERM;
//   // DataObjectStates.mutateAccessInfo(characterId, (cur) => {
//   //   cur.permissions = permissions;
//   // });
//   // const curInfoRequest = await Datas.getRemoteDataAccess({
//   //   authToken: getUserState().authToken,
//   //   homeBaseUrl: getAppState().aiBaseUrl,
//   //   id: imageDataId,
//   // });
//   // const activeGroup = await getActiveGroup(characterId);
//   // const activeGroup = await DataObjectStates.getDataObject(activeGroupId)
//   // const curAccessInfo = await curInfoRequest.json();
//   // const accessInfo: AccessInfo = {
//   //   ...curAccessInfo,
//   //   // permissions,
//   //   group: activeGroup ? activeGroup.id : curAccessInfo.group,
//   // };
//   // return Datas.putRemoteDataAccess({
//   //   authToken: getUserState().authToken,
//   //   homeBaseUrl: getAppState().aiBaseUrl,
//   //   id: imageDataId,
//   //   accessInfo,
//   // });
// };
