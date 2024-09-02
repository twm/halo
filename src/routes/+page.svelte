<script>
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
</script>

<TextureDefs />

<div class="layout">
    <Frame />
    <div class="right">
        <h1>Picture Frame Calculator</h1>
        <form action="#" method="GET">
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
            <h2>Output</h2>
            <p>Stock required: {$stockLength}</p>

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
