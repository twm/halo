import { expect, test } from "@playwright/test"

test("calculator layout", async ({ page }) => {
    await page.goto("/")
    const title = "Picture Frame Cutlist Calculator"
    await expect(page.locator("h1")).toHaveText(title)
    await expect(page).toHaveTitle(title)
    await expect(page).toHaveScreenshot()
})
