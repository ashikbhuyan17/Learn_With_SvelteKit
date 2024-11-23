<script>
  // @ts-ignore
  import Child from "./Child.svelte";
  // @ts-ignore
  import ChildPass from "./ChildPass.svelte";

  let parentData = 'Data from parent'; 
  let count = 0;
   // Handler to receive updated data from the child  
   /**
   * @param {{ detail: { updatedData: string; }; }} event
   */
   function handleChildUpdate(event) {  
    parentData = event.detail.updatedData;  
    count++; // Increment the count when the data is updated
  }  
  </script>
 
 <h1>Parent Component</h1>  
 <p>Data from Parent: {parentData}</p> 
 <!-- Pass prop to Child and listen for updates -->  
<ChildPass data={parentData} count={count} on:update={handleChildUpdate}  />  


  <!-- <Child name="Svelte" age={3} adjective={"adjective"}  /> -->
  