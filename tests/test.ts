import { expect, test } from "@playwright/test"

test("calculator layout", async ({ page }) => {
    await page.goto("/")
    const title = "Picture Frame Cutlist Calculator"
    await expect(page.locator("h1")).toHaveText(title)
    await expect(page).toHaveTitle(title)
    await expect(page).toHaveScreenshot({
        scale: "device",
        // The <select> tag doesn't render consistently locally versus on GHA, so mask it away.
        mask: [page.locator("select")],
    })
})
