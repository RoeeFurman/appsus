export default {
    template: `
        <section class="book-filter">
            <label>
            Filter By </label>
            <span class="price-range"> <b>Title: </b>
            <input @input="setFilter" type="text" v-model="filterBy.title" placeholder="Search..."> </span>
            <span class="price-range"> <b>Price:</b> 0
            <input @input="setFilter" type="range" v-model="filterBy.price" min="0" max="200" alt="value"> 200 </span>
        </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                price: 200 ,
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy);
        }
    }
}