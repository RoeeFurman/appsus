import { utilService } from "../../../services/util-service.js";

export default {
  template: `
          <section class="note-add">
              <form @submit="addNote">
                  <input
                    type="text"
                    class="title"
                    placeholder="Note title"
                    v-model="titleTxt">
                  <input
                    type="text"
                    class="content"
                    :placeholder="placeholderByType"
                    v-model="info">
                  <div class="actions-container">
                    <div class="add-actions">
                      <button type="button" @click="setType('note-txt')">
                          <img src="img-notes/bx-text.svg" alt="text">
                      </button>
                      <button type="button" @click="setType('note-img')">
                          <img src="img-notes/bx-image.svg" alt="image">
                      </button>
                      <button type="button" @click="setType('note-video')">
                          <img src="img-notes/bxl-youtube.svg" alt="youtube">
                      </button>
                      <button type="button" @click="setType('note-todos')">
                          <img src="img-notes/bx-list-ul.svg" alt="list">
                      </button>
                    </div>
                    <button type="submit" class="plusBtn">
                        <img src="img-notes/bx-plus.svg" alt="plus">
                    </button>
                  </div>
              </form>
          </section>
    
        `,
  data() {
    return {
      type: "note-txt",
      titleTxt: "",
      info: "",
    };
  },
  methods: {
    addNote() {
      if (!this.info && !this.titleTxt) return;
      const note = { type: this.type, titleTxt: this.titleTxt };

      if (this.type === "note-txt") {
        note.info = { txt: this.info };
      }
      if (this.type === "note-img") {
        note.info = { url: this.info };
      }
      if (this.type === "note-video") {
        note.info = { url: this.info };
      }
      if (this.type === "note-todos") {
        var todos = this.info.split(",");
        todos = todos.map((todo) => {
          todo = { id: utilService.makeId(), txt: todo.trim(), isDone: false };
          return todo;
        });
        note.info = { todos };
      }
      this.$emit("addNote", note);
      this.titleTxt = "";
      this.info = "";
    },
    setType(type) {
      this.type = type;
    },
  },
  computed: {
    placeholderByType() {
      switch (this.type) {
        case "note-txt":
          return "What's on your mind...";
        case "note-img":
          return "Enter image URL...";
        case "note-video":
          return "Enter video URL...";
        case "note-todos":
          return "Enter comma separated list...";
      }
    },
  },
};
