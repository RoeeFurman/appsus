export default {
  props: ["info"],
  template: `
              <section class="note-video">
                 <iframe :src="info.url" frameborder="0">
                 </iframe>
              </section>
          `,
  components: {},
};
