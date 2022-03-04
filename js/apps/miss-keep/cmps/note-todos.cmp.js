export default {
  props: ["info"],
  template: `
              <section class="note-todos">
                <ul>
                  <li>
                    <input type="checkbox">
                    {{info.todos[0].txt}}
                  </li>
                  <li>
                  <input type="checkbox">
                    {{info.todos[1].txt}}
                  </li>
                </ul>
              </section>
          `,
  components: {},
};
