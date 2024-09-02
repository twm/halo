import { expect, test } from "@playwright/test"

test("home page has expected title", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
    await expect(page).toHaveScreenshot()
})
