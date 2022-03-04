export default {
  props: ["info"],
  template: `
            <section class="note-txt">
            <input type="text" v-model="txt" @input="changeTxt(txt)">
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
  },
};
