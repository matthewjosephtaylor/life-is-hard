import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { AiplComponentProvider } from "../provider/AiplComponentProvider";
import { playTypes } from "../play/play";
import { AiplSelect } from "./AiplSelect";
import { mockConfig } from "./mockConfig";

type StoryProps = ComponentProps<typeof AiplSelect> & {
  papId: string;
  aiplHomeUrl: string;
};

const meta: Meta<StoryProps> = {
  component: AiplSelect,
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
      <AiplSelect {...args} />
    </AiplComponentProvider>
  ),
  args: {
    papId: mockConfig.papId,
    aiplHomeUrl: mockConfig.homeUrl,
    aiplName: "size",
    values: ["one", "two", "three"],
  },
};

export const Play: StoryObj<StoryProps> = {
  render: ({ papId, aiplHomeUrl, ...args }) => (
    <AiplComponentProvider
      config={{ ...mockConfig, papId, homeUrl: aiplHomeUrl }}
    >
      <AiplSelect
        onClick={() => {
          // playTypes(mockConfig);
          console.log("clicked");
        }}
        {...args}
      />
    </AiplComponentProvider>
  ),
  args: {
    papId: mockConfig.papId,
    aiplHomeUrl: mockConfig.homeUrl,
    aiplName: "size",
    values: ["one", "two", "three"],
  },
};
