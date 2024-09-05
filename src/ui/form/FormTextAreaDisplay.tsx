import { Text, TextArea } from "@radix-ui/themes";
import type { TextAreaProps } from "@radix-ui/themes/dist/cjs/components/text-area";
import { forwardRef } from "react";

export const FormTextAreaDisplay = forwardRef(
  (
    {
      title,
      onChange = () => {},
      ...rest
    }: Omit<TextAreaProps, "onChange"> & {
      title: string;
      onChange?: (value: string) => void;
    },
    ref
  ) => {
    return (
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          {title}
        </Text>
        <TextArea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          onChange={(evt) => {
            onChange(evt.currentTarget.value);
          }}
          {...rest}
        />
      </label>
    );
  }
);
