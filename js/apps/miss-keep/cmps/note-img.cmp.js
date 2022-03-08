export default {
  props: ["info"],
  template: `
    <section class="note-img">
      <img :src="info.url" alt="">
    </section>
  `,
};
