import { writable, derived } from "svelte/store"

export const artX = writable(8.5)
export const artY = writable(11.0)
export const frameWidth = writable(1.5)
export const rabbetWidth = writable(1 / 4)
export const kerfWidth = writable(1 / 16)

/*
 * ┌───────────┐   ▲
 * │  ▲        │   │
 * │ ◄┼───────►│ frameY
 * │  │ artX/Y │   │
 * │  ▼        │   │
 * └───────────┘   ▼
 * ◄─ frameX ─►
 */

/* Width of the constructed frame. */
export const frameX = derived(
    [artX, frameWidth, rabbetWidth],
    ([$artX, $frameWidth, $rabbetWidth]) => {
        return $artX - $rabbetWidth * 2 + $frameWidth * 2
    }
)

/* Height of the constructed frame. */
export const frameY = derived(
    [artY, frameWidth, rabbetWidth],
    ([$artY, $frameWidth, $rabbetWidth]) => {
        return $artY - $rabbetWidth * 2 + $frameWidth * 2
    }
)

/**
 * Absolute minimum length of stock required (no fudge factor).
 */
export const stockLength = derived(
    [frameX, frameY, kerfWidth],
    ([$frameX, $frameY, $kerfWidth]) => {
        return 2 * $frameX + 2 * $frameY + 3 * $kerfWidth
    }
)
