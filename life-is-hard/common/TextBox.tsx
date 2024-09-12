import { toMany } from "@mjtdev/engine";
import { TextField, type TextFieldProps } from "@mui/material";
import { useEffect, useRef } from "react";
import { useAiplValue } from "./useAiplValue";

export const TextBox = ({
  aiplName,
  defaultValue,
  ...rest
}: TextFieldProps & { aiplName: string }) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const value = useAiplValue(aiplName, defaultValue as unknown as string);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.value = toMany(value).join(", ");
  }, [ref, value]);
  return <TextField inputRef={ref} {...rest} />;
};
