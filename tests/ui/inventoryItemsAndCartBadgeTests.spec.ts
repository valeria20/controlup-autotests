import { test } from "../../fixtures/fixtures";

const { TEST_USERNAME, TEST_PASSWORD } = process.env;

test.describe("Inventory & Cart Badge suite", () => {

  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.openPageAndLogin(TEST_USERNAME, TEST_PASSWORD);
    await inventoryPage.assertOnInventoryPage();
  });

  test("Scenario 1: Verify Inventory Items", async ({ inventoryPage }) => {
    await test.step("Verify inventory page displays exactly 6 items", async () => {
      await inventoryPage.assertInventoryItemsCount(6);
    });
  });

  test("Scenario 2: Add first inventory item to cart and verify badge", async ({ inventoryPage }) => {
    await test.step("Add first inventory item to cart", async () => {
      await inventoryPage.addFirstItemToCart();
    });

    await test.step("Verify cart badge displays 1", async () => {
      await inventoryPage.assertCartBadgeCount(1);
    });
  });
});
