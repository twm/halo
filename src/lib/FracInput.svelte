<script lang="ts">
    import { frac, parseFrac } from "$lib/frac"

    function validate(
        input: HTMLInputElement,
        v: number,
        min: number | null,
        max: number | null
    ) {
        if (isNaN(v)) {
            input.setCustomValidity("Enter a mixed fraction or decimal number")
            return false
        }
        if (min != null && v < min) {
            input.setCustomValidity(`Must be at least ${frac(min)}`)
            return false
        }
        if (max != null && v > max) {
            input.setCustomValidity(`Must not exceed ${frac(max)}`)
            return false
        }
        input.setCustomValidity("")
        return true
    }

    export let id: string
    export let value: number
    export let min: number | null = null
    export let max: number | null = null
    export let step: number | null = null // TODO: Add step buttons
    export let required: boolean = false

    let focused: boolean = false
    let input: HTMLInputElement
    let rawValue = frac(value)
    let displayValue = frac(value)

    $: {
        // Round to the nearest 1⁄32nd to match the masked value.
        let v = Math.round(parseFrac(rawValue) * 32) / 32

        if (input) {
            if (validate(input, v, min, max)) {
                value = v
                displayValue = frac(v)
            } else {
                displayValue = rawValue
            }
        }
    }
</script>

<span class="range">
    <input
        type="text"
        {id}
        value={focused ? rawValue : displayValue}
        bind:this={input}
        {required}
        on:input={() => {
            rawValue = input.value
        }}
        on:focus={() => {
            focused = true
        }}
        on:blur={() => {
            focused = false
        }}
    />
    {#if step !== null}
        <button
            disabled={min == null || value - step < min}
            on:click={() => {
                value -= step
                rawValue = frac(value)
            }}>-{frac(step)}</button
        >
        <button
            disabled={max == null || value + step > max}
            on:click={() => {
                value += step
                rawValue = frac(value)
            }}>+{frac(step)}</button
        >
    {/if}
</span>

<style>
    .range {
        display: flex;
        gap: 0.2rem;
    }
    input {
        box-sizing: border-box;
        width: 100%;
        background: inherit;
        color: inherit;
        border: none;
        border-bottom: 1px solid currentColor;
        padding: 0;
        line-height: 1;
    }
    :invalid {
        border-bottom-color: red;
    }

    button {
        box-sizing: border-box;
        padding: 0 0.2rem;
        line-height: 1;
        border: 1px outset black; /* so pretty ✨ */
        border-radius: 3px;
        background: white;
    }
    button:active {
        border-style: inset; /* even prettier ✨ */
    }
    button:disabled {
        opacity: 0.5;
    }
    @media print {
        button {
            display: none;
        }
    }
</style>
