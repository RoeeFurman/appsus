import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";

export default {
  props: ["note"],
  template: `
          <section class="note-preview">
            <component :is="note.type" :info="note.info"></component>
          </section>
      `,
  components: {
    noteTxt,
    noteImg,
    noteVideo,
    noteTodos,
  },
  // methods: {},
};
