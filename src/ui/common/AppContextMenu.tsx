import type { ActionMap } from "@mjtdev/engine";
import { ContextMenu, Flex, Text } from "@radix-ui/themes";
import type { CSSProperties, ReactNode } from "react";
import { formatAndCapitalize } from "../../common/formatAndCapitalize";
import { Prompts } from "ai-worker-common";

export const AppContextMenu = ({
  actions,
  children,
  style,
  templateVars = {},
}: {
  templateVars?: Record<string, string | undefined>;
  style?: CSSProperties;
  children: ReactNode;
  actions: ActionMap;
}) => {
  const items = Object.entries(actions)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map((entry, i) => {
      const [name, action] = entry;
      return (
        <ContextMenu.Item
          key={i}
          onClick={(evt) => {
            evt.stopPropagation();
            action();
          }}
        >
          <Text>
            {formatAndCapitalize(
              Prompts.renderTemplateText(name, templateVars)
            )}
          </Text>
        </ContextMenu.Item>
      );
    });
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger><Flex>{children}</Flex></ContextMenu.Trigger>
      <ContextMenu.Content>{items}</ContextMenu.Content>
    </ContextMenu.Root>
  );
};
