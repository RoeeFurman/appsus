import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

const COLOR_OPTIONS = [
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "darkBlue",
  "purple",
  "pink",
  "brown",
  "gray",
];

export default {
  props: ["note"],
  template: `
  <section class="note-preview">
    <header>
      <input type="text" v-model="title" @input="changeTitle(title, note.id)">
      <button @click="pinNote(note.id)">
        <img :src="pinIconSrc" alt="pin">
      </button>
    </header>
    <div class="mainCmp">
      <component
        :is="note.type"
        :info="note.info"
        @markCheckBox="markCheckBox"
        @changeTodo="changeTodo"
        @changeTxt="changeTxt($event, note.id)" />
    </div>
    <div class="actions">
        <button @click="removeNote(note.id)">
          <img src="img-notes/bx-trash-alt.svg" alt="trash">
        </button>
        <button @click="togglePalette">
          <img src="img-notes/bx-palette2.svg" alt="palette">
        </button>
        <div class="color-container" v-if="clickedColorPalette">
          <div
            class="color"
            v-for="color in colors"
            :class="color"
            @click="updateColor(color, note.id)" />
        </div>
        <button @click="cloneNote(note.id)">
          <img src="img-notes/bx-copy2.svg" alt="duplicate">
        </button>
        <button @click="mailNote(note.id)">
          <img src="img-notes/bx-paper-plane2.svg" alt="paper-plane">
        </button>
      </div>
    </section>
  `,
  components: {
    noteTxt,
    noteImg,
    noteVideo,
    noteTodos,
  },
  data() {
    return {
      title: this.note.titleTxt,
      colors: COLOR_OPTIONS,
      clickedColorPalette: false,
    };
  },
  methods: {
    removeNote(noteId) {
      this.$emit("noteRemoved", noteId);
    },
    togglePalette() {
      this.clickedColorPalette = !this.clickedColorPalette;
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
    changeTitle(title, noteId) {
      this.$emit("changeTitle", title, noteId);
    },
    changeTxt(txt, noteId) {
      this.$emit("changeTxt", txt, noteId);
    },
    changeTodo(content, todoId) {
      this.$emit("changeTodo", content, todoId, this.note.id);
    },
    markCheckBox(mark, todoId) {
      this.$emit("markCheckBox", mark, todoId, this.note.id);
    },
  },
  computed: {
    pinIconSrc() {
      return this.note.isPinned
        ? "img-notes/pin-full.svg"
        : "img-notes/pin-empty.svg";
    },
  },
};
