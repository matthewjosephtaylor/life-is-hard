import { Arrays, isDefined, toMany } from "@mjtdev/engine";
import { type InputHTMLAttributes, useContext, useEffect, useRef } from "react";
import { AiplComponentContext } from "../provider/AiplComponentContext";
import type { AiplComponentContextState } from "./AiplComponentContextState";
import { toParentAiplName } from "./toParentAiplName";
import { isChecked } from "./isChecked";
import { toChildAiplName } from "./toChildAiplName";

export const AiplInput = (
  props: InputHTMLAttributes<HTMLInputElement> & {
    onChangeValue?: (
      value: string,
      contextState: AiplComponentContextState,
      aiplName: string
    ) => void;
    defaultValue?: string;
    aiplName: string;
  }
) => {
  const context = useContext(AiplComponentContext);
  if (!context || !context.typeInfo) {
    throw new Error(
      "AiplFormConfigContext is not provided, make sure to wrap your component with AiplFormConfigProvider"
    );
  }
  const { children, aiplName, onChangeValue, defaultValue, ...rest } = props;

  const parentAiplName = toParentAiplName(aiplName) ?? "";

  const value = context.componentState[parentAiplName] || defaultValue || "";
  const isCheckable = rest.type === "checkbox" || rest.type === "radio";
  const currentlyChecked = isCheckable
    ? isChecked({ aiplName, value })
    : undefined;
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    if (isCheckable) {
      ref.current.checked = currentlyChecked ?? false;
      return;
    }
    ref.current.value = toMany(value).join(", ");
  }, [ref, currentlyChecked, value]);
  return (
    <input
      ref={ref}
      onChange={(evt) => {
        const value = evt.target.value;
        const childAiplName = toChildAiplName(aiplName);
        if (isCheckable && isDefined(childAiplName)) {
          const currentValue = context.componentState[parentAiplName] || [];
          const fullSet = new Set([...currentValue, childAiplName]);
          if (!evt.target.checked) {
            fullSet.delete(childAiplName);
          }
          context.updateComponentState({
            ...context.componentState,
            [parentAiplName]: Arrays.from(fullSet),
          });
        } else {
          context.updateComponentState({
            ...context.componentState,
            [aiplName]: value,
          });
        }
        if (isDefined(onChangeValue)) {
          onChangeValue(value, context, aiplName);
        }
        if (isDefined(props.onChange)) {
          props.onChange(evt);
        }
      }}
      defaultValue={value}
      defaultChecked={currentlyChecked}
      {...rest}
    >
      {children}
    </input>
  );
};
