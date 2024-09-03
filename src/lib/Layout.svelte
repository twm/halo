<div class="wrapper">
    <header>
        <h1>Picture Frame Cutlist Calculator</h1>
    </header>

    <slot></slot>

    <footer>
        <p>
            <!-- TODO a href="/about">About</a> ☙ -->
            © 2024 Tom Most ❧
            <a href="https://github.com/twm/halo/issues">Report an issue</a>
        </p>
    </footer>
</div>

<style>
    .wrapper {
        margin: 0 auto;
        padding: 0 0.5rem;
        max-width: 80rem;
    }

    footer {
        color: #aaa;
        text-align: center;
    }

    footer :is(:link, :visited) {
        color: inherit;
    }
</style>
