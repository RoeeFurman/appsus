export default {
    template: `
        <section class="mail-filter">
            <label>
            Search </label>
            <span class="price-range"> 
            <input @input="setFilter" type="text" v-model="filterBy.subject" placeholder="Search By subject..."> Sort By
            <button @click="sortByDate"  class="search-by-bar">{{latestMails}}</button></span>
            <button @click="sortBySubject" class="search-by-bar">Subject: {{subjectSort}}</button></span>
            <!-- <input type="checkbox" @input="setFilter" v-model="filterBy.isRead" :value=mailStatus /> Read -->
            <!-- <input type="sortByDate" @input="setFilter" value=false v-model="!filterBy.isRead" /> Unread -->
            <!-- @sortByDate="sortByDate" -->


            <!-- <span class="price-range"> <b>Price:</b> 0 -->
            <!-- <input @input="setFilter" type="range" v-model="filterBy.price" min="0" max="200" alt="value"> 200 </span> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                isRead: '',
                // status: '',
                isStarred: '',
                lables: ['','']
            },
            sortByLatest: true,
            sortByAbc: true,
        };
    },
    methods: {
        setFilter() {
            console.log(this.filterBy)
            this.$emit('filtered', this.filterBy);
        },
        sortByDate(){
            this.sortByLatest = ! this.sortByLatest;
            this.$emit('sortByDate', this.sortByLatest);
        },
        sortBySubject(){
            this.sortByAbc = ! this.sortByAbc;
            this.$emit('sortBySubject', this.sortByAbc);
        }
    },
    computed: {
        latestMails(){
            if(this.sortByLatest) return ' Latest ↑'
            else return ' Latest ↓'
        },
        subjectSort(){
            if(this.sortByAbc) return ' Z-a'
            else return ' A-z'
        }
    }
}