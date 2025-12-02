import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const uiBaseUse = {
  baseURL: process.env.UI_BASE_URL,
  actionTimeout: 15000,
  headless: true,
  trace: "retain-on-failure",
  video: "retain-on-failure",
  screenshot: "only-on-failure",
};

const uiTestMatch = ["**/inventoryItemsAndCartBadgeTests.spec.ts"];

const uiBrowsers = ["chromium", "firefox", "webkit"];

const uiProjects = uiBrowsers.map((browserName) => ({
  name: `ui-${browserName}`,
  testMatch: uiTestMatch,
  use: {
    ...uiBaseUse,
    browserName,
  },
}));

const apiProject = {
  name: "api tests",
  use: {
    baseURL: process.env.API_BASE_URL,
  },
  testMatch: ["**/airport.spec.ts"],
};

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 5 : 3,
  reporter: "html",
  use: {
    trace: "on-first-retry",
  },
  projects: [
    ...uiProjects,
    apiProject,
  ],
});
