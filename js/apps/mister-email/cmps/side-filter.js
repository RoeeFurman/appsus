export default {
    template: `
        <section class="side-filter">
            <ul>
                    <li @click=sortByInbox>INBOX</li>
                    <li @click=sortByRead>READ</li>
                    <li @click=sortByUnread>UNREAD</li>
                    <li @click=sortBySent>SENT</li>
                    <li @click=sortByTrash>TRASH</li>
                    <li @click=sortByDraft>DRAFT</li>
            </ul>        
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
            },
            sortBy: null,
        };
    },
    methods: {
        sortByInbox() {
            this.sortBy = null
            this.$emit('sortBy', this.sortBy);
        },
        sortByRead() {
            this.sortBy = 'read'
            this.$emit('sortBy', this.sortBy);
        },
        sortByUnread() {
            this.sortBy = 'unread'
            this.$emit('sortBy', this.sortBy);
        },
        sortByTrash() {
            this.sortBy = 'trash'
            this.$emit('sortBy', this.sortBy);
        },
        sortBySent() {
            this.sortBy = 'sent'
            this.$emit('sortBy', this.sortBy);
        },
        sortByDraft() {
            this.sortBy = 'draft'
            this.$emit('sortBy', this.sortBy);
        },

        // filterRead() {
        //     console.log('filtering read')
        //     this.filterBy.isRead = true;
        //     console.log(this.filterBy)
        //     this.$emit('filtered', this.filterBy);
        // }
    }
}