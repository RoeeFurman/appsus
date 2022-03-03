import notePreview from "../cmps/note-preview.cmp.js";

export default {
  props: ["notes"],
  template: `
    	<section class="notes-list">
            <ul class="notes-area">
                <li class="note-card" v-for="note in notes" :class="[note.style.backgroundColor]">
                    <note-preview :note="note" @noteRemoved="removeNote" @updateColor="updateColor"></note-preview>
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

    updateColor(color, noteId) {
      this.clickedColorPalette = false;
      this.$emit("updateColor", color, noteId);
    },
  },
};
