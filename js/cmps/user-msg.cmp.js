import { eventBus } from "../services/eventBus-service.js";

export default {
  template: `
        <section v-if="msg" class="user-msg" :class="msg.type">
            <span>{{msg.txt}}</span>
            <span @click="saveContent(msg.content)" v-if="msg.content">{{msg.content}}</span>
        </section>
    `,
  data() {
    return {
      msg: null,
      content: null,
    };
  },
  created() {
    this.unsubscribe = eventBus.on("show-msg", this.showMsg);
  },
  methods: {
    showMsg(msg) {
      this.msg = msg;
      setTimeout(() => {
        this.msg = null;
      }, 3000);
    },
  },
  unmounted() {
    this.unsubscribe();
  },
};
