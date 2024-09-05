import type { CSSProperties } from "react";
import { AppBorder } from "../ui/agent/AppBorder";
import { UnknownValue } from "./UnknownValue";

export const JsonDisplay = ({
  title,
  value,
  onRefresh = () => {},
  style,
}: {
  title: string;
  value: unknown;
  onRefresh?: () => void;
  style?: CSSProperties;
}) => {
  console.log({ obj: value });
  return (
    <AppBorder
      resizable={true}
      collapsable={true}
      style={style}
      title={<span>{title}</span>}
    >
      <input
        style={{ marginLeft: "1em" }}
        onClick={() => onRefresh()}
        type="button"
        value="refresh"
      />
      {<UnknownValue
      //  style={style}
        value={value} />}
    </AppBorder>
  );
};
