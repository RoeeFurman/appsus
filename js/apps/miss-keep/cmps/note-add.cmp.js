export default {
  template: `
            <section class="note-add">
                <form @submit="addNote">
                    <input type="text" class="title" placeholder="Note title" v-model="newNote.titleTxt">
                    <input type="text" class="content" placeholder="Whats on your mind?" v-model="newNote.info.txt">
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
  },
};
