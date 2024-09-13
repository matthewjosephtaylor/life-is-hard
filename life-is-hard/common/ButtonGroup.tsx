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
  direction = "row",
  templateVars = {},
  disableds = {},
  buttonProps = {},
  flexWrap = "wrap",
  gap = "1",
  defaultButtonProps = {},
  ...rest
}: {
  direction?: "row" | "column" | "row-reverse" | "column-reverse";
  style?: CSSProperties;
  buttonStyle?: CSSProperties;
  actions: Record<string, () => void>;
  templateVars?: Record<string, string | undefined>;
  buttonProps?: Record<string, ButtonProps>;
  defaultButtonProps?: ButtonProps;
  disableds?: Record<string, boolean>;
} & StackProps) => {
  const contents = Object.entries(actions).map((entry) => {
    const [key, value] = entry;
    const buttonRest = {
      ...defaultButtonProps,
      ...buttonProps[key],
    };
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
        {...buttonRest}
      >
        <Typography
          variant="caption"
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
