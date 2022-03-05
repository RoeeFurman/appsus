export default {
    template: `
        <section class="mail-filter">
            <div class="mail-search">
            <b> Search: </b>
            <input @input="setFilter" type="text" v-model="filterBy.subject" class="search-input" placeholder="Search By subject..."/> 
            <div class="mail-sort">
            <b>Sort By: </b>
            <button @click="sortByDate"  class="search-by-bar">{{latestMails}}</button>
            <button @click="sortBySubject" class="search-by-bar">Subject: {{subjectSort}}</button>
            <div>    
        </div>
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