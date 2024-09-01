<script lang="ts">
    import type { Part } from "$lib/stores"
    import { parts } from "$lib/stores"

    function* gapped(parts: Part[], gap: number) {
        let y = 0
        for (const part of parts) {
            for (let i = 0; i < part.count; i++) {
                yield [y, part]
                y += part.width + gap
            }
        }
    }

    let gap = 0.5
    $: totalWidth = $parts.reduce((max, part) => Math.max(max, part.length), 0)
    $: totalHeight = $parts.reduce(
        (total, part) => total + (part.width + gap) * part.count,
        -gap
    )
</script>

<h2>Part List</h2>

<svg
    width={totalWidth}
    height={totalHeight}
    viewbox={`0 0 ${totalWidth} ${totalHeight}`}
    preserveAspectRatio="xMinYMid meet"
>
    {#each gapped($parts, gap) as [y, part]}
        <rect
            x="0"
            {y}
            height={part.width}
            width={part.length}
            fill={part.material.color}
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
                <td>{part.width} × {part.length}</td>
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
    th {
        text-align: left;
        border-bottom: 1px solid gray;
    }
    th,
    td {
        padding-right: 0.5em;
    }
</style>
