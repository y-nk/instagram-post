import { PlaywrightTestConfig, devices } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 3 * 60000,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Nexus 7"],
        // headless: false,
      },
    },
  ],
};

export default config;
