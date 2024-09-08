import { TextField, type TextFieldProps } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { AiplComponentContext } from "../../src/provider/AiplComponentContext";
import { toMany } from "@mjtdev/engine";

export const TextBox = ({
  aiplName,
  defaultValue,
  ...rest
}: TextFieldProps & { aiplName: string }) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const context = useContext(AiplComponentContext);
  if (!context || !context.typeInfo) {
    throw new Error(
      "AiplFormConfigContext is not provided, make sure to wrap your component with AiplFormConfigProvider"
    );
  }

  const value = context.componentState[aiplName] || defaultValue || "";

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    ref.current.value = toMany(value).join(", ");
    // console.log(value);
    console.log(ref.current.value);
  }, [ref, value]);
  return <TextField inputRef={ref} {...rest} />;
};
