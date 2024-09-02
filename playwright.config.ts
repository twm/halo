import type { PlaywrightTestConfig } from "@playwright/test"
import { devices } from "@playwright/test"

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: "Desktop",
            use: { ...devices["Desktop Firefox"] },
        },
        {
            name: "Tablet",
            use: { ...devices["Galaxy Tab S4"] },
        },
        {
            name: "Phone", // Galaxy S22
            use: {
                userAgent:
                    "Mozilla/5.0 (Android 14; Mobile; rv:129.0) Gecko/129.0 Firefox/129.0",
                viewport: {
                    width: 432,
                    height: 779,
                },
                deviceScaleFactor: 2.5,
                isMobile: false, // Should be true, but not supported by Firefox.
                hasTouch: true,
                defaultBrowserType: "firefox",
            },
        },
    ],
    webServer: {
        command: "npm run build && npm run preview",
        port: 4173,
    },
    testDir: "tests",
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    reporter: [["html"], [process.env.CI ? "github" : "dot"]],
}

export default config
