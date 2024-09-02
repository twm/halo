<script lang="ts">
    import {
        artX,
        artY,
        frameWidth,
        stockLength,
        material,
        MATERIALS,
    } from "$lib/stores"
    import Frame from "$lib/Frame.svelte"
    import PartList from "$lib/PartList.svelte"
    import TextureDefs from "$lib/textures/TextureDefs.svelte"

    import { frac } from "$lib/frac"
</script>

<TextureDefs />

<div class="layout">
    <Frame />
    <div class="right">
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
                Material
                <select bind:value={$material}>
                    {#each MATERIALS as material}
                        <option value={material}>{material.name}</option>
                    {/each}
                </select>
            </label>
        </form>

        <div class="results">
            <h2>Materials</h2>

            <p>Stock required: {frac($stockLength)}"</p>

            <PartList />
        </div>
    </div>
</div>

<style>
    .layout {
        display: grid;
        grid-template-columns: 1fr 20rem;
        gap: 1rem;
    }

    form {
        display: grid;
        grid-template-columns: 1fr 8rem;
        gap: 0.5rem;
    }
    label {
        display: contents;
    }
</style>
