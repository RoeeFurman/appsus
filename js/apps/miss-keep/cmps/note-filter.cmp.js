export default {
  template: `
          <section class="note-filter">
          <input type="text" v-model="searchKeyword" placeholder="Search" @input="searchByKeyword"/>
            <select class="select" @change="setFilter" v-model="filterType" v-if="options" >
                <option v-for="option in options" :value="option.value">{{option.txt}}</option>
            </select>
          </section>
      `,
  data() {
    return {
      filterType: "",
      options: [
        { value: "", txt: "All" },
        { value: "note-txt", txt: "Text Notes" },
        { value: "note-img", txt: "Image Notes" },
        { value: "note-video", txt: "Video Notes" },
        { value: "note-todos", txt: "List Notes" },
      ],
      searchKeyword: "",
    };
  },
  methods: {
    setFilter() {
      this.$emit("set-filter", this.filterType);
    },
    searchByKeyword() {
      this.$emit("set-search", this.searchKeyword);
    },
  },
};
