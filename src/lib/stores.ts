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

export type Material = {
    name: string
    color: string
}

export const MATERIALS: Material[] = [
    { name: "Walnut", color: "#4b2606" },
    { name: "Maple", color: "beige" },
    { name: "Black", color: "black" },
]

export const material = writable<Material>(MATERIALS[0])

export type Part = {
    count: number
    width: number
    length: number
    material: Material
}

export const parts = derived(
    [frameX, frameY, frameWidth, material],
    ([$frameX, $frameY, $frameWidth, $material]) => {
        let parts: Part[]

        if ($frameX === $frameY) {
            parts = [
                {
                    count: 4,
                    width: $frameWidth,
                    length: $frameY,
                    material: $material,
                },
            ]
        } else {
            parts = [
                {
                    count: 2,
                    width: $frameWidth,
                    length: $frameY,
                    material: $material,
                },
                {
                    count: 2,
                    width: $frameWidth,
                    length: $frameX,
                    material: $material,
                },
            ]
        }

        return parts
    }
)
