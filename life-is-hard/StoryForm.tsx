import { useContext } from "react";
import { SchemaForm } from "./common/SchemaForm";
import { StoryTypeInfo } from "./domain/StoryTypeInfo";
import { AiplComponentContext } from "../src/provider/AiplComponentContext";
import { Randoms } from "@mjtdev/engine";

export const StoryForm = () => {
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
    />
  );
};
