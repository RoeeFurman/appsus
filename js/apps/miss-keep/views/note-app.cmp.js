import { eventBus } from "../../../services/eventBus-service.js";
import { noteService } from "../../miss-keep/services/note-service.js";
import noteList from "../cmps/note-list.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";
import noteFilter from "../cmps/note-filter.cmp.js";

export default {
  template: `
              <section class="note-app">
                  <div class="header">
                    <h1>Miss Keeper</h1>
                    <p class="sub-heading">You do you, and we will do the rest</p>
                  </div>
                  <note-add @addNote="addNote"></note-add>
                  <note-filter  @set-filter="setFilter" @set-search="setSearch"></note-filter>
                  <note-list @markCheckBox="markCheckBox" @changeTodo="changeTodo" @changeTxt="changeTxt" @changeTitle="changeTitle" @pinNote="pinNote" @mailNote="mailNote" @cloneNote="cloneNote" @updateColor="updateColor" @noteRemoved="deleteNote" :notes="notesToShow"></note-list>
              </section>
      `,
  components: {
    noteList,
    noteAdd,
    noteFilter,
  },
  data() {
    return {
      notes: [],
      filterBy: null,
      searchBy: "",
    };
  },
  created() {
    this.loadNotes();
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        return (this.notes = notes);
      });
    },

    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    setSearch(searchBy) {
      this.searchBy = searchBy;
    },

    deleteNote(id) {
      noteService.removeNote(id).then(() => {
        this.loadNotes();
      });
    },

    updateColor(color, id) {
      const note = this.notes.find((note) => note.id === id);
      note.style.backgroundColor = color;
      noteService.updateNote(note);
    },
    cloneNote(noteId) {
      noteService.get(noteId).then((note) => {
        noteService.cloneNote(note).then(() => this.loadNotes());
      });
    },
    mailNote(noteId) {
      noteService.get(noteId).then((note) => {
        let body = "";
        switch (note.type) {
          case "note-txt":
            body = note.info.txt;
            break;

          case "note-img":
          case "note-video":
            body = note.info.url;
            break;

          case "note-todos":
            body = note.info.todos.map((todo) => "- " + todo.txt).join("\n");
            break;
        }

        this.$router.push({
          path: "/mail",
          query: { subject: note.titleTxt, body },
        });
        // console.log(content);
        // eventBus.emit("show-msg", {
        //   txt: "click to open mail",
        //   content: content,
        //   type: "success",
        // });
      });
    },
    addNote(noteData) {
      noteService.addNote(noteData).then(() => {
        this.loadNotes();
      });
    },
    pinNote(noteId) {
      const note = this.notes.find((note) => note.id === noteId);
      note.isPinned = !note.isPinned;
      noteService.updateNote(note).then(() => {
        this.loadNotes();
      });
    },
    changeTitle(title, id) {
      const note = this.notes.find((note) => note.id === id);
      note.titleTxt = title;
      noteService.updateNote(note);
    },
    changeTxt(txt, id) {
      const note = this.notes.find((note) => note.id === id);
      note.info.txt = txt;
      noteService.updateNote(note);
    },
    changeTodo(content, todoId, noteId) {
      const note = this.notes.find((note) => note.id === noteId);
      const todo = note.info.todos.find((todo) => todo.id === todoId);
      todo.txt = content;
      noteService.updateNote(note);
    },
    markCheckBox(mark, todoId, noteId) {
      const note = this.notes.find((note) => note.id === noteId);
      const todo = note.info.todos.find((todo) => todo.id === todoId);
      todo.isDone = mark;
      noteService.updateNote(note);
    },
  },

  computed: {
    notesToShow() {
      if (!this.filterBy && !this.searchBy) return this.notes;
      let notesToShow = this.notes;
      if (this.searchBy) {
        notesToShow = notesToShow.filter((note) => {
          const filteredBy = note.titleTxt
            .toLowerCase()
            .includes(this.searchBy.toLowerCase());
          if (filteredBy) {
            return true;
          }

          if (note.type === "note-txt") {
            return note.info.txt
              .toLowerCase()
              .includes(this.searchBy.toLowerCase());
          }

          if (note.type === "note-todos") {
            return note.info.todos.some((todo) => {
              return todo.txt
                .toLowerCase()
                .includes(this.searchBy.toLowerCase());
            });
          }

          return false;
        });
      }

      if (this.filterBy) {
        return notesToShow.filter((note) => note.type === this.filterBy);
      }

      return notesToShow;
    },
  },
};
