import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps } from "react";
import { AiplComponentProvider } from "../provider/AiplComponentProvider";
import { AiplRadioGroup } from "./AiplRadioGroup";
import { mockConfig } from "./mockConfig";

type StoryProps = ComponentProps<typeof AiplRadioGroup> & {
  papId: string;
  aiplHomeUrl: string;
};

const meta: Meta<StoryProps> = {
  component: AiplRadioGroup,
  tags: ["autodocs"],
  argTypes: {
    papId: { control: { type: "text" } },
    aiplHomeUrl: { control: { type: "text" } },
  },
};

export default meta;

export const Example: StoryObj<StoryProps> = {
  render: ({ papId, aiplHomeUrl, ...args }) => (
    <AiplComponentProvider
      config={{ ...mockConfig, papId, homeUrl: aiplHomeUrl }}
    >
      <AiplRadioGroup {...args} />
    </AiplComponentProvider>
  ),
  args: {
    papId: mockConfig.papId,
    aiplHomeUrl: mockConfig.homeUrl,
    aiplName: "peperoniSegment",
  },
};
