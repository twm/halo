<script lang="ts">
    import { run } from "svelte/legacy"

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

    interface Props {
        id: string
        value: number
        min?: number | null
        max?: number | null
        step?: number | null
        required?: boolean
    }

    let {
        id,
        value = $bindable(),
        min = null,
        max = null,
        step = null,
        required = false,
    }: Props = $props()

    let focused: boolean = $state(false)
    let input: HTMLInputElement | undefined = $state()
    let rawValue = $state(frac(value))
    let displayValue = $state(frac(value))

    run(() => {
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
    })
</script>

<span class="range">
    <input
        type="text"
        {id}
        value={focused ? rawValue : displayValue}
        bind:this={input}
        {required}
        oninput={() => {
            rawValue = input.value
        }}
        onfocus={() => {
            focused = true
        }}
        onblur={() => {
            focused = false
        }}
    />
    {#if step !== null}
        <button
            disabled={min == null || value - step < min}
            onclick={() => {
                value -= step
                rawValue = frac(value)
            }}>-{frac(step)}</button
        >
        <button
            disabled={max == null || value + step > max}
            onclick={() => {
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
        border-bottom: 2px solid var(--rule-color);
        padding: 0 2px;
        line-height: 1;
    }
    input:invalid {
        border-bottom-color: var(--invalid-color);
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
