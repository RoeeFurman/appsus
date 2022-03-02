import { eventBus } from "../../../services/eventBus-service.js";
import { noteService } from "../../miss-keep/services/note-service.js";
import noteList from "../cmps/note-list.cmp.js";

export default {
  template: `
              <section class="note-app">
                  <h1>Notes</h1>
                  <router-link to="/" class="home-go">Home</router-link>
                  <note-list @noteRemoved="deleteNote" :notes="notesToShow"></note-list>
              </section>
  
      `,
  components: {
    noteList,
  },
  data() {
    return {
      notes: null,
    };
  },
  created() {
    this.loadNotes();
    // noteService.query().then((notes) => (this.notes = notes));
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        return (this.notes = notes);
      });
    },

    deleteNote(id) {
      noteService.removeNote(id).then(() => {
        const idx = this.notes.findIndex((note) => note.id === id);
        this.notes.splice(idx, 1);
      });
    },
  },

  computed: {
    notesToShow() {
      return this.notes;
    },
  },
};
