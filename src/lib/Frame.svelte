<script lang="ts">
    import {
        artX,
        artY,
        frameX,
        frameY,
        frameWidth,
        frameWidthMax,
        material,
    } from "$lib/stores"

    /**
     * (0, 0)          (l, 0)
     *    +--->--->--->--+
     *     \            /
     *      \          /
     *       \        /
     *        +--<---+
     *     (w, w)   (l - w, w)
     */
    function trap(l: number, w: number): string {
        return `M 0 0 L${l} 0 L ${l - w} ${w} L ${w} ${w} Z`
    }

    // The art is drawn centered in a field large enough to hold the largest
    // possible frame so that it doesn't shift around or resize as the user
    // plays with the frame width.
    let maxWidth = $derived($artX + 2 * $frameWidthMax)
    let maxHeight = $derived($artY + 2 * $frameWidthMax)
</script>

<svg
    viewBox={`${-maxWidth / 2} ${-maxHeight / 2} ${maxWidth} ${maxHeight}`}
    width={maxWidth}
    height={maxHeight}
>
    <!-- the art, centered on (0, 0) -->
    <g transform={`translate(${-$artX / 2}, ${-$artY / 2})`}>
        <rect width={$artX} height={$artY} fill="#eee" />
    </g>

    <!-- the frame, centered on (0, 0) -->
    <g transform={`translate(${-$frameX / 2}, ${-$frameY / 2})`}>
        <path id="top" d={trap($frameX, $frameWidth)} fill={$material.fill} />
        <path
            id="right"
            d={trap($frameY, $frameWidth)}
            fill={$material.fill}
            transform={`translate(${$frameX} 0) rotate(90)`}
        />
        <path
            id="bottom"
            d={trap($frameX, $frameWidth)}
            fill={$material.fill}
            transform={`translate(${$frameX} ${$frameY}) rotate(180)`}
        />
        <path
            id="left"
            d={trap($frameY, $frameWidth)}
            fill={$material.fill}
            transform={`translate(0 ${$frameY}) rotate(270)`}
        />
    </g>
</svg>

<style>
    svg {
        width: 100%;
        height: auto;
        max-height: calc(100vh - 9rem);
    }
</style>
