import { writable } from 'svelte/store';

// Define the Todo interface
export interface Todo {
  id: number; // Each todo should have a unique ID
  text: string;
  completed: boolean;
}

// Define the TodoService interface
export interface TodoService {
  getTodos(): Todo[];
  addTodo(value: string): void;
  deleteTodo(id: number): void;
  toggleComplete(id: number): void;
  editTodo(id: number, text: string): void;
}

// Implement the TodoService class
export class TodoServiceImpl implements TodoService {
  /*
    এটি Svelte এর writable স্টোর, যেখানে টুডোগুলো সংরক্ষণ করা হয়। এটি রিঅ্যাক্টিভ, অর্থাৎ, 
    টুডোতে পরিবর্তন হলে ইউজার ইন্টারফেস আপডেট হয়।
*/
  private todosStore = writable<Todo[]>([]); // Svelte's writable store to track todos

  // Fetch todos as a plain array
  getTodos(): Todo[] {
    let todos: Todo[] = [];
    this.todosStore.subscribe((current) => {
      todos = current;
    })();
    return todos;
  }

  // Add a new todo
  addTodo(value: string): void {
    if (value.trim()) {
      this.todosStore.update((currentTodos) => [
        ...currentTodos,
        { id: Date.now(), text: value.trim(), completed: false },
      ]);
    }
  }

  // Delete a todo by ID
  deleteTodo(id: number): void {
    this.todosStore.update((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  // Toggle a todo's completion status
  toggleComplete(id: number): void {
    this.todosStore.update((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // Edit a todo's text by ID
  editTodo(id: number, text: string): void {
    if (text.trim()) {
      this.todosStore.update((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id ? { ...todo, text: text.trim() } : todo
        )
      );
    }
  }

  // Expose the writable store for use in Svelte components
  get todos() {
    return this.todosStore;
  }
}
