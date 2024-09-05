import { startCustomAsr } from "../../asr-custom/startCustomAsr";
import { stopVadAsr } from "../../asr-custom/stopVadAsr";
import { Disabled } from "../chat/Disabled";
import type { IconButtonProps } from "@radix-ui/themes/dist/cjs/components/icon-button";
import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";
import { AppIconButton } from "./AppIconButton";

export const AppToggleButton = ({
  enabled,
  enabledOptions = {},
  disabledOptions = {},
  icon,
  ...rest
}: IconButtonProps & {
  enabled: boolean;
  enabledOptions?: Partial<IconButtonProps & { tooltip: string }>;
  disabledOptions?: Partial<IconButtonProps & { tooltip: string }>;
  icon: ReactNode;
}) => {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {enabled ? (
        <motion.div
          key="enable-motion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AppIconButton
            onClick={() => {
              stopVadAsr();
            }}
            {...{ ...rest, ...enabledOptions }}
          >
            {icon}
          </AppIconButton>
        </motion.div>
      ) : (
        <motion.div
          key="disable-motion"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Disabled>
            <AppIconButton
              onClick={() => {
                startCustomAsr();
              }}
              {...{ ...rest, ...disabledOptions }}
            >
              {icon}
            </AppIconButton>
          </Disabled>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
