import type { FormFieldType, FormFieldTypeMap } from "../form/FormFieldTypeMap";
import { numberArrayStringToNumberArray } from "../../common/numberArrayStringToNumberArray";
import { isDefined, safe } from "@mjtdev/engine";

export const coerceStringToFormFieldValueType =
  <T>(formFieldTypeMap: FormFieldTypeMap<T>) =>
  (key: keyof T, value: string | boolean | number | number[]): any =>
    safe(() => {
      const fieldType: FormFieldType = formFieldTypeMap[key] ?? "string";

      switch (fieldType) {
        case "boolean": {
          return Boolean(value);
        }
        case "number": {
          return Number(value);
        }
        case "number[]": {
          return numberArrayStringToNumberArray(value as string | number[]);
        }
      }
      return value;
    });
