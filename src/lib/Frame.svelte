<script>
    import { artX, artY, frameX, frameY, frameWidth, rabbetWidth } from "$lib/stores"

    let frameInnerX = $frameX - 2 * $frameWidth;
    let frameInnerY = $frameY - 2 * $frameWidth;
</script>

<svg viewBox={`0 0 ${$frameX} ${$frameY}`}>
    <!-- the art -->
    <rect
        x={$frameWidth - $rabbetWidth}
        y={$frameWidth - $rabbetWidth}
        width={$artX}
        height={$artY}
        fill="#eee"
    />
    <!-- the frame -->
    <path
        d={`M 0 0
        l ${$frameX} 0
        l 0 ${$frameY}
        l ${-$frameX} 0
        Z

        M ${$frameWidth} ${$frameWidth}
        l ${frameInnerX} 0
        l 0 ${frameInnerY}
        l ${-frameInnerX} 0
        Z
        `}
        fill="none"
        stroke="black"
        stroke-width="0.01px"
    />
    <!-- the miter cuts -->
    <path
        d={`M 0 0
        l ${$frameWidth} ${$frameWidth}

        M ${$frameX} 0
        l ${-$frameWidth} ${$frameWidth}

        M ${$frameX} ${$frameY}
        l ${-$frameWidth} ${-$frameWidth}

        M 0 ${$frameY}
        l ${$frameWidth} ${-$frameWidth}
        `}
        fill="none"
        stroke="red"
        stroke-width="0.01px"
    />
</svg>
