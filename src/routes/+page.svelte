<script>
    let artWidth = 8.5
    let artHeight = 11
    let frameWidth = 1.5
    let rabbetWidth = 1 / 4
    let kerf = 1 / 16
    let stockLength = 0;
    $: {
        stockLength = 2 * artWidth + 2 * artHeight + 3 * kerf
    }
</script>

<h1>Picture Frame Calculator</h1>

<form action="#">
    <label>
        Art width
        <input type="number" bind:value={artWidth} />
    </label>
    <label>
        Art height
        <input type="number" bind:value={artHeight} />
    </label>

    <label>
        Frame width
        <input type="number" bind:value={frameWidth} />
    </label>

    <label>
        Rabbet width
        <input type="number" bind:value={rabbetWidth} />
    </label>
</form>

<p>Stock length required: {stockLength.toFixed(2)}</p>
