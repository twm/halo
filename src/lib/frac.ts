import Fraction from "fraction.js"

/**
 * Present a number as a fraction.
 */
export function frac(n: number): string {
    const f = new Fraction(n).simplify(1 / 64)
    const s = f.toFraction(true)

    const m = / (\d+)\/(\d+)$/.exec(s)
    if (m) {
        const whole = s.substring(0, m.index)
        const num = m[1]
        const denom = m[2]
        // U+2009 is the thin space
        // U+2044 is the fraction slash, which in capable fonts
        // triggers proper fractional presentation.
        return `${whole}\u2009${num}\u2044${denom}`
    }
    return s
}
