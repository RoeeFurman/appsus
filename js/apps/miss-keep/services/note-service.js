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
  editNote,
  // emailNote,
  colorNote,
  pinNote,
};

function _createNotes() {
  let notes = utilService.loadFromStorage(NOTES_KEY);
  if (!notes || !notes.length) {
    notes = [
      {
        id: "n101",
        type: "note-txt",
        isPinned: true,
        info: {
          txt: "Fullstack Me Baby!",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n102",
        type: "note-img",
        isPinned: true,
        info: {
          url: "http://some-img/me",
          title: "Bobi and Me",
        },
        style: {
          backgroundColor: "#00d",
        },
      },
      {
        id: "n103",
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
          backgroundColor: "#00d",
        },
      },
      {
        id: "n104",
        type: "note-video",
        isPinned: true,
        info: {
          url: "https://www.youtube.com/watch?v=C_XkTKoDI18",
        },
        style: {
          backgroundColor: "#00d",
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

function removeNote(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

function editNote(noteId) {}

// function emailNote(noteId) {}

function colorNote(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function pinNote() {}
