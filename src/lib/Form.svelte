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
    import FracInput from "$lib/FracInput.svelte"
    import FracRange from "$lib/FracRange.svelte"
</script>

<h2>Inputs</h2>

<form action="#" method="GET">
    <label for="art-width"> Art width </label>
    <FracInput id="art-width" bind:value={$artX} min={1} required />
    <label for="art-height"> Art height </label>
    <FracInput id="art-height" bind:value={$artY} min={1} required />

    <label for="frame-width"> Frame width </label>

    <FracRange
        id="frame-width"
        bind:value={$frameWidth}
        max={$frameWidthMax}
        min={$frameWidthMin}
        step={0.125}
        required
    />
    <label for="rabbet-width"> Rabbet width </label>
    <FracRange
        id="rabbet-width"
        bind:value={$rabbetWidth}
        max={$rabbetWidthMax}
        min={$rabbetWidthMin}
        step={0.125}
        required
    />

    <label for="material"> Material </label>
    <select id="material" bind:value={$material}>
        {#each MATERIALS as material}
            <option value={material}>{material.name}</option>
        {/each}
    </select>
</form>

<h2>Outputs</h2>

<div class="outputs">
    <label for="linear-stock">Linear stock </label>
    <output id="linear-stock">{frac($stockLength)}"</output>
</div>

<style>
    form,
    .outputs {
        display: grid;
        grid-template-columns: 1fr 12rem;
        gap: 0.5rem;
    }

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
