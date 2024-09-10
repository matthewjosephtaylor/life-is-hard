import { useAiplComponentContext } from "../src/aipl-components/useAiplComponentContext";
import { SchemaForm } from "./common/SchemaForm";
import { StoryTypeInfo } from "./domain/StoryTypeInfo";

export const StoryForm = ({
  ...rest
}: Omit<Parameters<typeof SchemaForm>[0], "schema">) => {
  const ctx = useAiplComponentContext();
  console.log("ctx", ctx);
  console.log("ctx?.componentState", ctx?.componentState);
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
