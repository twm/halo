<script lang="ts">
    let props = $props()
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
