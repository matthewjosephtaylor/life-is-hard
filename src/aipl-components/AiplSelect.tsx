import { isDefined, TypeBoxes } from "@mjtdev/engine";
import { useContext, type ButtonHTMLAttributes } from "react";
import { formatAndCapitalize } from "../common/formatAndCapitalize";
import { AiplComponentContext } from "../provider/AiplComponentContext";
import type { AiplComponentContextState } from "./AiplComponentContextState";

export const AiplSelect = (
  props: ButtonHTMLAttributes<HTMLSelectElement> & {
    onChangeValue?: (
      value: string,
      contextState: AiplComponentContextState,
      aiplName: string
    ) => void;
    defaultValue?: string;
    values?: Record<string, string> | string[];
    aiplName: string;
    formatter?: (value: string) => string;
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
  const items = entries.map((entry, i) => (
    <option key={i} value={entry[0]}>
      {formatter(entry[1])}
    </option>
  ));

  const value = context.componentState[aiplName] || defaultValue;
  return (
    <select
      onChange={(evt) => {
        const value = evt.target.value;
        console.log(`aiplName: ${aiplName}, updated value: '${value}'`);

        context.updateComponentState({
          ...context.componentState,
          [aiplName]: value,
        });
        if (isDefined(onChangeValue)) {
          onChangeValue(value, context, aiplName);
        }
        if (isDefined(props.onChange)) {
          props.onChange(evt);
        }
      }}
      value={value}
      {...rest}
    >
      {items}
    </select>
  );
};
