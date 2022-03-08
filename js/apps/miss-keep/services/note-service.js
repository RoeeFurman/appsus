import { utilService } from "../../../services/util-service.js";
import { storageService } from "../../../services/async-storage-service.js";

const NOTES_KEY = "notes";
_createNotes();

export const noteService = {
  query,
  get,
  addNote,
  removeNote,
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
        titleTxt: "Problems",
        isPinned: true,
        info: {
          txt: "Cannot set properties of undefined",
        },
        style: {
          backgroundColor: "pink",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        titleTxt: "Do not forget..",
        isPinned: true,
        info: {
          txt: "Take a day off...",
        },
        style: {
          backgroundColor: "yellow",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        titleTxt: "Lorem..",
        isPinned: false,
        info: {
          txt: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur ducimus atque dicta maxime voluptas ullam maiores praesentium rerum amet doloremque minus, nobis aperiam ad eveniet sit debitis odio illo laudantium.",
        },
        style: {
          backgroundColor: "green",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-img",
        titleTxt: "Meow",
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
        titleTxt: "TODO:",
        isPinned: true,
        info: {
          todos: [
            {
              id: utilService.makeId(),
              txt: "Do not cry when console log prints undefined",
              isDone: false,
            },
            {
              id: utilService.makeId(),
              txt: "Do not cry when you fix a bug but then 10000 more appear",
              isDone: true,
            },
            {
              id: utilService.makeId(),
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
        titleTxt: "Panda",
        isPinned: true,
        info: {
          url: "https://addons-media.operacdn.com/media/CACHE/images/themes/45/123745/1.0-rev1/images/d43cd5fe-8407-46bb-858f-54d825dead48/c31dc78b6602cb4bf0a8d2b93385e5a2.jpg",
        },
        style: {
          backgroundColor: "green",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-img",
        titleTxt: "Raccoon",
        isPinned: true,
        info: {
          url: "https://media.istockphoto.com/photos/little-raccoon-on-tree-picture-id514622028?k=6&m=514622028&s=612x612&w=0&h=oa6bEuRd9EB_D72qJ5UD57dBfnLWz7onQDm6DFJSVLc=",
        },
        style: {
          backgroundColor: "orange",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        titleTxt: "Umm....",
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
        type: "note-img",
        titleTxt: "Kuala",
        isPinned: true,
        info: {
          url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/02C2/production/_122360700_gettyimages-1280424615.jpg",
        },
        style: {
          backgroundColor: "teal",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-video",
        titleTxt: "ZHU - Cercle",
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
        type: "note-todos",
        titleTxt: "List:",
        isPinned: false,
        info: {
          todos: [
            {
              id: utilService.makeId(),
              txt: "Wake up early",
              isDone: false,
            },
            {
              id: utilService.makeId(),
              txt: "Make some css changes in my app",
              isDone: false,
            },
            {
              id: utilService.makeId(),
              txt: "Laugh more",
              isDone: true,
            },
          ],
        },
        style: {
          backgroundColor: "gray",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-img",
        titleTxt: "Parrot buddy",
        isPinned: false,
        info: {
          url: "https://lafeber.com/pet-birds/wp-content/uploads/2020/04/gamaliel-troubleson-u9PsLITXMCQ-unsplash-e1587001975887.jpg",
        },
        style: {
          backgroundColor: "yellow",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-txt",
        titleTxt: "My first note",
        isPinned: false,
        info: {
          txt: "Things aren’t always #000000 and #FFFFFF",
        },
        style: {
          backgroundColor: "darkBlue",
        },
      },
      {
        id: utilService.makeId(),
        type: "note-video",
        titleTxt: "Ozora Festival",
        isPinned: false,
        info: {
          url: "https://www.youtube.com/embed/S3K6pUOAmTE",
        },
        style: {
          backgroundColor: "purple",
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
