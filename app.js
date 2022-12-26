const LOCAL_STORAGE_KEY = 'todo-vue';
const todoApp = new Vue({
  el: '.todoapp',
  data: {
    title: "Danny Johansson's ToDO List in Vue",
    todos: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [
      { text: 'Create Awesome Projects', isDone: true },
      { text: 'Get Job in the Industry', isDone: false },
      { text: 'Create More Awesome Projects', isDone: false },
    ],
    editing: null,
  },
  methods: {
    createTodo(event) {
      const textbox = event.target;
      this.todos.push({ text: textbox.value, isDone: false });
      textbox.value = '';
    },
    startEditing(todo) {
      this.editing = todo;
    },
    finishEditing(event) {
      if (!this.editing) { return; }
      const textbox = event.target;
      this.editing.text = textbox.value;
      this.editing = null;
    },
    cancelEditing() {
      this.editing = null;
    },
    destroyTodo(todo) {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },
    clearCompleted() {
      this.todos = this.activeTodos;
    },
    invertSelection() {
      this.todos.forEach((item) => {
        if(item.isDone){
          item.isDone = false;
        }
        else{
          item.isDone = true;
        }
      });
      let toggle_input = document.getElementById('toggle-all');
      let state = toggle_input.checked ?? false;
      if(this.todos.length == this.completedTodos.length){
        toggle_input.checked = true;
      }
      if(this.todos.length == this.activeTodos.length){
        toggle_input.checked = false;
      }
    },
    selectAll() {
      let state = document.getElementById('toggle-all').checked ?? false;
      this.todos.forEach((item) => {
        if(state){
          item.isDone = true;
        }
        else{
          item.isDone = false;
        }
      });
    },
  },
  computed: {
    activeTodos() {
      return this.todos.filter(t => !t.isDone);
    },
    completedTodos() {
      return this.todos.filter(t => t.isDone);
    }
  },
  watch: {
    todos: {
      deep: true,
      handler(newValue) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newValue));
      }
    }
  },
});