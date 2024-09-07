<script lang="ts">
    import {
        artX,
        artY,
        artPadding,
        frameX,
        frameY,
        frameWidth,
        rabbetWidth,
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
</script>

<svg viewBox={`0 0 ${$frameX} ${$frameY}`} width={$frameX} height={$frameY}>
    <!-- the art -->
    <rect
        x={$frameWidth - $rabbetWidth + $artPadding / 2}
        y={$frameWidth - $rabbetWidth + $artPadding / 2}
        width={$artX}
        height={$artY}
        fill="#eee"
    />
    <!-- the frame -->
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
</svg>

<style>
    svg {
        width: 100%;
        height: auto;
        max-height: 100vh;
    }
</style>
