<!-- src/routes/+page.svelte -->
<script lang="ts">
    import { onMount } from 'svelte';
  
    let products = [];
    let categories = ["all", "electronics", "jewelery", "men's clothing", "women's clothing"];
    
    // Default states
    let selectedCategory = "all";
    let sortOption = "asc"; // Sorting by price or rating
    let currentPage = 1;
    let itemsPerPage = 5; // Number of items per page
  
    // Track total items for pagination
    let totalItems = 0;
  
    // Fetch data from API
    const fetchProducts = async () => {
      // Build API URL based on filter, sort, and pagination settings
      let url = `https://fakestoreapi.com/products`;
      if (selectedCategory !== "all") {
        url += `/category/${selectedCategory}`;
      }
      url += `?sort=${sortOption}&limit=${itemsPerPage}&page=${currentPage}`;
  
      const response = await fetch(url);
      const data = await response.json();
  
      // Set products and update total items if needed (API may not provide total count, assuming a static number here)
      products = data;
      totalItems = 20; // Assuming a static total for now; you may need to adjust based on API response
    };
  
    // Load products on mount and whenever dependencies change
    onMount(fetchProducts);
  
    // Re-fetch data when dependencies change
    $: if (selectedCategory || sortOption || currentPage) {
      fetchProducts();
    }
  </script>
  
  <div>
    <h1>Product List</h1>
  
    <!-- Filter Dropdown -->
    <label>Filter by category:</label>
    <select bind:value={selectedCategory} on:change={fetchProducts}>
      {#each categories as category}
        <option value={category}>{category}</option>
      {/each}
    </select>
  
    <!-- Sort Dropdown -->
    <label>Sort by:</label>
    <select bind:value={sortOption} on:change={fetchProducts}>
      <option value="desc">desc</option>
      <option value="asc">asc</option>
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
  
    <!-- Pagination Controls -->
    <button on:click={() => currentPage = Math.max(1, currentPage - 1)} disabled={currentPage === 1}>Previous</button>
    <span>Page {currentPage}</span>
    <button on:click={() => currentPage = currentPage + 1} disabled={(currentPage * itemsPerPage) >= totalItems}>Next</button>
  </div>
  