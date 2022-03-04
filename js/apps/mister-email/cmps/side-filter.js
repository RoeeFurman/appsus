export default {
    template: `
        <section class="side-filter">
            <ul>
                    <li @click=sortByInbox :class="[!sortBy ? 'marked-folder' : null]">INBOX</li>
                    <li @click=sortByRead :class="[sortBy==='read' ? 'marked-folder' : null]"> READ</li>
                    <li @click=sortByUnread :class="[sortBy==='unread' ? 'marked-folder' : null]">UNREAD</li>
                    <li @click=sortBySent :class="[sortBy==='sent' ? 'marked-folder' : null]">SENT</li>
                    <li @click=sortByTrash :class="[sortBy==='trash' ? 'marked-folder' : null]">TRASH </li>
                    <li @click=sortByDraft :class="[sortBy==='draft' ? 'marked-folder' : null]">DRAFT</li>
                    <li @click=sortByStarred :class="[sortBy==='starred' ? 'marked-folder' : null]">STARRED</li>
            </ul>        


            <!-- <button @click="deleteMail(mail.id)"><img src="img-notes/bx-trash.svg" class="icon"></button>
                   <button @click="toggleRead(mail.id)" ><img :src="[mail.isRead ? 'img-notes/bx-envelope-open.svg' : 'img-notes/bx-envelope.svg']" class="icon"></button>
                   <button @click="toggleStar(mail.id)" ><img :src="[mail.isStarred? 'img-notes/yellow-star.png' : 'img-notes/bx-star.svg']" class="star-icon"></button> -->



            <!-- <input @input="setFilter" type="range" v-model="filterBy.price" min="0" max="200" alt="value"> 200 </span> -->
        </section>
    `,
    data() {
        return {
            filterBy: {
                subject: '',
                isRead: '',
                isStarred: '',
                lables: ['','']
            },
            sortBy: null,
        };
    },
    computed: {       
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
        sortByStarred() {
            this.sortBy = 'starred'
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