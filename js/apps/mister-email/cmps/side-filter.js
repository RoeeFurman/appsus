export default {
    template: `
        <section class="side-filter">
            <label>INBOX </label><br>
            <label>SENT </label><br>
            <label>TRASH </label><br>
            <label>READ </label><br>
            <label>UNREAD </label><br>
            
        

            <!-- <input @input="setFilter" type="range" v-model="filterBy.price" min="0" max="200" alt="value"> 200 </span> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                // title: '',
                // price: 200 ,
            }
        };
    },
    methods: {
        setFilter() {
            this.$emit('filtered', this.filterBy);
        }
    }
}