<script>  
  // Import the dispatcher to communicate with the parent  
  import { createEventDispatcher } from 'svelte';  
  
  // Receive data from parent  
  export let data;  
  export let count;  
  
  const dispatch = createEventDispatcher();  
  
  let childData = data; // Local state in the child component  

  // Update the local state when the prop changes  
  $: childData = data; // Make it reactive to changes in `data` from parent  

  // Function to update the child's local data and send it back to the parent  
  function updateData() {  
    childData = "Updated data from child"; // Update child data  
    dispatch('update', { updatedData: childData }); // Dispatch the event to parent  
  }  
</script>  

<h2>Child Component</h2>  
<p>Data from Child (local): {childData}</p>  
<p>Data from count (count): {count}</p>  

<button on:click={updateData} class="bg-red-300 p-2 rounded-md">Update Data and Notify Parent</button>