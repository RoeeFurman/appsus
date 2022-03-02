import { noteService } from "../services/note-service.js";
import noteTxt from "../cmps/note-txt.cmp.js";
import noteImg from "../cmps/note-img.cmp.js";
import noteVideo from "../cmps/note-video.cmp.js";
import noteTodos from "../cmps/note-todos.cmp.js";
import { eventBus } from "../../../services/eventBus-service.js";

export default {
  props: ["note"],
  template: `
          <section class="note-preview">
            <component :is="note.type" :info="note.info"></component>
            <button @click="removeNote(note.id)">Remove note</button>
          </section>
      `,
  components: {
    noteTxt,
    noteImg,
    noteVideo,
    noteTodos,
  },
  methods: {
    removeNote(noteId) {
      noteService.removeNote(noteId).then(() => {
        noteService.query().then((notes) => {
          eventBus.emit("noteRemoved", notes);
        });
      });
    },
  },
};
