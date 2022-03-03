import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";
import { eventBus } from "../../../services/eventBus-service.js";

const NOTES_KEY = "notes";
_createNotes();

export const noteService = {
  query,
  get,
  // addNote,
  removeNote,
  // editNote,
  // emailNote,
  // pinNote,
  updateNote,
  cloneNote,
};

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = [
      {
        id: utilService.makeId(),
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "Fullstack Me Baby!",
        },
        style: {
          backgroundColor: "",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-img",
        isPinned: true,
        info: {
          url: "http://some-img/me",
          title: "Bobi and Me",
        },
        style: {
          backgroundColor: "",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-todos",
        isPinned: true,
        info: {
          label: "Get my stuff together",
          todos: [
            { txt: "Driving liscence", doneAt: null },
            { txt: "Coding power", doneAt: 187111111 },
          ],
        },
        style: {
          backgroundColor: "",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-video",
        isPinned: true,
        info: {
          url: "https://www.youtube.com/watch?v=C_XkTKoDI18",
        },
        style: {
          backgroundColor: "",
        },
      },
    ];
    utilService.saveToStorage(NOTES_KEY, notes);
  }
  return notes;
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function query() {
  return storageService.query(NOTES_KEY);
}

// function addNote() {}

// function addNote(note) {
//   var newNote = _createNote(note.type, note.info)
//   gNotes.unshift(newNote)
//   localStorage[NOTES_KEY] = JSON.stringify(gNotes);
//   return Promise.resolve('add')
// }

function removeNote(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

// function editNote(noteId) {}

// function emailNote(noteId) {}

// function pinNote() {}

function updateNote(note) {
  return storageService.put(NOTES_KEY, note);
}

function cloneNote(note) {
  let noteCopy = { ...note };
  return storageService.post(NOTES_KEY, noteCopy);
}
