<script lang="ts">
    import {
        artX,
        artY,
        frameWidth,
        frameWidthMax,
        frameWidthMin,
        stockLength,
        rabbetWidth,
        rabbetWidthMax,
        rabbetWidthMin,
        material,
        MATERIALS,
    } from "$lib/stores"
    import { frac } from "$lib/frac"
    import FracRange from "$lib/FracRange.svelte"
</script>

<h2>Inputs</h2>

<form action="#" method="GET">
    <label>
        Art width
        <input type="number" bind:value={$artX} min="1" step="0.25" required />
    </label>
    <label>
        Art height
        <input type="number" bind:value={$artY} min="1" step="0.25" required />
    </label>

    <label for="frame-width">
        Frame width

        <FracRange
            id="frame-width"
            bind:value={$frameWidth}
            max={$frameWidthMax}
            min={$frameWidthMin}
            step="0.125"
            required
        />
    </label>
    <label for="rabbet-width">
        Rabbet width
        <FracRange
            id="rabbet-width"
            bind:value={$rabbetWidth}
            max={$rabbetWidthMax}
            min={$rabbetWidthMin}
            step="0.125"
            required
        />
    </label>

    <label>
        Material
        <select bind:value={$material}>
            {#each MATERIALS as material}
                <option value={material}>{material.name}</option>
            {/each}
        </select>
    </label>
</form>

<h2>Outputs</h2>

<div class="outputs">
    <p class="label">Linear stock <span>{frac($stockLength)}"</span></p>
</div>

<style>
    form,
    .outputs {
        display: grid;
        grid-template-columns: 1fr 12rem;
        gap: 0.5rem;
    }
    label,
    .label {
        display: contents;
    }

    input,
    select {
        box-sizing: border-box;
        width: 100%;
        background: inherit;
        color: inherit;
        border: none;
        border-bottom: 1px solid currentColor;
        padding: 1px 4px;
        line-height: 1;
    }
</style>
