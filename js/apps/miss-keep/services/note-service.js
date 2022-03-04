import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";
import { eventBus } from "../../../services/eventBus-service.js";

const NOTES_KEY = "notes";
_createNotes();

export const noteService = {
  query,
  get,
  addNote,
  removeNote,
  // editNote,
  mailNote,
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
        titleTxt: "txt note",
        isPinned: false,
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
        titleTxt: "img note",
        isPinned: false,
        info: {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgnL-6fb5PhgkCkH3odiqgPmhqoWm6HeRjwQ&usqp=CAU",
        },
        style: {
          backgroundColor: "",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-todos",
        titleTxt: "todo note",
        isPinned: true,
        info: {
          todos: [
            { txt: "Driving liscence", isDone: false },
            { txt: "Coding power", isDone: true },
          ],
        },
        style: {
          backgroundColor: "",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-video",
        titleTxt: "video note",
        isPinned: true,
        info: {
          url: "https://www.youtube.com/embed/XHNHq1mC0VQ",
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

function _createNote(noteData) {
  const note = {
    id: utilService.makeId(),
    type: noteData.type,
    titleTxt: noteData.titleTxt,
    isPinned: false,
    info: noteData.info,
    style: {
      backgroundColor: "",
    },
  };
  return note;
}

function get(noteId) {
  return storageService.get(NOTES_KEY, noteId);
}

function query() {
  return storageService.query(NOTES_KEY);
}

function addNote(noteData) {
  const newNote = _createNote(noteData);
  return storageService.post(NOTES_KEY, newNote);
}

function removeNote(noteId) {
  return storageService.remove(NOTES_KEY, noteId);
}

// function editNote(noteId) {}

function mailNote(noteId) {
  return storageService.get(noteId);
}

function updateNote(note) {
  return storageService.put(NOTES_KEY, note);
}

function cloneNote(note) {
  let noteCopy = { ...note };
  return storageService.post(NOTES_KEY, noteCopy);
}
