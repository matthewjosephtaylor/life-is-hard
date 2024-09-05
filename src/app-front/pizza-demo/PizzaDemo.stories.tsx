import type { Meta, StoryObj } from "@storybook/react/*";
import type { ComponentProps } from "react";
import { mockConfig } from "../../aipl-components/mockConfig";
import { AiplComponentProvider } from "../../provider/AiplComponentProvider";
import { PizzaDemo } from "./PizzaDemo";

type StoryProps = ComponentProps<typeof PizzaDemo> & {
  papId: string;
  aiplHomeUrl: string;
};

const meta: Meta<StoryProps> = {
  component: PizzaDemo,
  tags: ["autodocs"],
  argTypes: {
    papId: { control: { type: "text" } },
    aiplHomeUrl: { control: { type: "text" } },
  },
};

export default meta;

export const Demo: StoryObj<StoryProps> = {
  render: ({ papId, aiplHomeUrl, ...args }) => (
    <AiplComponentProvider
      config={{ ...mockConfig, papId, homeUrl: aiplHomeUrl }}
    >
      <PizzaDemo {...args} />
    </AiplComponentProvider>
  ),
  args: {
    papId: mockConfig.papId,
    aiplHomeUrl: mockConfig.homeUrl,
  },
};
