<script>
    import { artX, artY, frameWidth, stockLength } from "$lib/stores"
    import Frame from "$lib/Frame.svelte"
</script>

<h1>Picture Frame Calculator</h1>

<form action="#">
    <label>
        Art width
        <input type="number" bind:value={$artX} min="1" />
    </label>
    <label>
        Art height
        <input type="number" bind:value={$artY} min="1" />
    </label>

    <label>
        Frame width
        <input type="number" bind:value={$frameWidth} min="0.25" />
    </label>
</form>

<p>Stock length required: {$stockLength.toFixed(2)}</p>

<Frame />
