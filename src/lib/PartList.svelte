<script lang="ts">
    import type { Part } from "$lib/stores"
    import { frac } from "$lib/frac"
    import { parts } from "$lib/stores"

    function* gapped(parts: Part[], gap: number): IterableIterator<[number, Part]> {
        let y = 0
        for (const part of parts) {
            for (let i = 0; i < part.count; i++) {
                yield [y, part]
                y += part.width + gap
            }
        }
    }

    let gap = 0.5
    let totalWidth = $derived($parts.reduce((max, part) => Math.max(max, part.length), 0))
    let totalHeight = $derived($parts.reduce(
        (total, part) => total + (part.width + gap) * part.count,
        -gap
    ))
</script>

<h2>Part List</h2>

<svg
    width={totalWidth}
    height={totalHeight}
    viewBox={`0 0 ${totalWidth} ${totalHeight}`}
    preserveAspectRatio="xMinYMid meet"
>
    {#each gapped($parts, gap) as [y, part]}
        <rect
            x="0"
            {y}
            height={part.width}
            width={part.length}
            fill={part.material.fill}
        />
    {/each}
</svg>

<table>
    <thead>
        <tr>
            <th>Count</th>
            <th>Dimensions</th>
            <th>Material</th>
        </tr>
    </thead>
    <tbody>
        {#each $parts as part}
            <tr>
                <td>{part.count}</td>
                <td>{frac(part.width)} × {frac(part.length)}</td>
                <td>{part.material.name}</td>
            </tr>
        {/each}
    </tbody>
</table>

<style>
    svg {
        width: 100%;
        height: auto;
    }
    table {
        border-spacing: 0;
    }
    th,
    td {
        text-align: left;
        vertical-align: baseline;
        padding: 0.25rem 0.5em 0.25rem 0;
    }
    thead th {
        font-weight: normal;
        padding-right: 1rem;
        border-bottom: 2px solid var(--rule-color);
    }
</style>
