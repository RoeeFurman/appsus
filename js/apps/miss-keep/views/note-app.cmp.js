import { eventBus } from "../../../services/eventBus-service.js";
import { noteService } from "../../miss-keep/services/note-service.js";
import noteList from "../cmps/note-list.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";

export default {
  template: `
              <section class="note-app">
                  <div class="header">
                    <h1>Miss Keeper</h1>
                    <p class="sub-heading">You do you, and we will do the rest</p>
                  </div>
                  <note-add @addNote="addNote"></note-add>
                  <note-list @markCheckBox="markCheckBox" @changeTodo="changeTodo" @changeTxt="changeTxt" @changeTitle="changeTitle" @pinNote="pinNote" @mailNote="mailNote" @cloneNote="cloneNote" @updateColor="updateColor" @noteRemoved="deleteNote" :notes="notesToShow"></note-list>
              </section>
  
      `,
  components: {
    noteList,
    noteAdd,
  },
  data() {
    return {
      notes: [],
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
        console.log(note);
        const content = note.info.txt;
        console.log(content);
        eventBus.emit("sentContent", content);
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
      console.log(todo);
      noteService.updateNote(note);
    },
  },

  computed: {
    notesToShow() {
      return this.notes;
    },
  },
};
