<script>
  let count = $state(0); // স্টেট তৈরি
  let price = 100;
  let quantity = 1;
  function increment() {
    count += 1;
    quantity=quantity+1
  }
  // derived value
  let total = $derived(price * quantity);

  let message = $state('');
</script>

<button on:click={increment} class="bg-purple-500 text-white p-2 rounded-md"
  >Count: {count}</button
>
<p>Total Price: {total}</p>
<p>Quantity: {quantity}</p>
<p>Price per item: {price}</p>

<input bind:value={message} placeholder="xxx" type="number" />
<p>{message}</p>



