<script>
    import { writable } from 'svelte/store';

    // Store to manage the list of personal information todos
    let todos = writable([]);

    // States for input fields
    let name = '';
    let email = '';
    let phone = '';

    // Error states for each field
    let nameError = false;
    let emailError = false;
    let phoneError = false;

    // State to track the todo being edited
    let editingId = null;
    let editedName = '';
    let editedEmail = '';
    let editedPhone = '';

    // Validate and add a new personal information todo
    function addTodo() {
        if (validateInputs()) {
            todos.update(currentTodos => [
                ...currentTodos,
                { id: Date.now(), name: name.trim(), email: email.trim(), phone: phone.trim() }
            ]);
            resetInputs();
        }
    }

    // Validate input fields and set error flags
    function validateInputs() {
        nameError = !name.trim();
        emailError = !email.trim();
        phoneError = !phone.trim();

        // Return true if all fields are valid, otherwise false
        return !(nameError || emailError || phoneError);
    }

    // Delete a personal information todo
    function deleteTodo(id) {
        todos.update(currentTodos => currentTodos.filter(todo => todo.id !== id));
    }

    // Start editing a personal information todo
    function editTodo(todo) {
        editingId = todo.id;
        editedName = todo.name;
        editedEmail = todo.email;
        editedPhone = todo.phone;
    }

    // Save the edited personal information todo
    function saveTodo() {
        if (validateEditedInputs()) {
            todos.update(currentTodos =>
                currentTodos.map(todo =>
                    todo.id === editingId
                        ? { ...todo, name: editedName, email: editedEmail, phone: editedPhone }
                        : todo
                )
            );
            editingId = null;
            resetInputs();
        }
    }

    // Validate edited inputs
    function validateEditedInputs() {
        return editedName.trim() && editedEmail.trim() && editedPhone.trim();
    }

    // Reset input fields and errors
    function resetInputs() {
        name = '';
        email = '';
        phone = '';
        nameError = false;
        emailError = false;
        phoneError = false;
    }
</script>

<h1 class="text-4xl font-bold text-center my-8">Personal Info Todo App</h1>

<div class="max-w-lg mx-auto bg-white shadow-md p-6 rounded-lg">
    <!-- Input Fields -->
    <div class="space-y-4 mb-4">
        <div>
            <input
                type="text"
                placeholder="Name"
                bind:value={name}
                class={`w-full border p-2 rounded ${nameError ? 'border-red-500' : ''}`}
            />
            {#if nameError}
                <p class="text-red-500 text-sm mt-1">Name is required.</p>
            {/if}
        </div>
        <div>
            <input
                type="email"
                placeholder="Email"
                bind:value={email}
                class={`w-full border p-2 rounded ${emailError ? 'border-red-500' : ''}`}
            />
            {#if emailError}
                <p class="text-red-500 text-sm mt-1">Email is required.</p>
            {/if}
        </div>
        <div>
            <input
                type="tel"
                placeholder="Phone"
                bind:value={phone}
                class={`w-full border p-2 rounded ${phoneError ? 'border-red-500' : ''}`}
            />
            {#if phoneError}
                <p class="text-red-500 text-sm mt-1">Phone is required.</p>
            {/if}
        </div>
    </div>
    <button
        on:click={addTodo}
        class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    >
        Add
    </button>

    <!-- Personal Information List -->
    <ul class="mt-4 space-y-2">
        {#each $todos as todo (todo.id)}
            <li class="p-4 border rounded-md flex flex-col gap-2">
                {#if editingId === todo.id}
                    <input
                        type="text"
                        bind:value={editedName}
                        class="w-full border p-2 rounded"
                    />
                    <input
                        type="email"
                        bind:value={editedEmail}
                        class="w-full border p-2 rounded"
                    />
                    <input
                        type="tel"
                        bind:value={editedPhone}
                        class="w-full border p-2 rounded"
                    />
                    <button
                        on:click={saveTodo}
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
                            on:click={() => editTodo(todo)}
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
