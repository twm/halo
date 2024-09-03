<script>
    import normalizeCss from "$lib/vendor/normalize.css/normalize-8.0.1.css?url"
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" href={normalizeCss} />
</svelte:head>

<slot></slot>

<style>
    @font-face {
        font-family: "Zilla Slab";
        font-weight: 400;
        font-style: normal;
        font-stretch: normal;
        src: url("$lib/vendor/zilla-slab/ZillaSlab-Regular.woff2") format("woff2");
    }
    @font-face {
        font-family: "Zilla Slab";
        font-weight: 700;
        font-style: normal;
        font-stretch: normal;
        src: url("$lib/vendor/zilla-slab/ZillaSlab-Bold.woff2") format("woff2");
    }
    :global(body) {
        font:
            400 1rem / 1.2 "Zilla Slab",
            "URW Bookman",
            serif;
    }
</style>
