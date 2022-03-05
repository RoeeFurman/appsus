
export default {
    props:['calcMailsByFolder'],
    template: `
        <section class="side-filter">
            <ul>
                    <li @click="sortingBy('')" :class="[!sortBy ? 'marked-folder' : null]">INBOX </li>
                    <li @click="sortingBy('read')" :class="[sortBy==='read' ? 'marked-folder' : null]"> READ <b>{{displayReadMails}}</b></li>
                    <li @click="sortingBy('unread')" :class="[sortBy==='unread' ? 'marked-folder' : null]">UNREAD <b>{{displayUneadMails}}</b></li>
                    <li @click="sortingBy('sent')" :class="[sortBy==='sent' ? 'marked-folder' : null]">SENT</li>
                    <li @click="sortingBy('trash')" :class="[sortBy==='trash' ? 'marked-folder' : null]">TRASH <b>{{displayTrashMails}}</b></li>
                    <li @click="sortingBy('draft')" :class="[sortBy==='draft' ? 'marked-folder' : null]">DRAFT</li>
                    <li @click="sortingBy('starred')" :class="[sortBy==='starred' ? 'marked-folder' : null]">STARRED</li>
            </ul>        
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
    created() {
    },
    computed: {       
        displayReadMails(){
            return this.calcMailsByFolder.readMails
        },
        displayUneadMails(){
            return this.calcMailsByFolder.unreadMails
        },
        displayTrashMails(){
            return this.calcMailsByFolder.trashMails
        }
            },
    methods: {
        sortingBy(val){
            console.log(val)
            this.sortBy = val
            this.$emit('sortBy', this.sortBy);
        },
  
    }
}