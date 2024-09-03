<script lang="ts">
    import {
        artX,
        artY,
        frameWidth,
        stockLength,
        material,
        MATERIALS,
    } from "$lib/stores"
    import Layout from "$lib/Layout.svelte"
    import Frame from "$lib/Frame.svelte"
    import Form from "$lib/Form.svelte"
    import PartList from "$lib/PartList.svelte"
    import TextureDefs from "$lib/textures/TextureDefs.svelte"

    import { frac } from "$lib/frac"
</script>

<svelte:head>
    <title>Picture Frame Cutlist Calculator</title>
</svelte:head>

<TextureDefs />

<Layout>
    <div class="container">
        <main>
            <div class="form">
                <Form />
            </div>
            <div class="frame">
                <Frame />
            </div>
            <div class="parts">
                <PartList />
            </div>
        </main>
    </div>
</Layout>

<style>
    .container {
        container-type: inline-size;
    }
    main {
        display: grid;
        column-gap: 1rem;
        grid-template-areas: "form frame parts";
        grid-template-columns: 20rem 1fr 20rem;
    }
    @container (width < 50rem) and (width >= 40rem) {
        main {
            grid-template-areas: "form frame" "parts frame";
            grid-template-columns: 20rem 1fr;
        }
    }
    @container (width < 40rem) {
        main {
            grid-template-areas: "form" "frame" "parts";
            grid-template-columns: 1fr;
            grid-template-rows: min-content 70vh min-content;
        }
    }

    .form {
        grid-area: form;
    }
    .frame {
        grid-area: frame;
    }
    .parts {
        grid-area: parts;
    }
</style>
