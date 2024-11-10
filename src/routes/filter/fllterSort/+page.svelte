<!-- src/routes/+page.svelte -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores"; // Import SvelteKit's page store
  import { onDestroy } from "svelte";

  export let data;

  let products = data.products;
  let category = data.category;
  let sort = data.sort;
  let currentPage = data.page;
  let totalItems = data.totalItems;
  let itemsPerPage = 5;
  let isLoading = false;

  /*
    $page Subscription: We subscribe to the $page store, which automatically tracks URL changes, and update category, sort,
     and currentPage based on the new URL parameters.

    Product Update: When the URL changes, the data from +page.js is passed to +page.svelte, and we assign products = data.products.
     This ensures products is updated without additional fetch calls.

    onDestroy Cleanup: We unsubscribe from $page to avoid memory leaks when the component is destroyed.

    This setup ensures that:

    Every time you navigate with goto, the URL changes.
    The $page subscription listens to these URL changes and reassigns products, ensuring reactivity.
    */

  // Watch for changes in URL parameters
  const unsubscribe = page.subscribe(($page) => {
    console.log("🚀 ~ unsubscribe ~ $page):", $page);

    // Update local state from the new URL parameters
    //   category = $page.url.searchParams.get('category') || 'all';
    //   console.log("🚀 ~ unsubscribe ~ category:", category)
    //   sort = $page.url.searchParams.get('sort') || 'price';
    //   currentPage = parseInt($page.url.searchParams.get('page')) || 1;

    // Update products list when URL params change
    products = data.products;
  });

  onDestroy(() => unsubscribe()); // Clean up subscription

  // Navigate and update URL to trigger data re-fetch
  const updateParams = (newCategory, newSort, newPage) => {
    isLoading = true;
    goto(`?category=${newCategory}&sort=${newSort}&page=${newPage}`).then(
      () => {
        isLoading = false;
      }
    );
  };

  // Event handlers for user actions
  const changeCategory = (e) => updateParams(e.target.value, sort, 1);
  const changeSort = (e) => updateParams(category, e.target.value, 1);
  const previousPage = () =>
    updateParams(category, sort, Math.max(1, currentPage - 1));
  const nextPage = () => updateParams(category, sort, currentPage + 1);
</script>

<div>
  <h1>Product List</h1>

  <!-- Loading Indicator -->
  <!-- {#if isLoading}
      <div>Loading...</div>
    {/if}
   -->
  <!-- Filter Dropdown -->
  <label>Filter by category:</label>
  <select bind:value={category} on:change={changeCategory}>
    {#each ["all", "electronics", "jewelery", "men's clothing", "women's clothing"] as cat}
      <option value={cat}>{cat}</option>
    {/each}
  </select>

  <!-- Sort Dropdown -->
  <label>Sort by:</label>
  <select bind:value={sort} on:change={changeSort}>
    <option value="asc">asc</option>
    <option value="desc">desc</option>
  </select>

  <!-- Product Display -->
  <ul>
    {#each products as product}
      <li>
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating.rate}</p>
      </li>
    {/each}
  </ul>

  <!-- Product Display or Loading Indicator -->
  <!-- {#if isLoading}
    <div>Loading...</div>
  {:else}
    <ul>
      {#each products as product}
        <li>
          <h3>{product.title}</h3>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating.rate}</p>
        </li>
      {/each}
    </ul>
  {/if} -->

  <!-- Pagination Controls -->
  <button on:click={previousPage} disabled={currentPage === 1}>Previous</button>
  <span>Page {currentPage}</span>
  <button
    on:click={nextPage}
    disabled={currentPage * itemsPerPage >= totalItems}>Next</button
  >
</div>
