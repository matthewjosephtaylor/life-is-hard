import { safe, type TypeInfo } from "@mjtdev/engine";
import type { BASIC_ENTITY_METADATA_TYPE_INFO } from "../game/ENTITY_METADATA_TYPE_INFO";

export const ifGet = <T, R>(
  typeInfo: TypeInfo<T>,
  object: unknown,
  getter: (typedObject: T) => R
): R | undefined => {
  return safe(() => getter(object as T), { quiet: true });
  // if (typeInfo.validate(object)) {
  // }
  // return undefined;
};

export const getBasicEntityMeta = <R>(
  object: unknown,
  getter: (typedObject: typeof BASIC_ENTITY_METADATA_TYPE_INFO.type) => R
): R | undefined => {
  return safe(
    () => getter(object as typeof BASIC_ENTITY_METADATA_TYPE_INFO.type),
    { quiet: true }
  );
};
