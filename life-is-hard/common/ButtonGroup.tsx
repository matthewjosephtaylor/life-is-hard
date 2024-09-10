import {
  Button,
  Stack,
  Typography,
  type ButtonProps,
  type StackProps,
} from "@mui/material";
import { Prompts } from "ai-worker-common";
import type { CSSProperties } from "react";
import { formatAndCapitalize } from "../../src/common/formatAndCapitalize";

export const ButtonGroup = ({
  actions,
  style = {},
  buttonStyle = {},
  direction,
  templateVars = {},
  disableds = {},
  buttonProps = {},
  flexWrap = "wrap",
  gap = "1",
  ...rest
}: {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
  actions: Record<string, () => void>;
  templateVars?: Record<string, string | undefined>;
  buttonProps?: Record<string, ButtonProps>;
  disableds?: Record<string, boolean>;
} & StackProps) => {
  const contents = Object.entries(actions).map((entry) => {
    const [key, value] = entry;
    return (
      <Button
        disabled={disableds[key]}
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...buttonStyle,
        }}
        onClick={value}
        key={key}
        {...(buttonProps[key] ?? {})}
      >
        <Typography
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            ...buttonStyle,
          }}
        >
          {formatAndCapitalize(Prompts.renderTemplateText(key, templateVars))}
        </Typography>
      </Button>
    );
  });
  return (
    <Stack flexWrap={flexWrap} direction={direction} gap={gap} {...rest}>
      {contents}
    </Stack>
  );
};
