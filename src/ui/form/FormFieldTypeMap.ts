export type FormFieldTypeMap<T> = Partial<Record<keyof T, FormFieldType>>;

export type FormFieldType =
  | "string"
  | "number"
  | "boolean"
  | "number[]"
  | "secret";

export type FormFieldTypeToJavascriptType = {
  boolean: boolean;
  string: string;
  number: number;
  "number[]": number[];
  secret: string;
};
