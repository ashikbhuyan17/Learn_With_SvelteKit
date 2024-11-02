<script>
    import { goto } from '$app/navigation'; // Import goto function
    export let data;
    
    const loadData = data.props.data;
    console.log('🚀 ~ loadData:', loadData);
    
    // Function to navigate to the product details page
    function navigateToProduct(id) {
      goto(`/products/${id}`);
    }
  </script>
  
  <h1>Welcome to Products page</h1>
  <p><a href="products/1">Product 1</a></p>
  <p><a href="products/2">Product 2</a></p>
  <p><a href="products/3">Product 3</a></p>
  
  <h1>Shopping list</h1>
  <div>
    {#each loadData as item}
    <button 
      type="button"
      class="border-4 bg-red-300 cursor-pointer p-2 m-1 w-full text-left" 
      on:click={() => navigateToProduct(item.id)}
    >
      <p>{item.title}</p>
      <p>{item.description}</p>
    </button>
  {/each}
  </div>
  