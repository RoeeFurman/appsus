import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

const colorOptions = [
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
            {{note.titleTxt}}
            <button @click="">
              <img src="img-notes/bxs-pin.svg" alt="pin">
            </button>
            <component :is="note.type" :info="note.info"></component>
            <button @click="removeNote(note.id)">
              <img src="img-notes/bx-trash.svg" alt="trash">
            </button>
            <button @click="openPalette">
              <img src="img-notes/bxs-palette.svg" alt="palette">
            </button>
              <div class="color-container" v-if="clickedColorPalette">
                <div class="color" v-for="color in colors" :class="color" @click="updateColor(color, note.id)"></div>
              </div>
              <button @click="cloneNote(note.id)">
              <img src="img-notes/bxs-duplicate.svg" alt="duplicate">
            </button>
              <button @click="mailNote(note.id)">
              <img src="img-notes/bxs-paper-plane.svg" alt="paper-plane">
            </button>
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
      colors: colorOptions,
      clickedColorPalette: false,
    };
  },
  methods: {
    removeNote(noteId) {
      this.$emit("noteRemoved", noteId);
    },

    openPalette() {
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
  },
};
