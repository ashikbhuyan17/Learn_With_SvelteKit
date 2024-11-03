<script>
   let props = $props();
    console.log("🚀 ~ props:", props)
    let { name, age,adjective = 'happy' } = props
    console.log("🚀 ~ name, age:", name, age)
    
    // Ensure count is a reactive $state if it needs to be modified

   
  </script>
  
  <p>Name: {name}</p>
  <p>Age: {age}</p>
  <p>adjective: {adjective}</p>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, distinctio!</p>



  