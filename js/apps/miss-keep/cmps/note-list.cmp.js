export default {
  props: ["notes"],
  template: `
    	<section class="notes-list">
            <ul class="notes-area">
                <li class="note-card" v-for="note in notes">
                    {{note}}
                </li>
            </ul>
        </section>
    `,
  components: {},
};
