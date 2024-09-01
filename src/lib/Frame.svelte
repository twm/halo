<script>
    import { artX, artY, frameX, frameY, frameWidth, rabbetWidth } from "$lib/stores"
</script>

<svg viewBox={`0 0 ${$frameX} ${$frameY}`}>
    <rect
        x={$frameWidth - $rabbetWidth}
        y={$frameWidth - $rabbetWidth}
        width={$artX}
        height={$artY}
        fill="#eee"
    />
</svg>
