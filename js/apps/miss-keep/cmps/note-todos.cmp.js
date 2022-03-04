export default {
  props: ["info"],
  template: `
            <section class="note-todos">
              <div v-if="openTodos.length > 0">
                <ul>
                  <li v-for="todo in openTodos">
                    <input type="checkbox" :checked="todo.isDone">
                    {{todo.txt}}
                  </li>
                </ul>
              </div>
              <div v-if="closeTodos.length > 0">
                <ul>
                  <li v-for="todo in closeTodos" class="done">
                  <input type="checkbox" :checked="todo.isDone">
                    {{todo.txt}}
                  </li>
                </ul>
              </div>
            </section>
          `,
  components: {},
  computed: {
    openTodos() {
      return this.info.todos.filter((todo) => todo.isDone === false);
    },

    closeTodos() {
      return this.info.todos.filter((todo) => todo.isDone === true);
    },
  },
};
