<script>
    import { TEXTURES } from "./"
</script>

<svg>
    <defs>
        {#each TEXTURES as tex}
            <pattern
                id={tex.id}
                viewBox={`0 0 ${tex.widthIn} ${tex.heightIn}`}
                preserveAspectRatio="xMidYMid slice"
                width={tex.widthIn}
                height={tex.heightIn}
                patternUnits="userSpaceOnUse"
            >
                <image
                    href={tex.href}
                    width={tex.widthIn}
                    height={tex.heightIn}
                    preserveAspectRatio="none"
                />
            </pattern>
        {/each}
    </defs>
</svg>

<style>
    /* Visually hide the SVG */
    svg {
        position: absolute;
        top: -1000px;
        left: -1000px;
        width: 1px;
        height: 1px;
    }
</style>
