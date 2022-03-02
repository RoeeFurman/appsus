import mailPreview from './mail-preview.cmp.js'
import { mailService } from '../services/mail-service.js';

export default {
    props: ['mails'],
    template: `
        <section class="mail-list">
            <hr>
                <div v-for="mail in mails" :key="mail.id">
                   <mail-preview :mail="mail" /><button @click="deleteMail(mail.id)">delete</button>
                   <!-- <div class="actions">
                       <button @click="remove(car.id)">X</button>
                       <router-link :to="'/car/edit/'+car.id">Edit</router-link> -->
                   </div>
        </section>
    `,
    components: {
        mailPreview
    },
    methods: {
        deleteMail(id) {
            this.$emit('remove', id)
            console.log(id)
            // console.log(this.mail)
        //     mailService.remove(this.mail.id)
        //     .then(() => mailService.query()
        //     .then((mails) => {
        //         console.log(mails)
        //         emit('mailDeleted', mails)
        //     }));
        }
        // remove(id) {
        //     this.$emit('remove', id);
        // },
        // select(car) {
        //     this.$emit('selected', car);
        // }
    },
    computed: {}
}