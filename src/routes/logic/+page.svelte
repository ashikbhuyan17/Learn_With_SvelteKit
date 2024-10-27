<script>
    let count = 0;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }
</script>

<!-- Increment Button -->
<button on:click={increment}>Increment</button>

<!-- Decrement Button: Disabled if count is 0 -->
<button on:click={decrement} disabled={count === 0}>Decrement</button>

<p>The count is: {count}</p>

<!-- {#key count}
    <p>The count is: {count}</p>
{/key} -->

