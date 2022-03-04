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
          backgroundColor: "pink",
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
          backgroundColor: "brown",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-todos",
        titleTxt: "todo note",
        isPinned: true,
        info: {
          todos: [
            {
              txt: "Do not cry when console log prints undefined",
              isDone: false,
            },
            {
              txt: "Do not cry when you fix a bug but then 10000 more appear",
              isDone: true,
            },
            {
              txt: "Do not cry when it is ten minutes to submission and your project is far from being done",
              isDone: true,
            },
          ],
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-img",
        titleTxt: "img note",
        isPinned: false,
        info: {
          url: "https://addons-media.operacdn.com/media/CACHE/images/themes/45/123745/1.0-rev1/images/d43cd5fe-8407-46bb-858f-54d825dead48/c31dc78b6602cb4bf0a8d2b93385e5a2.jpg",
        },
        style: {
          backgroundColor: "green",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        titleTxt: "txt note",
        isPinned: false,
        info: {
          txt: "Learn Vue they said, it will be fun they said.",
        },
        style: {
          backgroundColor: "blue",
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
          backgroundColor: "red",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        titleTxt: "txt note",
        isPinned: false,
        info: {
          txt: "Things aren’t always #000000 and #FFFFFF",
        },
        style: {
          backgroundColor: "darkBlue",
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
