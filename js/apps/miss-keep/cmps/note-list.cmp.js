import notePreview from "../cmps/note-preview.cmp.js";

export default {
  props: ["notes"],
  template: `
    	<section class="notes-list">
        <h2>PINNED</h2>
            <ul class="notes-area">
                  <li class="note-card" v-for="note in pinnedNotes" :class="[note.style.backgroundColor]">
                      <note-preview :note="note" @pinNote="pinNote" @mailNote="mailNote" @cloneNote="cloneNote" @noteRemoved="removeNote" @updateColor="updateColor"></note-preview>
                  </li>  
            </ul> 
            <h2>OTHERS</h2>
            <ul class="notes-area">
                  <li class="note-card" v-for="note in notPinnedNotes" :class="[note.style.backgroundColor]">
                      <note-preview :note="note" @pinNote="pinNote" @mailNote="mailNote" @cloneNote="cloneNote" @noteRemoved="removeNote" @updateColor="updateColor"></note-preview>
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
    cloneNote(noteId) {
      this.$emit("cloneNote", noteId);
    },
    mailNote(noteId) {
      this.$emit("mailNote", noteId);
    },
    pinNote(noteId) {
      this.$emit("pinNote", noteId);
    },
  },
  computed: {
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned === true);
    },

    notPinnedNotes() {
      return this.notes.filter((note) => note.isPinned === false);
    },
  },
};
