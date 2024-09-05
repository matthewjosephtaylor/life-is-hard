import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "./themes.css";
const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        light: "light-theme",
        dark: "dark-theme",
      },
      defaultTheme: "dark",
    }),
  ],
  parameters: {
    theme: themes.dark,
    docs: {
      theme: themes.dark,
    },
    controls: {
      theme: themes.dark,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
