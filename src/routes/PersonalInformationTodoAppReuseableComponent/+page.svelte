<script>
    import { writable } from 'svelte/store';

    // Store to manage the list of personal information todos
    const todos = writable([]);

    // States for input fields and errors
    let newTodo = { name: '', email: '', phone: '' };
    let errors = {};

    // State for editing
    let editingId = null;
    let editedTodo = { name: '', email: '', phone: '' };
    let editErrors = {};

    // Function to add a new todo with validation
    function handleAdd() {
        errors = validateInputs(newTodo);
        if (Object.keys(errors).length === 0) {
            todos.update(currentTodos => [
                ...currentTodos,
                { id: Date.now(), ...newTodo }
            ]);
            newTodo = { name: '', email: '', phone: '' }; // Reset fields
        }
    }

    // Function to save the edited todo with validation
    function handleSave() {
        editErrors = validateInputs(editedTodo);
        if (Object.keys(editErrors).length === 0) {
            todos.update(currentTodos =>
                currentTodos.map(todo =>
                    todo.id === editingId ? { ...todo, ...editedTodo } : todo
                )
            );
            editingId = null; // Exit edit mode
            editedTodo = { name: '', email: '', phone: '' }; // Reset fields
        }
    }

    // Function to start editing a todo
    function startEdit(todo) {
        editingId = todo.id;
        editedTodo = { ...todo };
    }

    // Function to delete a todo
    function deleteTodo(id) {
        todos.update(currentTodos => currentTodos.filter(todo => todo.id !== id));
    }

    // Validation function to check if inputs are empty
    function validateInputs(inputs) {
        let errors = {};
        for (const key in inputs) {
            if (!inputs[key].trim()) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
            }
        }
        return errors;
    }
</script>

<h1 class="text-4xl font-bold text-center my-8">Personal Info Todo App</h1>

<div class="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
    <div class="space-y-4 mb-4">
        {#each Object.keys(newTodo) as field}
            <div>
                <input
                    type="text"
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    bind:value={newTodo[field]}
                    class={`w-full border p-2 rounded ${errors[field] ? 'border-red-500' : ''}`}
                />
                {#if errors[field]}
                    <p class="text-red-500 text-sm mt-1">{errors[field]}</p>
                {/if}
            </div>
        {/each}
    </div>
    <button 
        on:click={handleAdd} 
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
        Add
    </button>

    <ul class="mt-4 space-y-2">
        {#each $todos as todo (todo.id)}
            <li class="p-4 border rounded-md flex flex-col gap-2">
                {#if editingId === todo.id}
                    {#each Object.keys(editedTodo) as field}
                        <div>
                            <input
                                type="text"
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                bind:value={editedTodo[field]}
                                class={`w-full border p-2 rounded ${editErrors[field] ? 'border-red-500' : ''}`}
                            />
                            {#if editErrors[field]}
                                <p class="text-red-500 text-sm mt-1">{editErrors[field]}</p>
                            {/if}
                        </div>
                    {/each}
                    <button 
                        on:click={handleSave} 
                        class="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                    >
                        Save
                    </button>
                {:else}
                    <p><strong>Name:</strong> {todo.name}</p>
                    <p><strong>Email:</strong> {todo.email}</p>
                    <p><strong>Phone:</strong> {todo.phone}</p>
                    <div class="flex gap-2">
                        <button 
                            on:click={() => startEdit(todo)} 
                            class="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                        >
                            Edit
                        </button>
                        <button 
                            on:click={() => deleteTodo(todo.id)} 
                            class="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                {/if}
            </li>
        {/each}
    </ul>
</div>

<style>
    /* Optional styling */
    body {
        background-color: #f3f4f6;
        font-family: Arial, sans-serif;
    }
</style>
