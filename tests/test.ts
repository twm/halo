import { expect, test } from "@playwright/test"

test("home page has expected title", async ({ page }) => {
    await page.goto("/")
    const title = "Picture Frame Calculator"
    await expect(page.locator("h1")).toHaveText(title)
    await expect(page).toHaveTitle(title)
    await expect(page).toHaveScreenshot()
})
