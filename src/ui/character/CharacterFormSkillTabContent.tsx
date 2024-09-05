import { isEmpty, Objects } from "@mjtdev/engine";
import { Button, Card, Flex, Separator, Tabs, Text } from "@radix-ui/themes";
import type { AppCharacter, FormSkillConfig } from "ai-worker-common";
import { produce } from "immer";
import { openFormEditorPopup } from "../form/openFormEditorPopup";
import { FormSkillConfigEditor } from "./FormSkillConfigEditor";
import { AppButtonGroup } from "../common/AppButtonGroup";

export const CharacterFormSkillTabContent = ({
  tabKey,
  onChange,
  character,
}: {
  tabKey: string;
  character: AppCharacter;
  onChange: (value: Record<string, FormSkillConfig>) => void;
}) => {
  const defaultFormSkillConfigs =
    character.card.data.extensions?.formSkillConfigs ?? {};

  return (
    <Tabs.Content style={{ width: "100%" }} key={tabKey} value={tabKey}>
      <Flex
        style={{
          width: "100%",
          minWidth: "40ch",
        }}
        gap="4"
        direction={"column"}
      >
        <Flex direction={"row"} gap="2">
          <Button
            onClick={async () => {
              const form = await openFormEditorPopup<Partial<{ name: string }>>(
                { name: "default" },
                {
                  title: `New Form Skill`,
                  fieldStyles: { name: { width: "20ch" } },
                }
              );
              const formName = form?.name;
              if (!formName || isEmpty(formName)) {
                return;
              }
              const skillConfig: FormSkillConfig = {};
              onChange({
                ...defaultFormSkillConfigs,
                [formName]: skillConfig,
              });
            }}
          >
            Add Form Skill Config
          </Button>
        </Flex>
        <Separator size="4" />

        {Objects.keys(defaultFormSkillConfigs).map((formName, i) => (
          <Card key={i}>
            <Flex direction={"column"} gap="2">
              <Flex gap="2">
                <Text>{formName}</Text>
                <AppButtonGroup
                  colors={{ delete: "red", rename: "blue" }}
                  actions={{
                    rename: async () => {
                      const form = await openFormEditorPopup<
                        Partial<{ name: string }>
                      >(
                        { name: formName },
                        {
                          title: `Rename Form Skill Config`,
                          fieldStyles: { name: { width: "20ch" } },
                        }
                      );
                      const updatedFormName = form?.name;
                      if (!updatedFormName || isEmpty(updatedFormName)) {
                        return;
                      }
                      const updated = produce(
                        defaultFormSkillConfigs,
                        (draft) => {
                          const value = draft[formName];
                          delete draft[formName];
                          draft[updatedFormName] = value;
                        }
                      );
                      onChange(updated);
                    },
                    delete: () => {
                      const updated = produce(
                        defaultFormSkillConfigs ?? {},
                        (draft) => {
                          delete draft[formName];
                        }
                      );
                      onChange(updated);
                    },
                  }}
                />
              </Flex>
              <FormSkillConfigEditor
                defaultValue={defaultFormSkillConfigs?.[formName]}
                onDelete={(keyName) => {
                  const updated = produce(defaultFormSkillConfigs, (draft) => {
                    delete draft[formName][keyName];
                  });
                  onChange(updated);
                }}
                onRename={(oldName, newName) => {
                  const updated = produce(defaultFormSkillConfigs, (draft) => {
                    const value = draft[formName][oldName];
                    delete draft[formName][oldName];
                    draft[formName][newName] = value;
                  });
                  onChange(updated);
                }}
                onChange={(key, value) => {
                  const updated = produce(defaultFormSkillConfigs, (draft) => {
                    draft[formName][key] = value;
                  });
                  onChange(updated);
                }}
              />
            </Flex>
          </Card>
        ))}
      </Flex>
    </Tabs.Content>
  );
};
