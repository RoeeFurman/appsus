export default {
  props: ["info"],
  template: `
            <section class="note-txt">
               note-txt!!!!
               {{info}}
            </section>
        `,
  data() {
    return {
      val: "",
    };
  },
  created() {},
  components: {},
};
