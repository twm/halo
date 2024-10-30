<script>
    import normalizeCss from "$lib/vendor/normalize.css/normalize-8.0.1.css?url"
    import stylesCss from "$lib/styles.css?url"
</script>

<svelte:head>
    <link rel="stylesheet" type="text/css" href={normalizeCss} />
    <link rel="stylesheet" type="text/css" href={stylesCss} />
</svelte:head>

<slot></slot>
