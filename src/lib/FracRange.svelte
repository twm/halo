<script lang="ts">
    import { frac } from "$lib/frac"

    export let id: string
    export let value: number
    export let min: number
    export let max: number
    export let step: number
    export let required: boolean = false
</script>

<span class="range">
    <output for={id}>{frac(value)}"</output>
    <input type="range" {id} bind:value {min} {max} {step} {required} />
</span>

<style>
    .range {
        display: grid;
        grid-template-columns: 3rem 1fr;
    }

    output {
        padding: 0 2px;
    }

    input {
        width: 100%;
        box-sizing: border-box;
        background: inherit;
        color: inherit;
        border: none;
    }
</style>
