export default {
  props: ["info"],
  template: `
            <section class="note-todos">
              <div v-if="openTodos.length > 0">
                <ul>
                  <li v-for="todo in openTodos" :key="todo.id">
                    <input type="checkbox" :checked="todo.isDone" @change="markCheckBox($event.target.checked, todo.id)">
                    <input type="text" :value="todo.txt" @change="changeTodo($event.target.value, todo.id)">
                  </li>
                </ul>
              </div>
              <div v-if="closeTodos.length > 0">
                <ul>
                  <li v-for="todo in closeTodos" class="done" :key="todo.id">
                  <input type="checkbox" :checked="todo.isDone" @change="markCheckBox($event.target.checked, todo.id)">
                    {{todo.txt}}
                  </li>
                </ul>
              </div>
            </section>
          `,
  methods: {
    changeTodo(content, todoId) {
      this.$emit("changeTodo", content, todoId);
    },
    markCheckBox(mark, todoId) {
      this.$emit("markCheckBox", mark, todoId);
    },
  },
  computed: {
    openTodos() {
      return this.info.todos.filter((todo) => todo.isDone === false);
    },

    closeTodos() {
      return this.info.todos.filter((todo) => todo.isDone === true);
    },
  },
};
