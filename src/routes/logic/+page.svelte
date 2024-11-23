<!-- <script>
    let count = 0;

    function increment() {
        count += 1;
    }

    function decrement() {
        count -= 1;
    }
</script>

<button on:click={increment}>Increment</button>

<button on:click={decrement} disabled={count === 0}>Decrement</button>

<p>The count is: {count}</p> -->

<!-- {#key count}
    <p>The count is: {count}</p>
{/key} -->

<script>  
    let count = 0;  
    let doubleCount;  

    // Reactive declaration  
    // $: doubleCount = count * 2;  
</script>  

<button on:click={() => count++} class='bg-red-300 p-2 rounded-md' >  
    Increment Count  
</button>  

<p>Count: {count}</p>  
<p>Double Count: {doubleCount}</p>  