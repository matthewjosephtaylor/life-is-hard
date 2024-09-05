import { Border } from "@mjtdev/engine";
import type { CSSProperties, ReactNode } from "react";
import { PALLET } from "../PALLET";

/** @deprecated */
export const FormSelectDisplay = ({
  title,
  onChange,
  value,
  defaultValue,
  style = {},
  type,
  autoFocus,
  disabled,
  children,
}: {
  autoFocus?: boolean;
  title: string;
  disabled?: boolean;
  style?: CSSProperties;
  value?: string | undefined;
  defaultValue?: string | undefined;
  type?: React.HTMLInputTypeAttribute;
  onChange?: (value: string) => void;
  children?: ReactNode;
}) => {
  return (
    <Border
      style={{ margin: "1em" }}
      title={<div style={{ whiteSpace: "nowrap" }}>{title}</div>}
      resizable={false}
    >
      <select
        disabled={disabled}
        autoFocus={autoFocus}
        onChange={(evt) => {
          if (!onChange) {
            return;
          }
          onChange(evt.target.value);
        }}
        value={value}
        defaultValue={defaultValue}
        style={{
          boxShadow: "none",
          color: PALLET.textColor,
          resize: "none",
          border: "none",
          backgroundColor: PALLET.textEntry,
          ...style,
        }}
      >
        {children}
      </select>
    </Border>
  );
};
