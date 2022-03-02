import notePreview from "../cmps/note-preview.cmp.js";

export default {
  props: ["notes"],
  template: `
    	<section class="notes-list">
            <ul class="notes-area">
                <li class="note-card" v-for="note in notes">
                    <note-preview :note="note"></note-preview>
                    <button @click="removeNote(note.id)">
                      <img src="img-notes/bx-trash.svg" alt="trash">
                    </button>
                </li>
            </ul>
        </section>
    `,
  components: {
    notePreview,
  },
  methods: {
    removeNote(noteId) {
      this.$emit("noteRemoved", noteId);
    },
  },
};
