import { safe } from "@mjtdev/engine";
import { Flex, Slider, type FlexProps } from "@radix-ui/themes";
import { Aipls } from "ai-worker-common";
import { motion } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createSettler } from "../../../common/createSettler";
import { useAiplCurrentState } from "../../aipl/useAiplCurrentState";
import { AiplNodeToEditorNodeContent } from "./aipl-node/AiplNodeToEditorNodeContent";
import { AppDropDown } from "../../common/AppDropDown";
import { AppModes } from "../../../state/location/AppModes";
import { characterFieldToCharacterFieldValue } from "./characterFieldToCharacterFieldValue";
import { CHARACTER_FIELDS } from "./CHARACTER_FIELDS";
import { useIsPlayground } from "../useIsPlayground";
import { AppContextMenu } from "../../common/AppContextMenu";

export type AiplBlockDisplayRef = {
  // update: () => void;
  // getReteEditor: () => ReteEditor | undefined | null;
};

export type AiplBlockDisplayProps = {
  defaultFontSize?: number;
} & FlexProps;

export const AiplBlockDisplay = forwardRef<
  AiplBlockDisplayRef,
  AiplBlockDisplayProps
>(({ defaultFontSize = 3, style = {}, ...rest }, ref) => {
  useImperativeHandle(ref, () => ({}), []);
  const { aiplLanguageParams, assistantCharacter, characterField } =
    useAiplCurrentState();
  const isPlayground = useIsPlayground();
  const [fontSize, setFontSize] = useState(defaultFontSize); // Initial font size
  const divRef = useRef<HTMLDivElement>(null);
  const characterFieldValue =
    characterFieldToCharacterFieldValue({
      characterField,
      character: assistantCharacter,
    }) ?? "";
  const program = safe(() =>
    Aipls.tryParseAipl(characterFieldValue, aiplLanguageParams)
  );
  const settler = useMemo(
    () =>
      createSettler<(cur: number) => number>({
        settleAction: (fontSizeUpdater) => {
          setFontSize(fontSizeUpdater);
        },
        settledAfterMs: 100,
      }),
    []
  );

  useEffect(() => {
    const handleWheel = (evt: WheelEvent) => {
      if (evt.ctrlKey || evt.altKey || evt.metaKey) {
        evt.preventDefault();
        settler.update((fontSize) =>
          Math.max(fontSize + evt.deltaY * -0.05, 3)
        );
      }
    };

    const divElement = divRef.current;
    if (divElement) {
      divElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (divElement) {
        divElement.removeEventListener("wheel", handleWheel);
      }
    };
  }, [settler]);

  console.log("characterField", characterField);

  return (
    <Flex ref={divRef} style={style} gap="1em" direction={"column"}>
      <Flex align={"center"} gap="1em">
        {!isPlayground ? (
          <AppDropDown
            onChange={(value) => {
              AppModes.upsertHashParam("characterField", value);
            }}
            style={{ width: "100%" }}
            value={characterField}
            placeholder={"unknown"}
            title={"Field"}
            values={CHARACTER_FIELDS}
          />
        ) : undefined}
        <Slider
          onValueChange={(value) => {
            const change = value[0] * 0.1;
            settler.update(() => defaultFontSize + change);
          }}
          style={{ marginTop: "1em" }}
          defaultValue={[0]}
        />
      </Flex>
      <motion.div
        style={{
          ...style,
          overflow: "auto",
          height: "100%",
          width: "100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        animate={{ fontSize: `${fontSize}px` }}
      >
        <Flex wrap={"wrap"} style={{}} {...rest}>
            <AiplNodeToEditorNodeContent aiplNode={program} />
        </Flex>
      </motion.div>
    </Flex>
  );
});
