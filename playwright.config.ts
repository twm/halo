import type { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    webServer: {
        command: "npm run build && npm run preview",
        port: 4173,
    },
    testDir: "tests",
    testMatch: /(.+\.)?(test|spec)\.[jt]s/,
    reporter: [["html"], [process.env.CI ? "github" : "dot"]],
}

export default config
