import { readable, writable, derived } from "svelte/store"

/**
 * Horizontal dimension of the matted art and glass.
 */
export const artX = writable(8 + 1 / 2)
/**
 * Vertical dimension of the matted art and glass.
 */
export const artY = writable(11)
/**
 * Gap between art and frame to allow for expansion/contraction
 * of the frame.
 *
 * Ideally this would be derived from the longitudinal shrinkage
 * factor of the material and the dimensions of the frame, but
 * that would only matter for *very* large frames.
 */
export const artPadding = readable(1 / 16)

/**
 * Width of the frame material.
 */
export const frameWidth = writable(1 + 1 / 2)
export const frameWidthMax = readable(4)
export const frameWidthMin = readable(1 / 2)

/**
 * Size of the rabbet on the interior of the frame.
 */
export const rabbetWidth = writable(1 / 4)
export const rabbetWidthMax = readable(1 / 2)
export const rabbetWidthMin = readable(1 / 8)

/**
 * Kerf of the saw blade used to make cuts.
 */
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
    [artX, artPadding, frameWidth, rabbetWidth],
    ([$artX, $artPadding, $frameWidth, $rabbetWidth]) => {
        return $artX + $artPadding - $rabbetWidth * 2 + $frameWidth * 2
    }
)

/* Height of the constructed frame. */
export const frameY = derived(
    [artY, artPadding, frameWidth, rabbetWidth],
    ([$artY, $artPadding, $frameWidth, $rabbetWidth]) => {
        return $artY + $artPadding - $rabbetWidth * 2 + $frameWidth * 2
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
    fill: string
}

export const MATERIALS: Material[] = [
    { name: "Red oak, rift", fill: "url(#red-oak1)" },
    { name: "Red oak, flat", fill: "url(#red-oak2)" },
    { name: "Walnut", fill: "url(#raw-walnut)" }, // TODO: Better walnut image
    //{ name: "Maple", fill: "beige" }, // TODO: Maple image
    { name: "Black", fill: "black" },
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
