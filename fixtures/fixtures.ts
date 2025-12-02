import { test as base, expect, APIRequestContext } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";

const { API_BASE_URL } = process.env;

export const test = base.extend<{
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  api: APIRequestContext;
  apiBaseUrl: string;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  // default API base URL comes from .env
  // can be overridden in tests with test.use({ apiBaseUrl: ".." })
  apiBaseUrl: [API_BASE_URL || "", { option: true }],

  api: async ({ playwright, apiBaseUrl }, use) => {
    if (!apiBaseUrl) {
      throw new Error(
        "apiBaseUrl is empty. Provide API_BASE_URL in .env or override with test.use({ apiBaseUrl }) in test suite"
      );
    }

    const api = await playwright.request.newContext({
      baseURL: apiBaseUrl
    });

    await use(api);
    await api.dispose();
  }
});
export { expect };