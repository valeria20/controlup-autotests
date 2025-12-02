import {Page, Locator, expect} from "@playwright/test";
import {BasePage} from "./BasePage";
import {InventoryPageSelectors} from "../selectors/selectors";
import {PagePaths} from "../data/pagePaths";

export class InventoryPage extends BasePage {
  private _inventoryItems: Locator;
  private _cartBadge: Locator;

  constructor(readonly page: Page) {
    super(page);
    this.setupLocators();
  }

  private setupLocators(): void {
    this._inventoryItems = this.getLocatorByDataTest(InventoryPageSelectors.items);
    this._cartBadge = this.getLocatorByDataTest(InventoryPageSelectors.cartBadge);
  }

  async assertOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`${PagePaths.INVENTORY}$`));
  }

  async assertInventoryItemsCount(expectedCount: number): Promise<void> {
    const actualInventoryItemsCount = await this._inventoryItems.count();
    expect(actualInventoryItemsCount,
      `Inventory page should have ${expectedCount} items, 
       but actually have ${actualInventoryItemsCount} items`)
      .toEqual(expectedCount);

    // check that each item element is visible
    const count = await this._inventoryItems.count();
    for (let i = 0; i < count; i++) {
      await expect(this._inventoryItems.nth(i), `Item ${i} should be visible`).toBeVisible();
    }
  }

  async addFirstItemToCart(): Promise<void> {
    const firstItem = this._inventoryItems.first();
    await expect(firstItem, "First item should be visible").toBeVisible();
    const addButton = firstItem.locator(InventoryPageSelectors.addToCartButton);
    await expect(addButton, "[Add to cart] button of the first item should be visible").toBeVisible();
    await addButton.click();
  }

  async assertCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this._cartBadge, "Cart badge should be visible").toBeVisible();
    await expect(this._cartBadge).toHaveText(String(expectedCount));
  }
}
