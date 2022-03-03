import notePreview from "../cmps/note-preview.cmp.js";

export default {
  props: ["notes"],
  template: `
    	<section class="notes-list">
            <ul class="notes-area">
                <ul>
                  <li class="note-card" v-for="note in notes" :class="[note.style.backgroundColor]" :notes="pinnedNotes">
                      <note-preview :note="note" @mailNote="mailNote" @cloneNote="cloneNote" @noteRemoved="removeNote" @updateColor="updateColor"></note-preview>
                  </li>
                </ul>
                <ul>
                  <li class="note-card" v-for="note in notes" :class="[note.style.backgroundColor]" :notes="notPinnedNotes">
                      <note-preview :note="note" @mailNote="mailNote" @cloneNote="cloneNote" @noteRemoved="removeNote" @updateColor="updateColor"></note-preview>
                  </li>
                </ul>
            </ul>
        </section>
    `,
  components: {
    notePreview,
  },
  data() {
    {
    }
  },
  methods: {
    removeNote(noteId) {
      this.$emit("noteRemoved", noteId);
    },

    updateColor(color, noteId) {
      this.clickedColorPalette = false;
      this.$emit("updateColor", color, noteId);
    },
    cloneNote(noteId) {
      this.$emit("cloneNote", noteId);
    },
    mailNote(noteId) {
      this.$emit("mailNote", noteId);
    },
  },
  computed: {
    pinnedNotes() {
      console.log(this.notes.filter((note) => note.isPinned === true));
    },

    notPinnedNotes() {
      console.log(this.notes.filter((note) => note.isPinned === false));
    },
  },
};
