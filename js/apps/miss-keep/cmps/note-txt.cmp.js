export default {
  props: ["info"],
  template: `
            <section class="note-txt">
               {{info.txt}}
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
