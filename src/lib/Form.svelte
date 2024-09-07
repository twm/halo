<script lang="ts">
    import {
        artX,
        artY,
        frameWidth,
        stockLength,
        rabbetWidth,
        material,
        MATERIALS,
    } from "$lib/stores"
    import { frac } from "$lib/frac"
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

    <label>
        Frame width
        <input
            type="number"
            bind:value={$frameWidth}
            min="0.25"
            step="0.125"
            required
        />
    </label>
    <label>
        Rabbet width
        <input
            type="number"
            bind:value={$rabbetWidth}
            min="0.125"
            step="0.125"
            max={$frameWidth - 1 / 4}
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
        grid-template-columns: 1fr 8rem;
        gap: 0.5rem;
    }
    label,
    .label {
        display: contents;
    }

    input,
    select {
        background: inherit;
        color: inherit;
        border: 1px solid currentColor;
        padding: 1px 4px;
        line-height: 1;
    }
</style>
