import { isDefined, TypeBoxes } from "@mjtdev/engine";
import { useContext, type ButtonHTMLAttributes, type ReactNode } from "react";
import { formatAndCapitalize } from "../common/formatAndCapitalize";
import { AiplComponentContext } from "../provider/AiplComponentContext";
import type { AiplComponentContextState } from "./AiplComponentContextState";

export const AiplRadioGroup = (
  props: ButtonHTMLAttributes<HTMLFieldSetElement> & {
    defaultValue?: string;
    values?: Record<string, string> | string[];
    aiplName: string;
    formatter?: (value: string) => ReactNode;

    onChangeValue?: (
      value: string,
      contextState: AiplComponentContextState,
      aiplName: string
    ) => void;
  }
) => {
  const context = useContext(AiplComponentContext);
  if (!context || !context.typeInfo) {
    throw new Error(
      "AiplFormConfigContext is not provided, make sure to wrap your component with AiplFormConfigProvider"
    );
  }
  const { typeInfo } = context;
  const {
    children,
    aiplName,
    onChangeValue,
    defaultValue,
    values = [],
    formatter = formatAndCapitalize,
    ...rest
  } = props;
  const optionValues = TypeBoxes.schemaToAnyOfs(
    typeInfo.schema.properties[aiplName]
  );
  const entries = optionValues.map((v) => [v, v] as const);

  const value = context.componentState[aiplName] || defaultValue;
  const items = entries.map((entry, i) => (
    <label key={i}>
      <input
        checked={value === entry[0]}
        name={aiplName}
        type="radio"
        key={i}
        value={entry[0]}
        onChange={(evt) => {
          const value = evt.target.value;
          context.updateComponentState({
            ...context.componentState,
            [aiplName]: value,
          });
          if (isDefined(onChangeValue)) {
            onChangeValue(value, context, aiplName);
          }
          // if (isDefined(props.onChange)) {
          //   props.onChange(evt);
          // }
        }}
      />
      <span>{formatter(entry[1])}</span>
    </label>
  ));
  return <fieldset {...rest}>{items}</fieldset>;
};
