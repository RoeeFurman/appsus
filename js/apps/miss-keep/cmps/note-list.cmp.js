import notePreview from "../cmps/note-preview.cmp.js";

export default {
  props: ["notes"],
  template: `
    <section class="notes-list">
      <div v-if="pinnedNotes.length > 0">
        <h2>PINNED</h2>
        <ul class="notes-area pinned-notes">
          <li
            class="note-card"
            :key="note.id"
            v-for="note in pinnedNotes"
            :class="[note.style.backgroundColor]">
              <note-preview
                :note="note"
                @markCheckBox="markCheckBox"
                @changeTodo="changeTodo"
                @changeTxt="changeTxt"
                @changeTitle="changeTitle"
                @pinNote="pinNote"
                @mailNote="mailNote"
                @cloneNote="cloneNote"
                @noteRemoved="removeNote"
                @updateColor="updateColor" />
          </li>  
        </ul> 
      </div>
      <div v-if="notPinnedNotes.length > 0">
          <h2>OTHERS</h2>
          <ul class="notes-area other-notes">
            <li
              class="note-card"
              :key="note.id"
              v-for="note in notPinnedNotes"
              :class="[note.style.backgroundColor]">
                <note-preview
                  :note="note"
                  @markCheckBox="markCheckBox"
                  @changeTodo="changeTodo"
                  @changeTxt="changeTxt"
                  @changeTitle="changeTitle"
                  @pinNote="pinNote"
                  @mailNote="mailNote"
                  @cloneNote="cloneNote"
                  @noteRemoved="removeNote"
                  @updateColor="updateColor" />
            </li>
          </ul>
      </div>
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
    changeTitle(title, noteId) {
      this.$emit("changeTitle", title, noteId);
    },
    changeTxt(txt, noteId) {
      this.$emit("changeTxt", txt, noteId);
    },
    changeTodo(content, todoId, noteId) {
      this.$emit("changeTodo", content, todoId, noteId);
    },
    markCheckBox(mark, todoId, noteId) {
      this.$emit("markCheckBox", mark, todoId, noteId);
    },
  },
  computed: {
    pinnedNotes() {
      return this.notes.filter((note) => note.isPinned);
    },
    notPinnedNotes() {
      return this.notes.filter((note) => !note.isPinned);
    },
  },
  updated() {
    setTimeout(() => {
      new Isotope(".pinned-notes", {
        itemSelector: ".note-card",
        masonry: {
          gutter: 15,
        },
      });
      new Isotope(".other-notes", {
        itemSelector: ".note-card",
        masonry: {
          gutter: 15,
        },
      });
    }, 100);
  },
};
