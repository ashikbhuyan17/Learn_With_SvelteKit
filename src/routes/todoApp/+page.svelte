<script>
  import { writable } from 'svelte/store';
  import { TodoServiceImpl } from './todoServices';

  //  Create a writable store with an initial value of 0
  // update() is a method provided by Svelte’s writable store that allows you to modify the current value of the store.
  // let todos = writable([]);

  /**
    todoService: টুডো লজিক পরিচালনার জন্য ক্লাসের একটি ইনস্ট্যান্স,যা দিয়ে আমরা todoService ক্লাসের সকল প্রপার্টি, মেথড ব্যবহার করতে পারবো 
    todos: রিঅ্যাক্টিভ স্টোর, যা ইউজার ইন্টারফেসে ব্যবহৃত হয়।
   */
  const todoService = new TodoServiceImpl();
  // Reactive todos store
  const todos = todoService.todos;
  console.log("🚀 ~ todos:", $todos) //$value refers to a writable store's subscribed value
  
   // Local state
   let newTodo = '';
  let editingId = null;
  let editedText = '';

   // Add a new todo
   function addTodo() {
    todoService.addTodo(newTodo);
    newTodo = ''; // Clear input
  }

 // Delete a todo
 function deleteTodo(id) {
    todoService.deleteTodo(id);
  }

  // Toggle completion status
  function toggleComplete(id) {
    todoService.toggleComplete(id);
  }

    // Start editing a todo
    function editTodo(todo) {
    editingId = todo.id;
    editedText = todo.text;
  }

    // Save the edited todo
  function saveTodo() {
    todoService.editTodo(editingId, editedText);
    editingId = null;
    editedText = '';
  }
</script>

<h1 class="text-4xl font-bold text-center my-8">Todo App</h1>

<div class="max-w-xl mx-auto bg-white shadow-md p-6 rounded-lg">
  <!-- Add Todo Input -->
  <div class="flex gap-2 mb-4">
    <input
      type="text"
      placeholder="Add a new todo"
      bind:value={newTodo}
      on:keydown={(e) => e.key === 'Enter' && addTodo()}
      class="w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      on:click={addTodo}
      class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Add
    </button>
  </div>

  <!-- Todo List -->
  <ul class="space-y-4">
    {#each $todos as todo (todo.id)}
      <li class="flex items-center gap-4 p-2 border-b border-gray-200">
        <input
          type="checkbox"
          checked={todo.completed}
          on:change={() => toggleComplete(todo.id)}
          class="h-5 w-5 text-blue-500"
        />

        {#if editingId === todo.id}
          <!-- Edit Mode -->
          <input
            type="text"
            bind:value={editedText}
            class="border-2 border-gray-300 p-2 rounded w-full"
          />
          <button
            on:click={saveTodo}
            class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        {:else}
          <!-- Display Todo Text -->
          <span
            class={`flex-grow ${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.text}
          </span>

          <button
            on:click={() => editTodo(todo)}
            class="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500"
          >
            Edit
          </button>
          <button
            on:click={() => deleteTodo(todo.id)}
            class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Delete
          </button>
        {/if}
      </li>
    {/each}
  </ul>
</div>
