import mailPreview from './mail-preview.cmp.js'
import { mailService } from '../services/mail-service.js';
import { utilService } from '../../../services/util-service.js';

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
                <div class="mail-inbox" v-for="mail in mails" :key="mail.id">
                    <div class="mail-content">
                   <mail-preview :mail="mail" @markAsRead="markAsRead" />
                    </div>
                   <div class="buttons">
                   <button @click="deleteMail(mail.id)"><img src="img-notes/bx-trash.svg" class="icon"></button>
                   <button @click="toggleRead(mail.id)" ><img :src="[mail.isRead ? 'img-notes/bx-envelope-open.svg' : 'img-notes/bx-envelope.svg']" class="icon"></button>
                   <button @click="toggleStar(mail.id)" ><img :src="[mail.isStarred? 'img-notes/yellow-star.png' : 'img-notes/bx-star.svg']" class="star-icon"></button>
                    </div>
                </div>
        </section>
    `,
    components: {
        mailPreview
    },    
    data() {
        return {
           mailStatusRead: "read",
        };
    },
    created(){

    },
    methods: {
        deleteMail(id) {
            this.$emit('remove', id)
            console.log(id)
        },
        toggleRead(id){
            console.log(id)
            this.$emit('toggleRead', id)
        },
        toggleStar(id){
            console.log(id)
            this.$emit('toggleStar', id)
        }, 
        markAsRead(mail){
            console.log(mail)
            this.$emit('markAsRead', mail)

        },
    },
    computed: {
        readButton() {
            return "[mail.isRead ? 'img-notes/bx-envelope-open.svg' : 'img-notes/bx-envelope.svg']"
            },
        
            }
        // }
    }