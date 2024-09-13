import { safe, type TypeInfo } from "@mjtdev/engine";

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
