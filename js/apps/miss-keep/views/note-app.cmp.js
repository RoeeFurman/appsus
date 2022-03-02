import { noteService } from "../../miss-keep/services/note-service.js";
import noteList from "../cmps/note-list.cmp.js";

export default {
  template: `
              <section class="note-app">
                  <h1>Notes</h1>
                  <router-link to="/" class="home-go">Home</router-link>
                  <note-list :notes="notesToShow"></note-list>

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
    // console.log(this.notes);
    // console.log(noteService);
    noteService.query().then((notes) => (this.notes = notes));
  },
  // methods: {}

  computed: {
    notesToShow() {
      return this.notes;
    },
  },
};
