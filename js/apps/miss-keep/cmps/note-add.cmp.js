export default {
  template: `
            <section class="note-add">
                <form @submit="addNote">
                    <input type="text" class="title" placeholder="Note title" v-model="titleTxt">
                    <input type="text" class="content" placeholder="Whats on your mind?" v-model="info">
                    <div class="add-actions">
                    <button @click="setType('note-img')">
                        <img src="img-notes/bx-image.svg" alt="image">
                    </button>
                    <button @click="setType('note-video')">
                        <img src="img-notes/bxl-youtube.svg" alt="youtube">
                    </button>
                    <button @click="setType('note-todos')">
                        <img src="img-notes/bx-list-ul.svg" alt="list">
                    </button>
                    </div>
                    <button type="submit">
                        <img src="img-notes/bx-plus.svg" alt="plus">
                    </button>
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
  created() {},
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
        note.info = { todos: [{ txt: this.info }] };
      }
      this.$emit("addNote", note);
    },
    setType(type) {
      this.type = type;
    },
  },
};
