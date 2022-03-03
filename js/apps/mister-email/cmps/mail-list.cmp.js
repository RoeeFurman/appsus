import mailPreview from './mail-preview.cmp.js'
import { mailService } from '../services/mail-service.js';
import { utilService } from '../../../services/util-service.js';

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
                <div class="mail-inbox" v-for="mail in mails" :key="mail.id">
                   <mail-preview :mail="mail" :mailStatusRead="status"/>
                   <button @click="deleteMail(mail.id)">delete</button>
                   <button @click="toggleRead(mail.id)" >{{readButton}}</button>
                   <button @click="toggleStar(mail.id)" >Star</button>
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
        }
        // remove(id) {
        //     this.$emit('remove', id);
        // },
        // select(car) {
        //     this.$emit('selected', car);
        // }
    },
    computed: {
        readButton() {
            // mailService.get()
            // .then((mail)=>{
            //     console.log(mail)})
            return this.mailStatusRead
        //   return 'mailService.get(id).then(mail => {
        //       this.currMail = mail;
        //       console.log(this.currMail)'
        //     })
            }
        }
    }