import type { AppServiceProvider } from "ai-worker-common";
import type { FormFieldTypeMap } from "../form/FormFieldTypeMap";

// export const SERVICE_PROVIDER_KEY_TO_FIELD_TYPE: Partial<
//   Record<keyof ServiceProvider, FormFieldType>
// > = {
//   useSpeakerBoost: "boolean",
//   chunkLengthSchedule: "number[]",
//   contextSize: "number",
//   authToken: "secret",
// };
export const SERVICE_PROVIDER_KEY_TO_FIELD_TYPE: FormFieldTypeMap<AppServiceProvider> =
  {
    messageMode: "boolean",
    useSpeakerBoost: "boolean",
    chunkLengthSchedule: "number[]",
    contextSize: "number",
    authToken: "secret",
  };
