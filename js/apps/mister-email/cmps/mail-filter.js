export default {
    template: `
        <section class="mail-filter">
            <label>
            Filter By </label>
            <span class="price-range"> <b>Subject: </b>
            <input @input="setFilter" type="text" v-model="filterBy.subject" placeholder="Search By..."> </span>
            <input type="checkbox" @input="setFilter" v-model="filterBy.isRead" :value=mailStatus /> Read
            <input type="checkbox" @input="setFilter" value=false v-model="!filterBy.isRead" /> Unread


            <!-- <span class="price-range"> <b>Price:</b> 0 -->
            <!-- <input @input="setFilter" type="range" v-model="filterBy.price" min="0" max="200" alt="value"> 200 </span> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                isRead: '',
                status: '',
                isStarred: '',
                lables: ['','']
            }
        };
    },
    methods: {
        setFilter() {
            console.log(this.filterBy)
            this.$emit('filtered', this.filterBy);
        }
    },
    computer: {
        mailStatus(){
            if(this.isRead) return 
            return true
        }
    }
}