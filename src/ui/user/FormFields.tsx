import { Container, Flex, Grid } from "@radix-ui/themes";
import { formatAndCapitalize } from "../../common/formatAndCapitalize";
import { FormCheckboxDisplay } from "../form/FormCheckboxDisplay";
import { FormInputDisplay } from "../form/FormInputDisplay";
import type { FormFieldTypeMap } from "../form/FormFieldTypeMap";
import { coerceStringToFormFieldValueType } from "./coerceStringToFormFieldValueType";
import { numberArrayStringToNumberArray } from "../../common/numberArrayStringToNumberArray";
import type { CSSProperties } from "react";

export const FormFields = <T extends object>({
  keys = [],
  readonlyKeys = [],
  defaultValue,
  formFieldTypeMap = {},
  onChange,
  style = {},
}: {
  style?: CSSProperties;
  defaultValue: T;
  keys?: Extract<keyof T, string>[];
  readonlyKeys?: Extract<keyof T, string>[];
  formFieldTypeMap?: FormFieldTypeMap<T>;
  onChange: (key: keyof T, value: T[typeof key]) => void;
}) => {
  const coerceValue = coerceStringToFormFieldValueType(formFieldTypeMap);
  const keyFields = [...keys].map((key, i) => {
    const fieldType = formFieldTypeMap[key] ?? "string";
    const readOnly = readonlyKeys.includes(key);
    if (fieldType === "string") {
      return (
        <FormInputDisplay
          key={i}
          readOnly={readOnly}
          title={`${formatAndCapitalize(key)}`}
          defaultValue={defaultValue[key] as string}
          onChange={(value) => {
            onChange(key, coerceValue(key, value));
          }}
        />
      );
    }

    if (fieldType === "secret") {
      return (
        <FormInputDisplay
          key={i}
          readOnly={readOnly}
          title={`${formatAndCapitalize(key)}`}
          defaultValue={defaultValue[key] as string}
          type="password"
          onChange={(value) => {
            onChange(key, coerceValue(key, value));
          }}
        />
      );
    }

    if (fieldType === "number[]") {
      return (
        <FormInputDisplay
          key={i}
          readOnly={readOnly}
          title={`${formatAndCapitalize(key)}`}
          defaultValue={numberArrayStringToNumberArray(
            defaultValue[key] as string
          ).join(",")}
          // style={{ width: "80vw" }}
          onChange={(value) => {
            onChange(key, coerceValue(key, value));
          }}
        />
      );
    }

    if (fieldType === "number") {
      return (
        <FormInputDisplay
          key={i}
          readOnly={readOnly}
          title={`${formatAndCapitalize(key)}`}
          defaultValue={defaultValue[key] as string}
          onChange={(value) => {
            onChange(key, coerceValue(key, value));
          }}
        />
      );
    }

    if (fieldType === "boolean") {
      return (
        <FormCheckboxDisplay
          key={i}
          disabled={readOnly}
          title={`${formatAndCapitalize(key)}`}
          defaultChecked={defaultValue[key] as boolean}
          onChange={(value) => {
            onChange(key, coerceValue(key, value));
          }}
        />
      );
    }
    return (
      <div key={i}>
        UNKNOWN TYPE '{fieldType}' for key {key}
      </div>
    );
  });
  return (
    <Flex wrap={"wrap"} gap="2" style={style}>
      {keyFields}
    </Flex>
  );
};
