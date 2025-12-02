import { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(readonly page: Page) {
  }

  public getLocator(selector: string): Locator {
    return this.page.locator(selector);
  }

  public getLocatorByDataTest(dataTestValue: string): Locator {
    return this.getLocator(`//*[@data-test='${dataTestValue}']`);
  }
}