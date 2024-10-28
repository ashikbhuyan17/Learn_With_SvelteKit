<script>
    import "../styles/app.css";
  </script>
 <div class="space-y-4">
 <section class="flex justify-center items-center h-[100px]">
  <nav class=" space-x-10">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/products">products</a>
    <a href="/todoApp">todo</a>
    <a href="/PersonalInformationTodoApp">PersonalInformationTodoApp</a>
    <a href="/svelte-carousel">svelte-carousel</a>
    <a href="/breakOutOfLayout">Break Out Of Layout</a>
  </nav>
 </section>
 
  <div class="box bg-gray-200 shadow-md p-5 min-h-[500px]">
    <slot />
    <!-- 
      the <slot /> element is used in components to indicate where child content should be rendered. 
      layout mofhe amader sokol page gula  render hoi
    -->
  </div>
 </div>
  
  <!-- <style>
    .box {
      border: 2px solid #333;
      padding: 10px;
    }
  </style> -->
  