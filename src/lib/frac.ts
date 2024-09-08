/**
 * Present a number as a mixed fraction.
 *
 * The value is rounded to the nearest 1⁄32nd, and the
 * denominator is one of 32, 16, 8, or 4, as on a measuring tape.
 */
export function frac(n: number): string {
    const abs = Math.abs(n)
    const whole = Math.floor(abs)
    const frac = abs % 1.0
    const hasFraction = frac !== 0.0

    let s = n < 0 ? "-" : ""

    if (whole != 0 || !hasFraction) {
        s += whole
    }

    if (hasFraction) {
        if (s.length) {
            // U+2009 is the thin space
            s += "\u2009"
        }
        let denom = 32
        let num = Math.round(frac * denom)

        // Simplify the fraction
        while (num % 2 === 0) {
            denom /= 2
            num /= 2
        }

        // U+2044 is the fraction slash, which in capable fonts
        // triggers proper fractional presentation.
        s += `${num}\u2044${denom}`
    }

    return s
}

/**
 * Parse a string containing fractions as a number.
 */
export function parseFrac(s: string): number {
    const matches = [
        ...s.matchAll(
            /((?:[+-]\s*)?)(\.\d+|\d+(?:\.\d*)?)(?:[\/\u2044](\d+))?(\s+|$|(?=[.+-]))/dg
        ),
    ]
    if (matches.length === 0 || matches[0].index !== 0) {
        // No match, or leading whitespace.
        return NaN
    }

    let n = 0
    let lastSign: "+" | "-" = "+"
    for (const m of matches) {
        let sign = m[1].substring(0, 1)
        let v = parseFloat(m[2])
        const denom = m[3]
        if (denom) {
            v /= parseFloat(denom)
        }
        if (!sign) {
            sign = lastSign
        }
        if (sign === "+") {
            n += v
            lastSign = "+"
        } else {
            n -= v
            lastSign = "-"
        }
    }

    const [lastStart, _] = matches[matches.length - 1].indices![4]
    if (lastStart !== s.length) {
        // Failure to match, or trailing whitespace or other gunk.
        return NaN
    }
    return n
}
