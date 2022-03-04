export default {
  template: `
            <section class="note-add">
                <form @submit="addNote">
                    <input type="text" class="title" placeholder="Note title" v-model="newNote.titleTxt">
                    <input type="text" class="content" placeholder="Whats on your mind?" v-model="newNote.info.txt">
                    <div class="add-actions">
                    <button @click="addImgNote">
                        <img src="img-notes/bx-image.svg" alt="image">
                    </button>
                    <button @click="addYoutubeNote">
                        <img src="img-notes/bxl-youtube.svg" alt="youtube">
                    </button>
                    <button @click="addListNote">
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
      newNote: {
        type: "note-txt",
        titleTxt: "",
        info: { txt: "" },
      },
    };
  },
  created() {},
  methods: {
    addNote() {
      if (!this.newNote.info.txt && !this.newNote.titleTxt) return;
      this.$emit("addNote", this.newNote);
    },
    addImgNote() {
      if (!this.newNote.info.url && !this.newNote.titleTxt) return;
    },
  },
};
