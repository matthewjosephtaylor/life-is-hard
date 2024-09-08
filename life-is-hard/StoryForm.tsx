import { useContext } from "react";
import { AiplComponentContext } from "../src/provider/AiplComponentContext";
import { SchemaForm } from "./common/SchemaForm";
import { StoryTypeInfo } from "./domain/StoryTypeInfo";

export const StoryForm = ({
  ...rest
}: Omit<Parameters<typeof SchemaForm>[0], "schema">) => {
  console.log(StoryTypeInfo.schema);
  const ctx = useContext(AiplComponentContext);
  return (
    <SchemaForm
      key={`${crypto.randomUUID()}`}
      sx={{ margin: "0.5em" }}
      schema={StoryTypeInfo.schema}
      data={ctx?.componentState ?? {}}
      onValueChange={(field, value) => {
        console.log("onValueChange", field, value);
      }}
      {...rest}
    />
  );
};
