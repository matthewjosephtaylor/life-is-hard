// import type { ServiceProviders } from "ai-worker-common";
// import { AppEvents } from "../event/AppEvents";
// import { getActiveProfile } from "../state/user/getActiveProfile";

// export const getActiveProfileModel = async (
//   service: keyof ServiceProviders
// ) => {
//   const profile = await getActiveProfile();
//   if (!profile) {
//     AppEvents.dispatchEvent("error", "no active profile");
//     return undefined;
//   }

//   return profile.providers[service].model ?? "gpt-3.5-turbo-instruct";
// };
