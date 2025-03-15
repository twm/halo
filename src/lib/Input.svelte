<script lang="ts">
    import type { HTMLInputAttributes } from "svelte/elements"
    let props: HTMLInputAttributes = $props()

    let input: HTMLInputElement | undefined = $state()
    export function setCustomValidity(s: string): void {
        if (input) input.setCustomValidity(s)
    }
</script>

<input {...props} />

<style>
    input {
        box-sizing: border-box;
        width: 100%;
        background: inherit;
        color: inherit;
        border: none;
        border-bottom: 2px solid var(--rule-color);
        padding: 0 2px;
        line-height: 1;
    }
    input:invalid {
        border-bottom-color: var(--invalid-color);
    }
</style>
