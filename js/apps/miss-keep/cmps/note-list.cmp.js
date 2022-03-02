import notePreview from "../cmps/note-preview.cmp.js";

export default {
  props: ["notes"],
  template: `
    	<section class="notes-list">
            <ul class="notes-area">
                <li class="note-card" v-for="note in notes">
                    <note-preview :note="note"></note-preview>
                </li>
            </ul>
        </section>
    `,
  components: {
    notePreview,
  },
};
