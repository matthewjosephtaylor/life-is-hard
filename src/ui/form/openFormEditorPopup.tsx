import type { CSSProperties } from "react";
import { openAppPopup } from "../popup/openAppPopup";
import { FormEditor } from "./FormEditor";
import type { StringKeys } from "./StringKeys";
import { closeAppPopup } from "../popup/closeAppPopup";

export const openFormEditorPopup = <
  T extends Record<string, string>,
  K extends StringKeys<T> = StringKeys<T>
>(
  draft: T,
  options: Partial<{
    fieldStyles: Partial<Record<keyof T, CSSProperties>>;
    focusField: K;
    title: string;
  }> = {}
): Promise<T | undefined> => {
  return new Promise((resolve, reject) => {
    openAppPopup(
      <FormEditor<T>
        defaultValue={draft}
        // fieldStyles={fieldStyles}
        // focusField={focusField}
        onSubmit={(value) => {
          closeAppPopup();
          resolve(value);
        }}
        {...options}
      />,
      {
        style: { width: "min-content" },
      }
    );
  });
};
