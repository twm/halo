import { describe, test, expect } from "vitest"
import { frac, parseFrac } from "$lib/frac"

describe("frac renders numbers as mixed fractions", () => {
    const cases: [number, string][] = [
        [-1 - 3 / 8, '-1\u20093⁄8"'],
        [-1, '-1"'],
        [0, '0"'],
        [1, '1"'],
        [1.5, '1\u20091⁄2"'],
        [12.25, '12\u20091⁄4"'],
        [-6.125, '-6\u20091⁄8"'],
        [1 / 4, '1⁄4"'],
        [7 / 8, '7⁄8"'],
        [15 / 16, '15⁄16"'],
        [1 + 17 / 32, '1\u200917⁄32"'],
        [23 / 32, '23⁄32"'],
        [3 + 61.5 / 64, '3\u200931⁄32"'],
    ]
    test.for(cases)("renders %d as %s", ([n, s]) => {
        expect(frac(n)).toEqual(s)
    })
})

describe("parseFrac converts strings to numbers", () => {
    const cases: [string, number][] = [
        // Whole numbers
        ["1", 1],
        ["1.", 1],
        ["0", 0],
        ["-1", -1],
        ["-1.", -1],
        ["-1.0", -1],
        // Decimal numbers
        ["1.25", 1.25],
        ["+1.25", 1.25],
        ["+12.25", 12.25],
        // Vulgar fractions
        ["1/64", 1 / 64],
        ["5/32", 5 / 32],
        ["-1/4", -0.25],
        ["+6/32", 6 / 32],
        // Mixed fractions
        ["1 3/4", 1.75],
        ["-1 1/2", -1.5],
        // Basic expressions
        ["6+1/2", 6.5],
        ["4.5-4.5", 0],
        ["4.0/2-2+3/5", 3 / 5],
        ["8 1/2 1/4 1/8 -3/4", 8 + 7 / 8 - 3 / 4],
        ["8 1/2 + 1/4 +1/8 - 3/4", 8 + 7 / 8 - 3 / 4],
        // Invalid input
        ["", NaN],
        ["abc", NaN],
        ["12abc", NaN],
        ["abc123", NaN],
        [" 123", NaN],
        ["123 ", NaN],
        ["1/2.3", NaN],
        // " is allowed following the number
        ['8"', 8],
        ['8" 1/2"', 8.5],
        ['6" + 1/2" - 0.25 + 1/2"', 6.75],
        ['1"/2', NaN],
        // ' following the number multiplies by 12 (feet to inches)
        ["1'", 12],
        ["1'2", 14], // No whitespace necessary
        ["1' 2", 14],
        ["1' 2\"", 14],
        ["1' + 2", 14],
        ["1'+2\"", 14],
        ["1/2' +12\"", 18],
        ["3'4'5'6'1/2'", (3 + 4 + 5 + 6 + 0.5) * 12],
    ]
    test.for(cases)("parses %j as %d", ([s, n]) => {
        expect(parseFrac(s)).toEqual(n)
    })
})

describe('parseFrac(frac(n)) round-trips within 1/32"', () => {
    test.for([1, 1.5, 23 / 32, 9000, -128 + 3 / 32])("%d", (n) => {
        const s = frac(n)
        expect(parseFrac(s)).toEqual(n)
    })
})
