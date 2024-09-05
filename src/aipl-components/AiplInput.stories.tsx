import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { AiplComponentProvider } from "../provider/AiplComponentProvider";
import { mockConfig } from "./mockConfig";
import { AiplInput } from "./AiplInput";

type StoryProps = ComponentProps<typeof AiplInput> & {
  papId: string;
  aiplHomeUrl: string;
};

const meta: Meta<StoryProps> = {
  component: AiplInput,
  tags: ["autodocs"],
  argTypes: {
    papId: { control: { type: "text" } },
    aiplHomeUrl: { control: { type: "text" } },
  },
};

export default meta;

export const TextExample: StoryObj<StoryProps> = {
  render: ({ papId, aiplHomeUrl, ...args }) => (
    <AiplComponentProvider
      config={{ ...mockConfig, papId, homeUrl: aiplHomeUrl }}
    >
      <AiplInput {...args} />
    </AiplComponentProvider>
  ),
  args: {
    papId: mockConfig.papId,
    aiplHomeUrl: mockConfig.homeUrl,
    aiplName: "specialInstructions",
  },
};

export const CheckboxExample: StoryObj<StoryProps> = {
  render: ({ papId, aiplHomeUrl, ...args }) => (
    <AiplComponentProvider
      config={{ ...mockConfig, papId, homeUrl: aiplHomeUrl }}
    >
      <AiplInput {...args} />
    </AiplComponentProvider>
  ),
  args: {
    papId: mockConfig.papId,
    aiplHomeUrl: mockConfig.homeUrl,
    aiplName: "toppings[pepperoni]",
    type: "checkbox",
  },
};
