import type { BoxProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { SchemaForm } from "./common/SchemaForm";
import JsonDisplay from "./common/JsonDisplay";

export const CurrentAiplSchemaForm = ({
  ...rest
}: {} & BoxProps & {
    onValueChange?: (field: string, value: any) => void;
  }) => {
  const ctx = useAiplComponentContext();
  const [state, setState] = useState({
    schema: ctx?.typeInfo?.schema,
    data: ctx?.componentState,
  });
  useEffect(() => {
    const schema = ctx?.typeInfo?.schema;
    const data = ctx?.componentState;
    setState({ schema, data });
    // }, [ctx?.typeInfo?.schema, ctx?.componentState]);
  }, [ctx?.componentState]);
  if (!state.schema) {
    return <></>;
  }
  return (
    <>
      {/* <SchemaForm
        key={`${crypto.randomUUID()}`}
        sx={{ margin: "0.5em" }}
        schema={state.schema}
        data={state.data}
        onValueChange={(field, value) => {
          console.log("onValueChange", field, value);
        }}
        {...rest}
      /> */}
      <JsonDisplay data={state.data} />
    </>
  );
};
