import { BrowserFiles, isDefined, isUndefined } from "@mjtdev/engine";
import { Button, Card, Flex, Grid, TextField } from "@radix-ui/themes";
import type { AccessPointTheme } from "ai-worker-common/dist/type/theme/AccessPointTheme";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { DataObjectStates } from "../../../state/data-object/DataObjectStates";
import { AddFilesDisplay } from "../../corpus/AddFilesDisplay";
import { putRemoteFile } from "../../corpus/putRemoteFile";
import { FormInputDisplay } from "../../form/FormInputDisplay";
import { DataImage } from "../../image/DataImage";

export const AccessPointThemeDisplay = ({
  themeId,
  parentId,
}: {
  parentId: string;
  themeId: string;
}) => {
  const theme = DataObjectStates.useDataObject<AccessPointTheme>(themeId);

  const [result, setResult] = useState(produce(theme, () => {}));

  useEffect(() => {
    setResult(theme);
  }, [theme]);
  const [dirty, setDirty] = useState(false);
  if (isUndefined(result)) {
    return <>...</>;
  }
  return (
    <Flex align={"center"} gap="0.5em">
      <TextField.Root
        onChange={(evt) => {
          setDirty(true);
          setResult(
            produce(result, (r) => {
              r.name = evt.currentTarget.value;
            })
          );
        }}
        placeholder="Theme Name"
        defaultValue={result.name}
      />
      {result.logoDataId ? (
        <DataImage
          onClick={async () => {
            const fhs = await BrowserFiles.openFileHandle({
              multiple: false,
            });
            if (fhs.length < 1) {
              return;
            }
            const fh = fhs[0];
            const file = await fh.getFile();
            const logoDataId = await putRemoteFile(file);

            setDirty(true);
            setResult(
              produce(result, (r) => {
                r.logoDataId = logoDataId;
              })
            );
          }}
          style={{ maxHeight: "2em", maxWidth: "2em" }}
          dataId={result.logoDataId}
        />
      ) : (
        <AddFilesDisplay
          style={{ whiteSpace: "nowrap", fontSize: "1em" }}
          inactiveText="Logo"
          parentId={result?.id}
          onAdd={async (files) => {
            const file = files[0];
            const logoDataId = await putRemoteFile(file);

            setDirty(true);
            setResult(
              produce(result, (r) => {
                r.logoDataId = logoDataId;
              })
            );
          }}
        />
      )}
      <Flex wrap={"wrap"} gap="1em">
        <Card>
          <FormInputDisplay
            title="Text Color"
            key={result.color}
            style={{ userSelect: "none", cursor: "pointer" }}
            /** @ts-ignore types out of date? */
            type="color"
            defaultValue={result.color}
            onChange={(value) => {
              setDirty(true);
              setResult(
                produce(result, (r) => {
                  r.color = value;
                })
              );
            }}
          />
          <Button
            disabled={isUndefined(result.color)}
            color="red"
            onClick={() => {
              setDirty(true);
              setResult(
                produce(result, (r) => {
                  r.color = undefined;
                })
              );
            }}
          >
            Clear
          </Button>
        </Card>
        <Card>
          <FormInputDisplay
            title="Background Color"
            style={{ userSelect: "none", cursor: "pointer" }}
            key={result.backgroundColor}
            /** @ts-ignore types out of date? */
            type="color"
            defaultValue={result.backgroundColor}
            onChange={(value) => {
              setDirty(true);
              setResult(
                produce(result, (r) => {
                  r.backgroundColor = value;
                })
              );
            }}
          />
          <Button
            disabled={isUndefined(result.backgroundColor)}
            color="red"
            onClick={() => {
              setDirty(true);
              setResult(
                produce(result, (r) => {
                  r.backgroundColor = undefined;
                })
              );
            }}
          >
            Clear
          </Button>
        </Card>
        <FormInputDisplay
          title="Banner Text"
          defaultValue={result.bannerText}
          onChange={(value) => {
            setDirty(true);
            setResult(
              produce(result, (r) => {
                r.bannerText = value;
              })
            );
          }}
        />
        <FormInputDisplay
          title="Banner URL"
          defaultValue={result.bannerUrl}
          onChange={(value) => {
            setDirty(true);
            setResult(
              produce(result, (r) => {
                r.bannerUrl = value;
              })
            );
          }}
        />
      </Flex>

      <Button
        disabled={!dirty}
        onClick={() => {
          DataObjectStates.mutateDataObject<AccessPointTheme>(
            result.id,
            (t) => {
              console.log("saving", { result });
              t.backgroundColor = result.backgroundColor;
              t.color = result.color;
              t.logoDataId = result.logoDataId;
              t.name = result.name;
              t.bannerText = result.bannerText;
              t.bannerUrl = result.bannerUrl;
            }
          );
          setDirty(false);
        }}
      >
        Save
      </Button>

      <Button
        onClick={() => DataObjectStates.deleteDataObject(result.id)}
        color="red"
      >
        Delete
      </Button>
    </Flex>
  );
};
