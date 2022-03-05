export default {
  props: ["info"],
  template: `
            <section class="note-txt">
            <textarea ref="textarea"  v-model="txt" @input="changeTxt(txt)"></textarea>
            </section>
        `,
  data() {
    return {
      txt: this.info.txt,
    };
  },
  methods: {
    changeTxt(txt) {
      this.$emit("changeTxt", txt);
    },
    updateHeigh() {
      this.$refs.textarea.style.height = 0;
      this.$refs.textarea.style.height =
        this.$refs.textarea.scrollHeight + "px";
    },
  },
  mounted() {
    this.updateHeigh();
  },
  watch: {
    txt: function () {
      this.updateHeigh();
    },
  },
};
